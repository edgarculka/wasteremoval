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

usePageSeo({
  title: "Same-Day Rubbish Removal in West London",
  description:
    "Same-day rubbish removal and property clearance across West London.",
  path: "/",
  image: {
    src: "/images/rubbish-removal.png",
    alt: "Rubbish removal illustration",
    width: 1600,
    height: 1200,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyDetails.tradingName,
    url: "/",
    areaServed: seoLocations.map((location) => location.name),
    makesOffer: seoServices.map((service) => ({
      "@type": "Offer",
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
  "5-star Google rating",
  "No skip permit needed",
];

const trustItems = [
  { value: "21K+", label: "Properties cleared" },
  { value: "4.9/5", label: "Customer rating" },
  { value: "Same day", label: "West London slots" },
];

const marqueeItems = [
  "Over 21K properties cleared",
  "Same-day availability",
  "5-star Google rating",
  "No skip permit needed",
  "Fully licensed waste carriers",
  "0 missed pickups",
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
      "We're licensed for general household and business waste. We can't take asbestos, hazardous chemicals, paint tins with liquid inside, or clinical waste — those need a specialist carrier.",
  },
  {
    question: "How quickly can you come out?",
    answer:
      "Same-day across West London if you book before 1pm. Next-day everywhere else, with a guaranteed 2-hour arrival window.",
  },
  {
    question: "Are you fully licensed?",
    answer:
      "Yes — we're registered upper-tier waste carriers with the Environment Agency (CBDU number on every receipt). 95%+ of what we collect is recycled or reused.",
  },
  {
    question: "How is the price worked out?",
    answer:
      "By load size, not by the hour. The five tiers above cover everything we do — labour, transport, and licensed disposal included. The price you see is the price you pay.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "All of West London — Brentford, Hounslow, Ealing, Acton, Chiswick, Richmond, Hammersmith, and surrounding postcodes. Outside that we'll quote on request.",
  },
];

const contactCards: ContactCardLink[] = [
  {
    title: "020 1234 5678",
    description: "Mon–Fri, 7am–7pm",
    href: "tel:+442012345678",
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Fastest response — usually under 5 minutes",
    href: "https://wa.me/442012345678",
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: "hello@bigvanmen.com",
    description: "We reply within the hour",
    href: "mailto:hello@bigvanmen.com",
    icon: IconsMail,
    iconLabel: "Email",
  },
];

const primaryLocation = seoLocations[0];
const primaryService = seoServices[0];

const homeServices: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: primaryLocation
    ? buildServiceLocationPath(service, primaryLocation)
    : `/${service.slug}/`,
  image: service.image,
  meta: service.searchTerms[0],
  highlights: service.sellingPoints.slice(0, 2),
}));

const homeServiceLocations: ServicesLocation[] = seoLocations.map(
  (location) => ({
    label: location.name,
    href: primaryService
      ? buildServiceLocationPath(primaryService, location)
      : `/${location.slug}/`,
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
    <template #above>
      <UiRating :value="5">Five star rating</UiRating>
    </template>
    <UiHero
      heading="Waste removal, on your schedule."
      description="Same-day rubbish removal and property clearance for tenants, landlords, and businesses. No skip permit, no hassle."
    >
      <template #actions>
        <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
        <UiButton
          href="/end-of-tenancy-rubbish-removal/brentford/"
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
        src="/images/rubbish-removal.png"
        alt="Rubbish removal illustration"
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
      accent="£40"
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
          src="/images/truck.png"
          alt="Rubbish removal truck illustration"
          class="h-full w-full rounded-lg border border-border object-cover shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
        />
      </div>
    </template>
    <template #cta>
      <UiButton size="lg" @click="openBookingWizard">Get a quote</UiButton>
      <UiButton variant="secondary" size="lg">
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
      :average="4.9"
      average-label="Average from 240+ customer reviews"
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
      :rating-value="5"
      rating-label="Rated 5 stars by 500+ West London customers"
      image-src="/images/waste-removal-service-worker.png"
      image-alt=""
    >
      <template #cta>
        <UiButton size="lg" variant="secondary" @click="openBookingWizard">
          Get a quote
        </UiButton>
      </template>
    </UiCallToAction>
  </UiSection>
</template>
