import { createFileRoute } from "@tanstack/react-router";
import { images, pageTitle } from "@/config/siteConfig";
import { SectionHeading } from "@/components/site/Reveal";
import { CtaBanner, PageBanner, ServicesGrid } from "@/components/site/Blocks";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: pageTitle("Services") },
      { name: "description", content: "Company formation, audit, accounting, tax, compliance, financial and management consultancy, IT reviews and corporate advisory in Lahore." },
      { property: "og:title", content: pageTitle("Services") },
      { property: "og:description", content: "Nine professional services from Sadiq Associates, a Chartered Firm in Lahore." },
      { property: "og:url", content: "https://sadiqassociates.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://sadiqassociates.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageBanner title="Services" crumbs={[{ label: "Services" }]} image={images.consulting} />
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What We Offer" title="Professional Services Built Around Your Business" text="From company formation and accounting to audit, tax and business advisory, we provide practical solutions that help organisations stay compliant, improve financial control and make confident decisions." />
          <ServicesGrid />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
