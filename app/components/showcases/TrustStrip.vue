<script setup lang="ts">
const items = [
  { value: "21K+", label: "Properties cleared" },
  { value: "4.9/5", label: "Customer rating" },
  { value: "Local", label: "London slots" },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Trust strip</UiHeading>
      <UiText tone="low" class="mt-3">
        Compact metric summary for hero sections and pricing pages. Use it near
        a primary CTA to make proof points scannable without adding another
        full section.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 max-w-4xl">
        <UiTrustStrip :items="items" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">In a hero section</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="sm" alignment="left">
          <UiHero
            heading="Waste removal, on your schedule."
            description="Clearance with clear pricing and responsible disposal routes."
          >
            <template #actions>
              <UiButton size="lg">Get a quote</UiButton>
            </template>
          </UiHero>
          <UiTrustStrip :items="items" class="mt-8 max-w-3xl" />
        </UiSection>
      </div>
    </section>
  </div>
</template>
