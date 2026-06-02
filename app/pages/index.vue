<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import type { FaqItem } from "~/components/ui/Faq.vue";
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
  title: "Same-Day Rubbish Removal in West London",
  description:
    "Book same-day rubbish removal and property clearance across West London with fixed load-size pricing and responsible disposal routes.",
  path: "/",
  image: {
    src: "/images/rubbish-removal.webp",
    alt: "Rubbish removal illustration",
    width: 1200,
    height: 900,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "/#business",
    name: companyDetails.tradingName,
    legalName: companyDetails.legalName,
    url: "/",
    telephone: companyDetails.contact.primaryPhone,
    email: companyDetails.contact.email,
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
});

const sellingPoints = [
  "Same-day availability",
  "Clear load-size pricing",
  "No skip permit needed",
];

const trustItems = [
  { value: "Fixed tiers", label: "Pricing" },
  { value: "Photos", label: "Fast estimates" },
  { value: "Same day", label: "West London slots" },
];

const marqueeItems = [
  "Same-day availability",
  "Clear pricing before loading",
  "No skip permit needed",
  "Team loads the items",
  "West London coverage",
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
      "Clear pricing, friendly crew, and no fuss getting a bulky sofa out.",
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

const faqItems: FaqItem[] = [
  {
    question: "Do I need to be home during the collection?",
    answer:
      "Not always. Many of our customers leave items in a designated spot. We'll text 30 minutes before arrival, send photos before and after, and bill once the job is done.",
  },
  {
    question: "What items can't you take?",
    answer:
      "We can collect standard household and business waste. We can't take asbestos, hazardous chemicals, paint tins with liquid inside, or clinical waste - those need a specialist carrier.",
  },
  {
    question: "How quickly can you come out?",
    answer:
      "Same-day across West London if you book before 1pm. Next-day everywhere else, with a guaranteed 2-hour arrival window.",
  },
  {
    question: "How do you handle disposal?",
    answer:
      "Items are taken through appropriate disposal routes, with reusable and recyclable material separated where practical. Ask for transfer-note details before booking if you need them for your records.",
  },
  {
    question: "How is the price worked out?",
    answer:
      "By load size, not by the hour. The five tiers above cover labour, transport and standard disposal handling. The price you see is the price you pay.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "All of West London — Brentford, Hounslow, Ealing, Acton, Chiswick, Richmond, Hammersmith, and surrounding postcodes. Outside that we'll quote on request.",
  },
];

const contactCards: ContactCardLink[] = [
  {
    title: companyDetails.contact.primaryPhoneDisplay,
    description: "Mon–Fri, 7am–7pm",
    href: companyDetails.contact.primaryPhoneHref,
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Fastest response — usually under 5 minutes",
    href: companyDetails.contact.whatsappHref,
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: companyDetails.contact.email,
    description: "We reply within the hour",
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
  <UiSection tone="background" spacing="md" alignment="left">
    <UiHero
      heading="Waste removal, on your schedule."
      description="Same-day rubbish removal and property clearance for tenants, landlords, and businesses. No skip permit, no hassle."
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
            <span aria-hidden="true">›</span>
          </template>
        </UiButton>
      </template>
    </UiHero>
    <UiTrustStrip :items="trustItems" class="mt-8 max-w-3xl" />
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
        class="h-full w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)] aspect-video"
      />
    </template>
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
          class="h-full w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
        />
      </div>
    </template>
    <template #cta>
      <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
      <UiButton href="/services/" variant="secondary" size="lg">
        See services
        <template #iconRight>
          <span aria-hidden="true">›</span>
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
      heading="What waste removal service we offer"
      description="From single item removals to full property clearances, we cover all your waste removal needs across West London."
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
    <UiFaq :items="faqItems" />
    <template #visual>
      <div
        class="rounded-lg border border-border bg-primary p-6 text-primary-foreground shadow-[0_1rem_3rem_rgba(6,53,31,0.12)]"
      >
        <UiHeading :level="3" size="md">Still have questions?</UiHeading>
        <UiText tone="low" class="mt-2">
          We're always here to help - pick whichever way to reach us suits you
          best.
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
      heading="Book your clearance — same day, fixed price."
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
