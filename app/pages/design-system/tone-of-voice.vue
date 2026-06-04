<script setup lang="ts">
definePageMeta({
  layout: "design-system",
});

useSeoMeta({
  title: "Tone of voice - Design System",
  robots: "noindex, nofollow",
});

const voicePrinciples = [
  {
    title: "Clear",
    description:
      "Say exactly what the customer needs to know. Avoid vague promises, filler, and clever wording that slows people down.",
  },
  {
    title: "Short",
    description:
      "Use compact sentences. Most service copy should help someone book, understand a price, or feel reassured quickly.",
  },
  {
    title: "Straight to the point",
    description:
      "Lead with the practical answer: what is collected, when it can happen, what it costs, and what the customer needs to do next.",
  },
  {
    title: "Friendly and local",
    description:
      "Sound like a helpful London team. Warm is good. Overfamiliar, jokey, or salesy is not.",
  },
  {
    title: "Responsible",
    description:
      "Waste removal copy should feel competent and compliant. Be honest about recycling, disposal, access, and extra charges.",
  },
];

const phrasePairs = [
  {
    context: "Primary CTA",
    use: "Get a quote",
    avoid: "Unlock your waste-free journey",
  },
  {
    context: "Same-day service",
    use: "Same-day collection may be available in your area.",
    avoid: "We guarantee instant rubbish removal everywhere in London.",
  },
  {
    context: "Pricing",
    use: "Prices depend on the amount of waste, access, and disposal costs.",
    avoid: "Cheap rubbish clearance from unbeatable waste experts.",
  },
  {
    context: "Access instructions",
    use: "Tell us about stairs, parking, or narrow access before we arrive.",
    avoid: "Please provide comprehensive logistical context for collection.",
  },
  {
    context: "Recycling",
    use: "We sort recyclable materials where possible.",
    avoid: "Everything we collect is recycled.",
  },
];

const examples = [
  {
    title: "Hero copy",
    copy: "Waste collection in London, without the runaround. Tell us what needs clearing and we will give you a clear quote.",
  },
  {
    title: "Service card",
    copy: "Sofa, mattress, and bulky item collection from homes, flats, and offices.",
  },
  {
    title: "Form helper",
    copy: "A photo helps us quote faster, especially for mixed waste or bulky items.",
  },
  {
    title: "Error message",
    copy: "Add your postcode so we can check collection options near you.",
  },
];
</script>

<template>
  <div class="max-w-4xl space-y-12">
    <header>
      <UiHeading size="lg">Tone of Voice</UiHeading>
      <UiText tone="low" class="mt-3 max-w-3xl">
        DBS Waste should sound clear, short, direct, friendly, local to London,
        and trustworthy. The copy should help people understand the service and
        book with confidence.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Principles</UiHeading>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <UiCard
          v-for="principle in voicePrinciples"
          :key="principle.title"
          :title="principle.title"
          :description="principle.description"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">How Copy Should Sound</UiHeading>
      <div class="mt-5 overflow-hidden rounded-lg border border-border bg-secondary">
        <div
          v-for="pair in phrasePairs"
          :key="pair.context"
          class="grid gap-4 border-b border-border p-5 last:border-b-0 md:grid-cols-[10rem_1fr_1fr]"
        >
          <UiText weight="bold">{{ pair.context }}</UiText>
          <div>
            <UiText size="xs" weight="bold" tone="primary">Use</UiText>
            <UiText class="mt-1">{{ pair.use }}</UiText>
          </div>
          <div>
            <UiText size="xs" weight="bold" tone="low">Avoid</UiText>
            <UiText tone="low" class="mt-1">{{ pair.avoid }}</UiText>
          </div>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Writing Patterns</UiHeading>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <UiCard v-for="example in examples" :key="example.title">
          <UiText weight="bold">{{ example.title }}</UiText>
          <UiText tone="low" class="mt-2">{{ example.copy }}</UiText>
        </UiCard>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Checklist</UiHeading>
      <div class="mt-5 space-y-3">
        <UiText>
          Start with the useful fact: price, time, service area, access, or next
          step.
        </UiText>
        <UiText>
          Use normal customer language: rubbish, waste, collection, clearance,
          quote, booking.
        </UiText>
        <UiText>
          Keep London references practical: boroughs, postcodes, parking,
          flats, stairs, congestion, and busy streets.
        </UiText>
        <UiText>
          Do not overclaim on recycling, availability, speed, or final price.
        </UiText>
        <UiText>
          Prefer one clear sentence over a slogan.
        </UiText>
      </div>
    </section>
  </div>
</template>
