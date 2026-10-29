import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PropertiesBrowser } from "@/components/PropertiesBrowser";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse the Horizon Properties portfolio — search and filter luxury homes, villas, estates and penthouses across the United States.",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Portfolio"
          title="Explore Our Properties"
          description="Search our current collection of architecturally significant homes and investment properties, and filter to find the one that fits."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Properties" }]}
        />
        <PropertiesBrowser initialType={params.type ?? ""} initialQuery={params.q ?? ""} />
      </main>
      <Footer />
    </>
  );
}
