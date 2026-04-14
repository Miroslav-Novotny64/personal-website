export function JsonLd() {
  const domain = "https://novotnymiroslav.cz";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Miroslav Novotný",
    url: domain,
    jobTitle: "Student IT; Full-stack Developer",
    description:
      "Student IT směřující na ČVUT FIT s praxí ve full-stack vývoji. Specializující se na Next.js, Javu (Spring Boot).",
    sameAs: [
      "https://github.com/Miroslav-Novotny64",
      "https://www.linkedin.com/in/miroslavnovotny64/",
    ],
    image: `${domain}/expertov-lg.png`,
    knowsAbout: [
      "Next.js",
      "Java",
      "Spring Boot",
      "Rust",
      "TypeScript",
      "SQL",
      "Python",
      "Linux",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Miroslav Novotný - Portfolio",
    url: domain,
    author: {
      "@type": "Person",
      name: "Miroslav Novotný",
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: standard for JSON-LD scripts
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema]),
      }}
    />
  );
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const domain = "https://novotnymiroslav.cz";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${domain}${item.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: standard for JSON-LD scripts
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
