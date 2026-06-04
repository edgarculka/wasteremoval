<script setup lang="ts">
const privacyPath = "/privacy/";
const lastUpdated = "4 June 2026";
const companyAddress = formatCompanyAddress(companyDetails.address);
const businessInformationLine = getBusinessInformationLine(companyDetails);
const privacyImage = {
  src: "/images/hero.jpeg",
  alt: `${companyDetails.tradingName} rubbish removal team loading waste into a collection van`,
  width: 1200,
  height: 800,
};

const privacySections = [
  {
    heading: "1. Who We Are",
    paragraphs: [
      `${companyDetails.tradingName} is the trading name used by ${companyDetails.legalName}. We provide rubbish removal, waste collection and clearance services across ${companyDetails.serviceAreas.join(", ")} and nearby areas where a route is available.`,
      businessInformationLine,
      `For privacy questions, contact us at ${companyDetails.contact.email}, call ${companyDetails.contact.primaryPhoneDisplay}, or write to ${companyAddress}.`,
    ],
  },
  {
    heading: "2. Personal Data We Collect",
    paragraphs: [
      "We collect the information needed to answer enquiries, prepare quotes, arrange collections, complete bookings, take payment, manage complaints and keep business records.",
      "This may include your name, phone number, email address, collection address, billing details, photos of waste, access notes, preferred collection times, booking history, messages, call notes, payment status, invoice details and any information you choose to send through forms, email, phone, WhatsApp or other contact channels.",
      "When you use our website, we may also collect technical information such as IP address, browser type, device type, pages visited, referral source, approximate location, cookie identifiers and interaction data.",
    ],
  },
  {
    heading: "3. How We Use Your Data",
    paragraphs: [
      "We use your personal data to respond to quote requests, assess waste photos, price collections, plan routes, contact you about bookings, provide the service, take payment, issue receipts, handle complaints, improve our website and keep records required for tax, accounting, insurance and waste duty-of-care purposes.",
      "We may also use contact details to follow up on an enquiry or booking, send service updates, ask for missing information, or respond to a review or complaint.",
    ],
  },
  {
    heading: "4. Our Lawful Bases",
    paragraphs: [
      "Under UK data protection law, we rely on different lawful bases depending on the activity.",
      "We use contract where processing is needed to provide a quote, arrange a booking or deliver a service you have requested. We use legitimate interests to manage enquiries, prevent fraud, improve the website, recover debts, keep operational records and run the business responsibly. We use legal obligation where records must be kept for tax, accounting, regulatory, insurance or waste-compliance reasons. We use consent where the law requires consent, such as certain cookie or marketing choices.",
    ],
  },
  {
    heading: "5. Photos, Waste Details and Property Information",
    paragraphs: [
      "Waste photos and access notes help us estimate load size, identify restricted materials, plan equipment and avoid dispatching a crew without enough information.",
      "Please avoid sending photos that include unnecessary personal information, such as documents, faces, bank cards, medical information or private possessions that are not relevant to the collection. If you send this information, we will use it only as needed to assess or manage the service.",
    ],
  },
  {
    heading: "6. Sharing Your Data",
    paragraphs: [
      "We share personal data only where necessary. This can include crew members, booking administrators, payment processors, email and hosting providers, analytics providers, accountants, insurers, professional advisers, waste-transfer or disposal partners, regulators, law enforcement, debt-recovery providers and IT support providers.",
      "We do not sell your personal data. Where suppliers process data for us, we expect them to protect it and use it only for the agreed service.",
    ],
  },
  {
    heading: "7. Website Analytics, Cookies and Similar Tools",
    paragraphs: [
      "Our website may use cookies, analytics and similar technologies to understand visits, improve pages, measure enquiries and maintain website security.",
      "The site uses Microsoft Clarity to understand how visitors interact with pages. Clarity may collect usage data such as clicks, scrolls, page views, browser information and device information. You can control cookies through your browser settings, and some tools may also provide their own opt-out controls.",
    ],
  },
  {
    heading: "8. Payments",
    paragraphs: [
      "If card, bank-transfer or online payment details are used for a booking, payment information may be processed by banking and payment-service providers. We do not need to store full card numbers to provide the waste removal service.",
      "We may keep payment confirmations, invoice details and transaction references for accounting, fraud-prevention, complaint-handling and legal-record purposes.",
    ],
  },
  {
    heading: "9. How Long We Keep Data",
    paragraphs: [
      "We keep personal data only for as long as reasonably needed for the purpose it was collected and for legitimate business, legal, accounting, insurance, complaint or regulatory reasons.",
      "Enquiry and booking information is usually kept for the period needed to manage the service and maintain business records. Accounting records may be kept for up to six years. Complaint, insurance or legal records may be kept for longer where reasonably necessary to protect legal rights or comply with obligations.",
    ],
  },
  {
    heading: "10. International Transfers",
    paragraphs: [
      "Some website, email, analytics, payment or cloud-service providers may process data outside the United Kingdom. Where this happens, we rely on appropriate safeguards such as UK-approved contractual terms, adequacy regulations or equivalent protections where required.",
    ],
  },
  {
    heading: "11. Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect personal data against unauthorised access, loss, misuse or disclosure. No website, email system or online service can be guaranteed completely secure, so please avoid sending highly sensitive information unless it is necessary for the service.",
    ],
  },
  {
    heading: "12. Your Rights",
    paragraphs: [
      "Under UK data protection law, you may have rights to access your personal data, ask for inaccurate data to be corrected, request deletion, restrict processing, object to certain processing, request data portability, withdraw consent where processing is based on consent, and complain to the Information Commissioner's Office.",
      `To exercise your rights, contact ${companyDetails.contact.email}. We may need to verify your identity and ask for enough detail to locate the relevant booking, enquiry or record.`,
    ],
  },
  {
    heading: "13. Marketing",
    paragraphs: [
      "We may contact you about an enquiry or booking you started with us. We will not send unrelated direct marketing by email or text unless we have a lawful basis to do so and you can opt out where required.",
    ],
  },
  {
    heading: "14. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy when our services, website tools, suppliers or legal obligations change. The latest version will be published on this page with the last-updated date shown above.",
    ],
  },
];

usePageSeo({
  title: "Privacy Policy",
  description: `Privacy Policy for ${companyDetails.tradingName} explaining how enquiry, booking, payment, website analytics and waste collection data is collected, used, shared and retained.`,
  path: privacyPath,
  image: privacyImage,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${privacyPath}#webpage`,
      name: "Privacy Policy",
      url: privacyPath,
      description: `Privacy Policy for ${companyDetails.tradingName} explaining how enquiry, booking, payment, website analytics and waste collection data is collected, used, shared and retained.`,
      isPartOf: {
        "@type": "WebSite",
        "@id": "/#website",
        name: companyDetails.tradingName,
        url: "/",
      },
      about: {
        "@type": "LocalBusiness",
        "@id": "/#business",
        name: companyDetails.tradingName,
        legalName: companyDetails.legalName,
        telephone: companyDetails.contact.primaryPhone,
        email: companyDetails.contact.email,
        identifier: companyDetails.wasteCarrier.registrationNumber,
        address: {
          "@type": "PostalAddress",
          streetAddress: [companyDetails.address.buildingNumber, companyDetails.address.street]
            .filter(Boolean)
            .join(" "),
          addressLocality: companyDetails.address.townOrCity,
          postalCode: companyDetails.address.postcode,
          addressCountry: companyDetails.address.countryCode,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Privacy", item: privacyPath },
      ],
    },
  ],
});
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHeading :level="1" size="xl">Privacy Policy</UiHeading>
    <UiText size="lg" tone="low" class="max-w-3xl">
      This policy explains how {{ companyDetails.tradingName }} collects, uses
      and protects personal data when you request a quote, book a clearance,
      contact us or use this website.
    </UiText>
    <dl class="grid gap-4 rounded-lg border border-border bg-secondary p-5 text-secondary-foreground sm:grid-cols-2">
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Last updated</UiText>
        <UiText as="dd" weight="semibold">{{ lastUpdated }}</UiText>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Data contact</UiText>
        <UiLink :href="companyDetails.contact.emailHref" treatment="subtle">
          {{ companyDetails.contact.email }}
        </UiLink>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Phone</UiText>
        <UiText as="dd" weight="semibold">{{ companyDetails.contact.primaryPhoneDisplay }}</UiText>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Address</UiText>
        <UiText as="dd" weight="semibold">{{ companyAddress }}</UiText>
      </div>
    </dl>
  </UiSection>

  <UiSection tone="secondary" spacing="md" alignment="left">
    <article class="max-w-4xl space-y-10">
      <section v-for="section in privacySections" :key="section.heading" class="space-y-3">
        <UiHeading :level="2" size="md">{{ section.heading }}</UiHeading>
        <UiText
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          size="lg"
          tone="low"
        >
          {{ paragraph }}
        </UiText>
      </section>
    </article>
  </UiSection>
</template>
