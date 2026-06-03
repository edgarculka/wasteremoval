<script setup lang="ts">
const sampleServices = [
  {
    label: "End of Tenancy",
    href: "#",
    description: "Fast rental handover clearances.",
    image: {
      src: "/images/services/end-of-tenancy-rubbish-removal-no-people.png",
      alt: "Half-full waste removal van with end of tenancy boxes, bags and a mattress outside a rental property",
    },
  },
  {
    label: "House Clearance",
    href: "#",
    description: "Rooms, lofts and full-home clearances.",
    image: {
      src: "/images/services/house-clearance-no-people.png",
      alt: "Half-full waste removal van with house clearance furniture, boxes and bags on a driveway",
    },
  },
  {
    label: "Garden Waste",
    href: "#",
    description: "Green waste and outdoor clutter removed.",
    image: {
      src: "/images/services/garden-waste-removal-no-people.png",
      alt: "Half-full waste removal van with branches, fence panels and garden waste bags beside it",
    },
  },
];

const sampleNav = [
  { label: "Services", href: "#", children: sampleServices },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Header</UiHeading>
      <UiText tone="low" class="mt-3">
        Site header with the brand logo on the left, primary nav in the middle,
        and an optional phone CTA + main CTA on the right. Navigation children
        render as image-led mega menu cards on desktop and mobile. The default
        logo switches to the icon mark on small screens. Override via the
        <code>logo</code> slot for any custom markup.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiHeader :nav="sampleNav" phone="+44 7747 251550" cta-href="#" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without phone</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The phone CTA is optional. Only the main CTA renders when omitted.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiHeader
          :nav="[
            { label: 'Services', href: '#' },
            { label: 'Pricing', href: '#' },
          ]"
          cta-href="#"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Custom CTA label</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Override <code>ctaLabel</code> for context-specific copy. Default is
        "Get a quote".
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiHeader
          :nav="sampleNav"
          phone="+44 7747 251550"
          cta-label="Book pickup"
          cta-href="#"
        />
      </div>
    </section>
  </div>
</template>
