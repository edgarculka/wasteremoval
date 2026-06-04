<script setup lang="ts">
const sampleServices = seoServices.map((service) => ({
  label: service.name,
  href: "#",
  description: service.shortDescription,
  image: {
    src: service.image.src,
    alt: service.image.alt,
    width: service.image.width,
    height: service.image.height,
  },
}));

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
        render as a compact service mega menu on desktop and an accordion list
        on mobile. The default logo switches to the icon mark on small screens.
        Override via the <code>logo</code> slot for any custom markup.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Services mega menu</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The services menu uses small thumbnails and concise labels so eight
        service choices stay scannable. On mobile, the same children collapse
        behind the Services row with descriptions reduced to one line.
      </UiText>
      <div class="relative z-30 mt-4 rounded-md border border-border">
        <UiHeader :nav="sampleNav" phone="+44 7747 251550" cta-href="#" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without phone</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The phone CTA is optional. Only the main CTA renders when omitted.
      </UiText>
      <div class="relative mt-4 rounded-md border border-border">
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
      <div class="relative mt-4 rounded-md border border-border">
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
