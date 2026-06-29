import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesSchema, faqSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <CaseStudies />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <JsonLd data={[servicesSchema(), faqSchema()]} />
    </>
  );
}
