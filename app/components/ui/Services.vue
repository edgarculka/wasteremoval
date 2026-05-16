<script setup lang="ts">
export interface ServicesImage {
  src: string;
  alt: string;
}

export interface ServicesService {
  title: string;
  description: string;
  href: string;
  image: ServicesImage;
  meta?: string;
  highlights?: string[];
}

export interface ServicesLocation {
  label: string;
  href: string;
}

interface Props {
  eyebrow?: string;
  heading: string;
  description?: string;
  services: ServicesService[];
  locations?: ServicesLocation[];
  locationLabel?: string;
  ctaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  locationLabel: "Popular areas",
  ctaLabel: "View service",
});
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="max-w-3xl text-center">
      <UiTag v-if="eyebrow" variant="accent">{{ eyebrow }}</UiTag>
      <UiHeading :level="2" size="xl" :class="eyebrow ? 'mt-4' : ''">
        {{ heading }}
      </UiHeading>
      <UiText v-if="description" size="lg" tone="low" class="mt-4">
        {{ description }}
      </UiText>
    </div>

    <div class="mt-9 grid w-full gap-4 md:grid-cols-3">
      <UiCard
        v-for="service in services"
        :key="service.href"
        :href="service.href"
        class="h-full"
      >
        <article class="flex h-full flex-col">
          <div class="aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <img
              :src="service.image.src"
              :alt="service.image.alt"
              class="h-full w-full object-cover"
            />
          </div>

          <div class="mt-5 flex flex-1 flex-col">
            <UiText v-if="service.meta" size="xs" weight="bold" tone="primary">
              {{ service.meta }}
            </UiText>
            <UiHeading :level="3" size="sm" class="mt-2">
              {{ service.title }}
            </UiHeading>
            <UiText size="sm" tone="low" class="mt-2">
              {{ service.description }}
            </UiText>

            <ul
              v-if="service.highlights?.length"
              class="mt-4 flex flex-col gap-2"
            >
              <li
                v-for="highlight in service.highlights"
                :key="highlight"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-0.5 inline-flex text-base leading-none"
                  aria-hidden="true"
                >
                  <IconsTick />
                </span>
                <UiText as="span" size="sm" tone="low">
                  {{ highlight }}
                </UiText>
              </li>
            </ul>

            <UiText
              as="span"
              size="sm"
              weight="bold"
              class="mt-5 inline-flex items-center gap-1"
            >
              {{ ctaLabel }}
              <span aria-hidden="true">&gt;</span>
            </UiText>
          </div>
        </article>
      </UiCard>
    </div>

    <div
      v-if="locations?.length"
      class="mt-8 flex w-full flex-col items-center gap-3 text-center"
    >
      <UiText size="sm" weight="bold">{{ locationLabel }}</UiText>
      <div class="flex flex-wrap justify-center gap-2">
        <UiButton
          v-for="location in locations"
          :key="location.href"
          :href="location.href"
          variant="secondary"
          size="sm"
        >
          {{ location.label }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
