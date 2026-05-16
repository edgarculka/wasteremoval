<script setup lang="ts">
const route = useRoute();

const groups = [
  {
    heading: "Start",
    links: [{ label: "Overview", href: "/design-system" }],
  },
  {
    heading: "Page sections",
    links: [
      { label: "Call to action", href: "/design-system/call-to-action" },
      { label: "Hero", href: "/design-system/hero" },
      { label: "Marquee", href: "/design-system/marquee" },
      { label: "Pricing", href: "/design-system/pricing" },
      { label: "Reviews", href: "/design-system/reviews" },
      { label: "Section", href: "/design-system/section" },
      { label: "Services", href: "/design-system/services" },
      { label: "Skip comparison", href: "/design-system/skip-comparison" },
      { label: "Thank you", href: "/design-system/thank-you" },
    ],
  },
  {
    heading: "Compositions",
    links: [
      { label: "Booking wizard", href: "/design-system/booking-wizard" },
      { label: "Calendar", href: "/design-system/calendar" },
      { label: "FAQ", href: "/design-system/faq" },
      { label: "Footer", href: "/design-system/footer" },
      { label: "Header", href: "/design-system/header" },
      { label: "Rating", href: "/design-system/rating" },
      { label: "Sidebar", href: "/design-system/sidebar" },
      { label: "Tick list", href: "/design-system/tick-list" },
      { label: "Time picker", href: "/design-system/time-picker" },
    ],
  },
  {
    heading: "Primitives",
    links: [
      { label: "Buttons", href: "/design-system/buttons" },
      { label: "Card", href: "/design-system/card" },
      { label: "Input", href: "/design-system/input" },
      { label: "Tag", href: "/design-system/tag" },
    ],
  },
  {
    heading: "Foundations",
    links: [
      { label: "Typography", href: "/design-system/typography" },
      { label: "Icons", href: "/design-system/icons" },
      { label: "Logo", href: "/design-system/logo" },
    ],
  },
];
</script>

<template>
  <div class="flex flex-1 flex-col items-stretch lg:flex-row lg:items-start">
    <UiSidebar
      logo
      logo-mark="design-system"
      logo-href="/design-system"
      logo-label="Design system overview"
      :groups="groups"
      :selected-href="route.path"
      aria-label="Design system navigation"
      class="lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto"
    />
    <main class="min-w-0 flex-1 px-6 py-8 sm:px-8 lg:py-10">
      <slot />
    </main>
  </div>
</template>
