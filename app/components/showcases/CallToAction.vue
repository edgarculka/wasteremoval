<script setup lang="ts">
const points = [
  "Same-day slots where possible",
  "Fully licensed waste carriers",
  "No skip permit needed",
  "Clear price before loading",
];

const workerImage = "/images/waste-removal-service-worker.webp";
const workerAlt = "Waste removal worker holding a black bin bag";
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Call to action</UiHeading>
      <UiText tone="low" class="mt-3">
        The last-chance card before the footer. A two-column layout with the
        rating, headline, and tick list on the left, and the image with CTA
        buttons on the right. The card always uses the dark
        <code>surface-dark</code> tone to pop against any neighbouring section.
        <code>UiCallToAction</code> is content — wrap it in a
        <code>UiSection</code>; the Section owns spacing, alignment, and any
        ribbon.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default — wrapped in a section</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The card has its own dark surface, border, and offset shadow. Use
        <code>primary</code> and <code>secondary</code> button variants inside —
        <code>ghost</code> renders dark-green text and won't be readable on the
        dark card.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="left">
          <UiCallToAction
            heading="Book your clearance with clear pricing."
            :points="points"
            :rating-value="5"
            rating-label="500+ five-star reviews"
            :image-src="workerImage"
            :image-alt="workerAlt"
          >
            <template #cta>
              <UiButton size="lg">Get a quote</UiButton>
              <UiButton variant="secondary" size="lg">
                Call +44 7747 251550
              </UiButton>
            </template>
          </UiCallToAction>
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without rating</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="left">
          <UiCallToAction
            heading="Ready when you are."
            :points="points"
            :image-src="workerImage"
            :image-alt="workerAlt"
          >
            <template #cta>
              <UiButton size="lg">Get a quote</UiButton>
            </template>
          </UiCallToAction>
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without image</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The image column is optional — without it, the right column collapses
        to just the CTA buttons.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="left">
          <UiCallToAction
            heading="Book your clearance with clear pricing."
            :points="points"
            :rating-value="5"
            rating-label="500+ five-star reviews"
          >
            <template #cta>
              <UiButton size="lg">Get a quote</UiButton>
              <UiButton variant="secondary" size="lg">Talk to us</UiButton>
            </template>
          </UiCallToAction>
        </UiSection>
      </div>
    </section>
  </div>
</template>
