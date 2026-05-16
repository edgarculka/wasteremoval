<script setup lang="ts">
import ShowcasesBookingWizard from "~/components/showcases/BookingWizard.vue";
import ShowcasesButtons from "~/components/showcases/Buttons.vue";
import ShowcasesCalendar from "~/components/showcases/Calendar.vue";
import ShowcasesCallToAction from "~/components/showcases/CallToAction.vue";
import ShowcasesCard from "~/components/showcases/Card.vue";
import ShowcasesFaq from "~/components/showcases/Faq.vue";
import ShowcasesFooter from "~/components/showcases/Footer.vue";
import ShowcasesHeader from "~/components/showcases/Header.vue";
import ShowcasesHero from "~/components/showcases/Hero.vue";
import ShowcasesIcons from "~/components/showcases/Icons.vue";
import ShowcasesInput from "~/components/showcases/Input.vue";
import ShowcasesLogo from "~/components/showcases/Logo.vue";
import ShowcasesMarquee from "~/components/showcases/Marquee.vue";
import ShowcasesPricing from "~/components/showcases/Pricing.vue";
import ShowcasesRating from "~/components/showcases/Rating.vue";
import ShowcasesReviews from "~/components/showcases/Reviews.vue";
import ShowcasesSection from "~/components/showcases/Section.vue";
import ShowcasesServices from "~/components/showcases/Services.vue";
import ShowcasesSidebar from "~/components/showcases/Sidebar.vue";
import ShowcasesSkipComparison from "~/components/showcases/SkipComparison.vue";
import ShowcasesTag from "~/components/showcases/Tag.vue";
import ShowcasesThankYou from "~/components/showcases/ThankYou.vue";
import ShowcasesTickList from "~/components/showcases/TickList.vue";
import ShowcasesTimePicker from "~/components/showcases/TimePicker.vue";
import ShowcasesTypography from "~/components/showcases/Typography.vue";

definePageMeta({
  layout: false,
});

const showcases = {
  "booking-wizard": ShowcasesBookingWizard,
  buttons: ShowcasesButtons,
  calendar: ShowcasesCalendar,
  card: ShowcasesCard,
  "call-to-action": ShowcasesCallToAction,
  faq: ShowcasesFaq,
  footer: ShowcasesFooter,
  header: ShowcasesHeader,
  hero: ShowcasesHero,
  icons: ShowcasesIcons,
  input: ShowcasesInput,
  logo: ShowcasesLogo,
  marquee: ShowcasesMarquee,
  pricing: ShowcasesPricing,
  rating: ShowcasesRating,
  reviews: ShowcasesReviews,
  section: ShowcasesSection,
  services: ShowcasesServices,
  sidebar: ShowcasesSidebar,
  "skip-comparison": ShowcasesSkipComparison,
  tag: ShowcasesTag,
  "thank-you": ShowcasesThankYou,
  "tick-list": ShowcasesTickList,
  "time-picker": ShowcasesTimePicker,
  typography: ShowcasesTypography,
} as const;

type ShowcaseSlug = keyof typeof showcases;

const route = useRoute();
const slug = route.params.component as string;

if (!(slug in showcases)) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const Showcase = showcases[slug as ShowcaseSlug];

useSeoMeta({
  title: "Fullscreen preview — Design System",
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="flex-1 px-8 py-10">
    <div class="relative">
      <div class="absolute right-0 top-0 z-20">
        <DsFullscreenToggle
          mode="minimize"
          :href="`/design-system/${slug}`"
        />
      </div>
      <div class="fullscreen-preview">
        <component :is="Showcase" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.fullscreen-preview :deep(> div > header:first-child) {
  display: none;
}

.fullscreen-preview :deep(> div > header:first-child + *) {
  margin-top: 0;
}
</style>
