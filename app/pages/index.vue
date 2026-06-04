<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import type { ReviewItem } from "~/components/ui/Reviews.vue";
import type {
  ServicesLocation,
  ServicesService,
} from "~/components/ui/Services.vue";

interface ContactCardLink {
  title: string;
  description: string;
  href: string;
  icon: Component;
  iconLabel: string;
}

const homeHeroSrcset =
  "/images/rubbish-removal-640.webp 640w, /images/rubbish-removal-960.webp 960w, /images/rubbish-removal.webp 1200w";
const truckSrcset =
  "/images/truck-640.webp 640w, /images/truck-960.webp 960w, /images/truck.webp 1200w";
const workerSrcset =
  "/images/waste-removal-service-worker-640.webp 640w, /images/waste-removal-service-worker-960.webp 960w, /images/waste-removal-service-worker.webp 1200w";
const halfWidthImageSizes =
  "(min-width: 1024px) 50vw, calc(100vw - 48px)";
const ctaImageSizes = "(min-width: 1024px) 20rem, calc(100vw - 96px)";

usePageSeo({
  title: "Same-Day Rubbish Removal in London",
  description:
    "Book rubbish removal and property clearance across West, Central, North and South London with clear load-size pricing and responsible disposal routes.",
  path: "/",
  image: {
    src: "/images/rubbish-removal.webp",
    alt: "Rubbish removal illustration",
    width: 1200,
    height: 900,
  },
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "/#business",
      name: companyDetails.tradingName,
      legalName: companyDetails.legalName,
      url: "/",
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
      image: "/images/rubbish-removal.webp",
      priceRange: companyDetails.priceRange,
      openingHours: companyDetails.openingHours,
      areaServed: companyDetails.serviceAreas.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      makesOffer: seoServices.map((service) => ({
        "@type": "Offer",
        url: buildServicePath(service),
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
        },
      })),
    },
    buildFaqStructuredData(homeFaqs, "/#faq"),
  ],
});

const sellingPoints = [
  "Same-day slots where possible",
  "Clear load-size pricing",
  "No skip permit needed",
];

const trustItems = [
  { value: "Fixed tiers", label: "Pricing" },
  { value: "Photos", label: "Fast estimates" },
  { value: "Local", label: "London slots" },
];

const marqueeItems = [
  "Same-day slots where possible",
  "Clear pricing before loading",
  "No skip permit needed",
  "Team loads the items",
  "West, Central, North and South London coverage",
  "Photo estimates accepted",
];

const reviews: ReviewItem[] = [
  {
    author: "Aisha Khan",
    meta: "House clearance",
    rating: 5,
    quote: "Booked in minutes, arrived on time, and left the place spotless.",
  },
  {
    author: "Tom Bradley",
    meta: "Sofa removal",
    rating: 5,
    quote:
      "Clear pricing, friendly crew, and careful with a bulky sofa.",
  },
  {
    author: "Maya Roberts",
    meta: "Garden waste",
    rating: 4.5,
    quote: "Fast collection and they swept up after loading everything.",
  },
  {
    author: "Daniel Green",
    meta: "Office clear-out",
    rating: 5,
    quote: "Professional from quote to pickup. Exactly what we needed.",
  },
  {
    author: "Nina Patel",
    meta: "Garage clearance",
    rating: 5,
    quote: "They handled years of clutter in one visit and kept me updated.",
  },
  {
    author: "George Wilson",
    meta: "Appliance removal",
    rating: 4.5,
    quote: "Simple, tidy, and much easier than hiring a skip.",
  },
];

const contactCards: ContactCardLink[] = [
  {
    title: companyDetails.contact.primaryPhoneDisplay,
    description: companyDetails.openingHoursDisplay,
    href: companyDetails.contact.primaryPhoneHref,
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Send photos for a faster estimate",
    href: companyDetails.contact.whatsappHref,
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: companyDetails.contact.email,
    description: "Send photos or access notes",
    href: companyDetails.contact.emailHref,
    icon: IconsMail,
    iconLabel: "Email",
  },
];

const homeServices: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: buildServicePath(service),
  image: service.image,
  meta: service.searchTerms[0],
  highlights: service.sellingPoints.slice(0, 2),
}));

const homeServiceLocations: ServicesLocation[] = seoLocations.map(
  (location) => ({
    label: location.name,
    href: buildAreaPath(location),
  }),
);

const { bookingLoads, openBookingWizard } = useBookingWizard();
const selectedPricingLoadId = ref<string | null>(null);

function openBookingWithPricingSelection() {
  openBookingWizard(selectedPricingLoadId.value);
}
</script>

<template>
  <UiSection tone="background" spacing="md" alignment="left" wide>
    <UiHero
      heading="Waste removal, on your schedule."
      description="Rubbish removal and property clearance for tenants, landlords, and businesses across West, Central, North and South London. No skip permit needed."
    >
      <template #actions>
        <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
        <UiButton
          href="/services/"
          variant="ghost"
          size="lg"
        >
          See services
          <template #iconRight>
            <IconsChevronRight />
          </template>
        </UiButton>
      </template>
      <template #visual>
        <img
          src="/images/rubbish-removal.webp"
          alt="Rubbish removal illustration"
          width="1200"
          height="900"
          :srcset="homeHeroSrcset"
          :sizes="halfWidthImageSizes"
          fetchpriority="high"
          decoding="async"
          class="aspect-video h-full w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.16)]"
        />
      </template>
    </UiHero>
    <UiTrustStrip :items="trustItems" class="mt-8 max-w-3xl" />
  </UiSection>

  <UiMarquee tone="primary" :items="marqueeItems" />

  <UiSection
    tone="background"
    spacing="md"
    alignment="center"
    wide
    :ribbon="{ label: 'Pricing with no hidden fees' }"
  >
      <UiPricing
        lead="From"
        accent="GBP 40"
      trailing="per clearance"
      selectable
      :tiers="bookingLoads"
      :selected-tier-id="selectedPricingLoadId"
      @select="selectedPricingLoadId = $event"
    />

    <template #cta>
      <UiButton size="lg" @click="openBookingWithPricingSelection">
        Book a slot
      </UiButton>
    </template>
  </UiSection>

  <UiSection
    title="Last minute bookings available"
    spacing="sm"
    tone="secondary"
    class="!pb-2"
  >
    <template #default>
      <UiTickList :items="sellingPoints"> </UiTickList>
    </template>
    <template #visual>
      <div class="max-w-180 aspect-[4/3] mx-auto">
        <img
          src="/images/truck.webp"
          alt="Rubbish removal truck illustration"
          width="1200"
          height="900"
          :srcset="truckSrcset"
          :sizes="halfWidthImageSizes"
          loading="lazy"
          decoding="async"
          class="h-full w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.16)]"
        />
      </div>
    </template>
    <template #cta>
      <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
      <UiButton href="/services/" variant="secondary" size="lg">
        See services
        <template #iconRight>
          <IconsChevronRight />
        </template>
      </UiButton>
    </template>
  </UiSection>

  <UiSection
    spacing="md"
    tone="secondary"
    alignment="center"
    wide
    class="!pt-4"
  >
    <UiReviews
      :average="4.8"
      average-label="Feedback from recent collections"
      :reviews="reviews"
    />
  </UiSection>

  <UiSection tone="background" spacing="md" alignment="center" wide>
    <UiServices
      heading="Waste removal services"
      :description="`From single items to full property clearances, ${companyDetails.tradingName} covers common rubbish removal jobs across West, Central, North and South London.`"
      :services="homeServices"
      :locations="homeServiceLocations"
      location-label="Popular service areas"
      cta-label="View service"
    />
  </UiSection>

  <UiSection
    tone="background"
    spacing="md"
    alignment="left"
    title="Frequently asked questions"
  >
    <UiFaq :items="homeFaqs" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-primary p-6 text-primary-foreground shadow-[0_1rem_3rem_rgb(var(--shadow-color)/0.12)]"
      >
        <UiHeading :level="3" size="md">Still have questions?</UiHeading>
        <UiText tone="low" class="mt-2">
          Send photos, access notes or a postcode and the team will help with
          the next step.
        </UiText>
        <div class="mt-5 flex flex-col gap-3">
          <UiCard
            v-for="card in contactCards"
            :key="card.href"
            v-bind="card"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UiSection>

  <UiSection tone="secondary" spacing="md" alignment="left">
    <UiCallToAction
      heading="Book your clearance with clear pricing."
      :points="sellingPoints"
      image-src="/images/waste-removal-service-worker.webp"
      image-width="1200"
      image-height="800"
      :image-srcset="workerSrcset"
      :image-sizes="ctaImageSizes"
      image-alt="Waste removal worker ready for a booked collection"
    >
      <template #cta>
        <UiButton size="lg" variant="secondary" @click="openBookingWizard">
          Get a quote
        </UiButton>
      </template>
    </UiCallToAction>
  </UiSection>
</template>
