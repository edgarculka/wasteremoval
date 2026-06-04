<script setup lang="ts">
const termsPath = "/terms/";
const lastUpdated = "4 June 2026";
const companyAddress = formatCompanyAddress(companyDetails.address);
const wasteCarrierText = companyDetails.wasteCarrierRegistration
  ? `Environment Agency waste carrier registration ${companyDetails.wasteCarrierRegistration}`
  : "Environment Agency waste carrier registration details can be provided on request where they apply to the booked service";

const termSections = [
  {
    heading: "1. Who These Terms Apply To",
    paragraphs: [
      `These Terms of Service apply to every customer who requests, books, pays for or receives rubbish removal, waste collection, house clearance, garden waste, office clearance, builders waste, bulky-item removal or related clearance services from ${companyDetails.tradingName}.`,
      `By accepting a quote, placing a booking, making payment or allowing our crew to begin work, you confirm that you have read and accepted these terms. If you book on behalf of a landlord, tenant, managing agent, business, family member or other third party, you confirm that you have authority to do so.`,
    ],
  },
  {
    heading: "2. Business Details",
    paragraphs: [
      `${companyDetails.tradingName} is the trading name used by ${companyDetails.legalName}. Our registered contact address is ${companyAddress}.`,
      `You can contact us by phone on ${companyDetails.contact.primaryPhoneDisplay}, by email at ${companyDetails.contact.email}, or through ${companyDetails.contact.website}. Our regular opening hours are ${companyDetails.openingHours.join(", ")}.`,
      `Our advertised coverage includes ${companyDetails.serviceAreas.join(", ")} and nearby areas where a collection route is available.`,
    ],
  },
  {
    heading: "3. Quotes, Estimates and Pricing",
    paragraphs: [
      "Quotes are based on the information you provide, including photos, waste type, estimated volume, collection address, access conditions, parking, stairs, loading distance and preferred timing.",
      "Unless we clearly state otherwise in writing, a quote is an estimate until the crew can see the waste and access conditions on site. If the actual load, labour, access, item type or disposal route differs from what was described, we may revise the price before loading starts.",
      "Prices normally include labour, loading, transport and lawful disposal for the agreed waste. Additional charges may apply for specialist items, extra weight, restricted materials, waiting time, parking, congestion or clean air zone costs, multiple loads, or work that was not included in the original quote.",
    ],
  },
  {
    heading: "4. Bookings and Service Windows",
    paragraphs: [
      "A booking is confirmed only when we have accepted the job, agreed the likely price or pricing basis, and recorded the collection address and contact details.",
      "Arrival times are service windows rather than guaranteed exact appointment times. Traffic, previous jobs, disposal-site queues, vehicle issues, weather and access restrictions can affect arrival. We will make reasonable efforts to update you where timings change.",
      "Same-day and short-notice collections are subject to crew availability, safe access, lawful disposal options and enough information being provided before dispatch.",
    ],
  },
  {
    heading: "5. Customer Responsibilities",
    paragraphs: [
      "You must provide accurate information about the waste, access, parking, property layout and any risks our crew should know about before arrival.",
      "You must ensure that you own the items being removed or have permission from the owner, landlord, tenant, managing agent or business to remove them.",
      "You are responsible for identifying the items to be removed. We are not responsible for removing an item that was presented to us as waste or for leaving an item that was not clearly identified for removal.",
      "You must provide safe access at the agreed time. This includes arranging keys, gate codes, lifts, parking permissions, loading access and any building-management approval needed for the collection.",
    ],
  },
  {
    heading: "6. Waste We Cannot Take Without Prior Agreement",
    paragraphs: [
      "Standard collections do not include asbestos, clinical or sanitary waste, hazardous chemicals, explosives, firearms, controlled substances, pressurised containers, gas bottles, large quantities of paint, solvents, oils, contaminated soil, animal waste, or any waste requiring a specialist licensed route unless we have agreed this in advance.",
      "Some items, including fridges, freezers, tyres, mattresses, WEEE electrical items, upholstered seating and plasterboard, may need separate handling or extra disposal charges. These must be declared before booking where possible.",
      "If restricted, dangerous or misdescribed waste is discovered on site, we may refuse to remove it, revise the price, remove only the agreed items, or cancel the collection. You remain responsible for any costs already incurred.",
    ],
  },
  {
    heading: "7. Access, Safety and Site Conditions",
    paragraphs: [
      "Our crew may refuse or stop work where conditions are unsafe, unlawful or unsuitable. This includes unsafe structures, blocked access, excessive manual-handling risk, aggressive behaviour, uncontrolled animals, poor lighting, hazardous substances, unstable waste piles or severe weather.",
      "Please tell us in advance about stairs, narrow hallways, basements, lofts, rear-garden access, long carries, lift restrictions, controlled parking zones and any fragile surfaces. These conditions can affect price, timing and whether the job can be completed safely.",
      "Where we need to move items through a property, you should protect floors, walls, fixtures and fittings where appropriate and remove obstacles before arrival.",
    ],
  },
  {
    heading: "8. Lawful Disposal and Duty of Care",
    paragraphs: [
      `${companyDetails.tradingName} aims to handle waste responsibly and in line with applicable UK waste duty-of-care requirements. ${wasteCarrierText}.`,
      "Waste may be taken to authorised transfer stations, recycling facilities, reuse routes or specialist processors depending on the load. We may separate reusable, recyclable, restricted or chargeable items where practical.",
      "If you require a waste transfer note, invoice, receipt or disposal record, please request this before or at the time of booking so we can confirm what can be provided for your service.",
    ],
  },
  {
    heading: "9. Payment Terms",
    paragraphs: [
      "Payment is due on completion of the collection unless we agree different payment terms in writing before the job starts.",
      "We may request payment in advance, a deposit, staged payment or immediate settlement before unloading in circumstances such as larger jobs, commercial work, repeat bookings, multiple loads, long-distance disposal or short-notice bookings.",
      "If payment is late, refused or reversed without a valid reason, we may suspend further services, recover the debt, add reasonable recovery costs and charge statutory interest where applicable.",
    ],
  },
  {
    heading: "10. Cancellations, Rescheduling and Failed Collections",
    paragraphs: [
      "Please tell us as soon as possible if you need to cancel or reschedule. We will make reasonable efforts to move the booking where route availability allows.",
      "A cancellation, call-out or waiting-time fee may apply where a booking is cancelled at short notice, access is unavailable, the customer is not present when required, parking or keys have not been arranged, or the waste is materially different from what was described.",
      "We may cancel or reschedule a collection because of safety concerns, vehicle issues, disposal-site disruption, severe weather, staff illness, traffic, regulatory requirements or any other event outside our reasonable control.",
    ],
  },
  {
    heading: "11. Damage, Liability and Insurance",
    paragraphs: [
      "We take reasonable care when carrying out collections. You should tell us before work begins about fragile surfaces, concealed pipes or cables, weak flooring, loose fixtures, restricted access or items requiring special handling.",
      "We are not liable for pre-existing damage, ordinary wear and tear, damage caused by moving items through unsuitable access, or losses caused by inaccurate information provided to us.",
      "Nothing in these terms limits liability that cannot legally be limited, including liability for death or personal injury caused by negligence. Subject to that, our liability is limited to direct loss caused by our proven negligence and will not include indirect loss, loss of profit, loss of business, loss of opportunity or consequential loss.",
    ],
  },
  {
    heading: "12. Complaints and Disputes",
    paragraphs: [
      `If something has gone wrong, contact us promptly at ${companyDetails.contact.email} or ${companyDetails.contact.primaryPhoneDisplay} with the booking name, collection address, date, photos where relevant and a clear description of the issue.`,
      "We aim to resolve complaints fairly and quickly. Please raise damage or service concerns as soon as reasonably possible so they can be investigated while the details are fresh.",
      "These terms are governed by the laws of England and Wales. If a dispute cannot be resolved informally, the courts of England and Wales will have jurisdiction.",
    ],
  },
  {
    heading: "13. Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time to reflect changes in our services, pricing, legal obligations or operating procedures. The terms published on this page apply from the date shown above unless a different written agreement has been made for your booking.",
    ],
  },
];

usePageSeo({
  title: "Terms of Service",
  description:
    "Terms of Service for DBS Waste rubbish removal, bookings, quotes, access, restricted waste, disposal, payments, cancellations and liability.",
  path: termsPath,
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${termsPath}#webpage`,
      name: "Terms of Service",
      url: termsPath,
      description:
        "Terms of Service for DBS Waste rubbish removal, bookings, quotes, access, restricted waste, disposal, payments, cancellations and liability.",
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
        { "@type": "ListItem", position: 2, name: "Terms", item: termsPath },
      ],
    },
  ],
});
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHeading :level="1" size="xl">Terms of Service</UiHeading>
    <UiText size="lg" tone="low" class="max-w-3xl">
      These terms explain how {{ companyDetails.tradingName }} handles bookings,
      waste collections, pricing, access, payment, restricted materials and
      service responsibilities.
    </UiText>
    <dl class="grid gap-4 rounded-lg border border-border bg-secondary p-5 text-secondary-foreground sm:grid-cols-2">
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Last updated</UiText>
        <UiText as="dd" weight="semibold">{{ lastUpdated }}</UiText>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Contact</UiText>
        <UiText as="dd" weight="semibold">{{ companyDetails.contact.primaryPhoneDisplay }}</UiText>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Email</UiText>
        <UiLink :href="companyDetails.contact.emailHref" treatment="subtle">
          {{ companyDetails.contact.email }}
        </UiLink>
      </div>
      <div>
        <UiText as="dt" size="xs" tone="low" weight="semibold">Address</UiText>
        <UiText as="dd" weight="semibold">{{ companyAddress }}</UiText>
      </div>
    </dl>
  </UiSection>

  <UiSection tone="secondary" spacing="md" alignment="left">
    <article class="max-w-4xl space-y-10">
      <section v-for="section in termSections" :key="section.heading" class="space-y-3">
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
