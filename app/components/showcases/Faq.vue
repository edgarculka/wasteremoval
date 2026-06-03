<script setup lang="ts">
const items = homeFaqs;
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
          <UiFaq :items="items" />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Standalone list</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Click a question to expand its answer. Multiple items can be open
        at the same time.
      </UiText>
      <div class="mt-4">
        <UiFaq :items="items" />
      </div>
    </section>
  </div>
</template>
