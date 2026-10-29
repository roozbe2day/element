"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollVideoStatus = "loading" | "ready" | "error";

type ScrollVideoOptions = {
  /** Desktop rendition of the clip. */
  src: string;
  /** Optional lighter rendition served to narrow viewports. */
  mobileSrc?: string;
  /** Media query that selects `mobileSrc`. */
  mobileQuery?: string;
  /**
   * How much of the remaining distance the smoothed playhead covers per 60fps
   * frame. Higher = tighter to the scroll, lower = more glide. ~0.2 converges in
   * roughly a quarter of a second, which reads as "attached" without feeling jumpy.
   */
  smoothing?: number;
  /** Smallest playhead delta (seconds) worth issuing a seek for. */
  seekEpsilon?: number;
  /** Scroll progress at which the overlaid content has fully faded out. */
  contentFadeRange?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Drives a `<video>` from scroll position instead of playback.
 *
 * The element is never played: we only ever write `currentTime`, so stopping the
 * scroll freezes the clip on that exact frame and scrolling back rewinds it.
 *
 * Design notes:
 * - The scroll listener does no work beyond waking the animation loop; the loop
 *   itself runs inside `requestAnimationFrame` and reads `window.scrollY`.
 * - The playhead is eased towards the scroll target with a frame-rate independent
 *   exponential decay, so fast scrolls are not harsh and slow scrolls stay precise.
 * - Seeks are rate-limited: one is issued only when the target moved by more than
 *   `seekEpsilon` *and* the previous seek has resolved (`video.seeking`), which is
 *   what stops a fast scroll from flooding the decoder.
 * - The loop parks itself as soon as the playhead settles, so an idle page costs
 *   nothing. Nothing is put into React state per frame; the text overlay is written
 *   straight to the DOM through a ref.
 *
 * Encoding note (this matters more than the JS): the clip must be encoded with
 * **frequent keyframes** — the source we were given had a single keyframe, so every
 * scrub seek would have decoded from the start and stuttered badly. It is re-encoded
 * to H.264 with a keyframe every 6 frames (~0.25s), `yuv420p`, `+faststart`, and no
 * audio track. Keep those characteristics if the clip is ever replaced.
 */
export function useScrollVideo({
  src,
  mobileSrc,
  mobileQuery = "(max-width: 767px)",
  smoothing = 0.2,
  seekEpsilon = 1 / 60,
  contentFadeRange = 0.22,
}: ScrollVideoOptions) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ScrollVideoStatus>("loading");

  // Treated as static configuration for the lifetime of the hero, so the setup
  // effect below deliberately runs once.
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const video = videoRef.current;
    if (!section || !viewport || !video) return;

    // Pick the rendition before loading so phones never pull the desktop file.
    const useMobile = Boolean(mobileSrc) && window.matchMedia(mobileQuery).matches;
    video.src = useMobile && mobileSrc ? mobileSrc : src;
    video.load();

    let rafId = 0;
    let running = false;
    let dead = false;

    const onError = () => {
      dead = true;
      cancelAnimationFrame(rafId);
      running = false;
      setStatus("error");
    };
    video.addEventListener("error", onError);

    // `prefers-reduced-motion`: keep the hero as one static first frame. The
    // matching CSS collapses the scroll area to a single viewport, so there is no
    // cinematic scrub to drive — we simply never start the loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatus("ready");
      return () => {
        video.removeEventListener("error", onError);
      };
    }

    let sectionTop = 0;
    let scrollRange = 1;

    const measure = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      // Measured from the real sticky height so `100svh` vs `100vh` can never drift.
      scrollRange = Math.max(1, section.offsetHeight - viewport.offsetHeight);
    };

    let lastFrame = 0;
    let current = 0; // smoothed playhead, in seconds
    let lastSeek = 0; // last value actually pushed to the video

    const tick = (now: number) => {
      if (dead) return;

      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 1 / 30) : 1 / 60;
      lastFrame = now;

      const progress = clamp((window.scrollY - sectionTop) / scrollRange, 0, 1);
      const duration = video.duration;
      const target = Number.isFinite(duration) ? progress * duration : 0;

      const k = 1 - Math.pow(1 - smoothing, dt * 60);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.002) current = target;

      if (
        duration > 0 &&
        video.readyState >= 2 &&
        !video.seeking &&
        Math.abs(current - lastSeek) > seekEpsilon
      ) {
        video.currentTime = current;
        lastSeek = current;
      }

      const content = contentRef.current;
      if (content) {
        const fade = clamp(1 - progress / contentFadeRange, 0, 1);
        content.style.opacity = fade.toFixed(3);
        content.style.transform = `translate3d(0, ${((1 - fade) * -28).toFixed(1)}px, 0)`;
        content.style.pointerEvents = fade < 0.06 ? "none" : "";
      }

      if (Math.abs(target - current) > 0.0005 || video.seeking) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        lastFrame = 0;
      }
    };

    const start = () => {
      if (running || dead) return;
      running = true;
      lastFrame = 0;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => start();
    const onResize = () => {
      measure();
      start();
    };
    const onLoadedMetadata = () => measure();
    const onLoadedData = () => {
      measure();
      setStatus("ready");
      start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);

    measure();
    start();

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(section);

    // Late font swaps can nudge the layout, which would shift the scroll range.
    if (document.fonts) document.fonts.ready.then(measure).catch(() => {});

    return () => {
      dead = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  return { sectionRef, viewportRef, videoRef, contentRef, status };
}
