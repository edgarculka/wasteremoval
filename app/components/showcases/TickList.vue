<script setup lang="ts">
const sellingPoints = [
  "Same-day and next-day availability where possible",
  "Furniture, appliances and bagged waste removed",
  "Suitable for tenants, landlords and letting agents",
  "Fully licensed waste carriers — recycled where possible",
];

const shortItems = ["Quick", "Reliable", "Licensed"];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Tick list</UiHeading>
      <UiText tone="low" class="mt-3">
        Bulleted list with a green-circle <code>IconsTick</code> in place of a
        bullet. Use it for selling points, included items, or any
        positive-affirmation list. Pass strings via <code>items</code>.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 max-w-xl">
        <UiTickList :items="sellingPoints" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Short labels</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Items wrap their labels in <code>UiText</code>, so any line length
        works. The icon stays top-aligned with the first line.
      </UiText>
      <div class="mt-4 max-w-xl">
        <UiTickList :items="shortItems" />
      </div>
    </section>
  </div>
</template>
