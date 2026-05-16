<script setup lang="ts">
import type { FaqItem } from "~/components/ui/Faq.vue";

const items: FaqItem[] = [
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
      "By load size, not by the hour. The pricing tiers cover everything we do — labour, transport, and licensed disposal included. The price you see is the price you pay.",
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">FAQ</UiHeading>
      <UiText tone="low" class="mt-3">
        Accordion list of questions and answers built on native
        <code>&lt;details&gt;</code> /
        <code>&lt;summary&gt;</code> for keyboard navigation and
        screen-reader state out of the box. <code>UiFaq</code> is content —
        wrap it in a <code>UiSection</code> so the section owns tone,
        spacing, alignment, and the heading.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection
          tone="background"
          spacing="md"
          alignment="center"
          title="Frequently asked questions"
        >
          <UiFaq :items="items" />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Inside a dark section</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Cards keep their <code>secondary</code> surface so they always
        contrast with the section's tone — readable on yellow, white, dark,
        or primary backgrounds.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection
          tone="dark"
          spacing="md"
          alignment="center"
          title="Frequently asked questions"
        >
          <UiFaq :items="items.slice(0, 3)" />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Single item</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Click a question to expand its answer. Multiple items can be open
        at the same time.
      </UiText>
      <div class="mt-4">
        <UiFaq :items="items.slice(0, 1)" />
      </div>
    </section>
  </div>
</template>
