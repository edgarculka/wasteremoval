<script setup lang="ts">
const sampleItems = [
  "Clear pricing before loading",
  "No skip permit needed",
  "Team loads the items",
  "West, Central, North and South London coverage",
  "Photos accepted for estimates",
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Marquee</UiHeading>
      <UiText tone="low" class="mt-3">
        Section-width strip that loops a list of items horizontally.
        Useful for stats, quotes, or promotional snippets. Items pass via the
        <code>items</code> array; duplicate is rendered automatically so the
        loop appears seamless.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiMarquee :items="sampleItems" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Same brand surfaces as Section: <code>background</code>,
        <code>secondary</code>, <code>dark</code>, <code>primary</code>.
      </UiText>
      <div class="mt-4 space-y-4">
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee tone="primary" :items="sampleItems" />
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee tone="secondary" :items="sampleItems" />
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee tone="dark" :items="sampleItems" />
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Speeds</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Three options: <code>slow</code> (60s loop),
        <code>medium</code> (30s, default), <code>fast</code> (15s).
      </UiText>
      <div class="mt-4 space-y-4">
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee speed="slow" :items="sampleItems" />
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee speed="medium" :items="sampleItems" />
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiMarquee speed="fast" :items="sampleItems" />
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Quote / promo style</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The same component works for testimonial pull-quotes or promotional
        copy.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiMarquee
          tone="primary"
          :items="[
            'Send photos for a faster estimate',
            'No skip permit needed',
            'Licensed waste carrier',
            'Same-day and next-day slots where possible',
          ]"
        />
      </div>
    </section>
  </div>
</template>
