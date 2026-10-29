import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex min-h-[70vh] items-center bg-navy pt-24">
        <div className="shell text-center">
          <span className="eyebrow text-gold">404</span>
          <h1 className="heading-lg mt-5 text-white">This page has moved on</h1>
          <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.8] text-white/65">
            The page you were looking for could not be found. Let&apos;s get you back to the
            properties.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/" variant="light" withArrow>
              Back Home
            </ButtonLink>
            <ButtonLink href="/properties" variant="outline" withArrow>
              Browse Properties
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
