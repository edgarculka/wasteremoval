<script setup lang="ts">
const sampleNav = [
  { label: "Services", href: "#" },
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
        and an optional phone CTA + main CTA on the right. The default logo
        renders <code>/images/logo.svg</code> masked with the
        <code>primary</code> brand colour. Override via the
        <code>logo</code> slot for any custom markup.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiHeader :nav="sampleNav" phone="020 1234 5678" cta-href="#" />
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
          phone="020 1234 5678"
          cta-label="Book pickup"
          cta-href="#"
        />
      </div>
    </section>
  </div>
</template>
