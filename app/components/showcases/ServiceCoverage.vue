<script setup lang="ts">
const service = seoServices[0]!;
const secondaryService = seoServices[1]!;
const location = seoLocations[0]!;
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Service coverage</UiHeading>
      <UiText tone="low" class="mt-3">
        Composed service-page section for clearable items, local service notes
        and supporting imagery. Use it inside <code>UiSection</code> so the
        surrounding page owns tone and spacing.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default service page use</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="secondary" spacing="md" wide>
          <UiServiceCoverage
            :heading="`What we remove in ${location.name}`"
            :description="service.shortDescription"
            :items="service.typicalItems"
            :notes="[
              ...location.serviceNotes,
              `Nearby areas covered: ${location.nearbyAreas.join(', ')}`,
            ]"
            :image="service.image"
            :meta-label="location.region"
            :meta-value="location.county"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without image</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" wide>
          <UiServiceCoverage
            heading="Items covered"
            description="Useful when another section already carries the primary service image."
            :items="secondaryService.typicalItems"
            :notes="secondaryService.sellingPoints"
          />
        </UiSection>
      </div>
    </section>
  </div>
</template>
