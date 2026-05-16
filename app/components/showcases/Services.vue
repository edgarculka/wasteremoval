<script setup lang="ts">
import type {
  ServicesLocation,
  ServicesService,
} from "~/components/ui/Services.vue";
import {
  buildServiceLocationPath,
  seoLocations,
  seoServices,
} from "~/utils/seo-pages";

const primaryLocation = seoLocations[0];
const primaryService = seoServices[0];

const services: ServicesService[] = seoServices.map((service) => ({
  title: service.name,
  description: service.shortDescription,
  href: primaryLocation
    ? buildServiceLocationPath(service, primaryLocation)
    : `/${service.slug}/`,
  image: service.image,
  meta: service.searchTerms[0],
  highlights: service.sellingPoints.slice(0, 2),
}));

const locations: ServicesLocation[] = seoLocations.map((location) => ({
  label: location.name,
  href: primaryService
    ? buildServiceLocationPath(primaryService, location)
    : `/${location.slug}/`,
}));
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Services</UiHeading>
      <UiText tone="low" class="mt-3">
        Content component for listing SEO-backed waste removal services and
        service-area entry points. <code>UiServices</code> accepts plain
        service and location props; pages map their own data into it. Always
        wrap it in <code>UiSection</code> so Section owns tone, spacing,
        alignment, and max-width.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default - wrapped in a section</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The default composition uses service cards from the SEO config plus
        location links derived from the same source.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiServices
            eyebrow="Services"
            heading="Clearance services for homes, gardens and rental properties"
            description="Choose the job type that best matches what needs clearing, then pair it with your local area page."
            :services="services"
            :locations="locations"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Secondary tone</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The component keeps its cards on semantic surfaces while Section
        controls the surrounding tone.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="secondary" spacing="md" alignment="center" wide>
          <UiServices
            heading="Popular rubbish removal services"
            description="Reusable cards for the core SEO service set."
            :services="services"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Compact data set</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Consumers can pass fewer services for a tighter page-specific section.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiServices
            heading="Rental and household clearances"
            :services="services.slice(0, 2)"
            :locations="locations.slice(0, 2)"
            location-label="Available in"
            cta-label="See local page"
          />
        </UiSection>
      </div>
    </section>
  </div>
</template>
