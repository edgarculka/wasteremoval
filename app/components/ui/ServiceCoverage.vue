<script setup lang="ts">
export interface ServiceCoverageImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  srcset?: string;
  sizes?: string;
}

interface Props {
  heading: string;
  description?: string;
  items: string[];
  notes?: string[];
  image?: ServiceCoverageImage;
  metaLabel?: string;
  metaValue?: string;
}

withDefaults(defineProps<Props>(), {
  notes: () => [],
});
</script>

<template>
  <div class="grid w-full items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
    <div class="flex flex-col gap-5">
      <div>
        <UiTag v-if="metaLabel" variant="accent">{{ metaLabel }}</UiTag>
        <UiHeading :level="2" size="lg" :class="metaLabel ? 'mt-4' : ''">
          {{ heading }}
        </UiHeading>
        <UiText v-if="description" size="lg" tone="low" class="mt-4 max-w-2xl">
          {{ description }}
        </UiText>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <UiCard
          v-for="item in items"
          :key="item"
          :title="item"
          size="sm"
        />
      </div>
    </div>

    <aside class="flex flex-col gap-4">
      <div
        v-if="image"
        class="overflow-hidden rounded-lg border border-border bg-background shadow-[0_1rem_3rem_rgba(6,53,31,0.12)]"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          :srcset="image.srcset"
          :sizes="image.sizes"
          loading="lazy"
          decoding="async"
          class="aspect-[4/3] h-full w-full object-cover"
        />
      </div>

      <UiCard v-if="metaValue" size="sm" tone="primary">
        <UiText size="sm" weight="bold">{{ metaLabel }}</UiText>
        <UiText class="mt-1">{{ metaValue }}</UiText>
      </UiCard>

      <div v-if="notes.length" class="grid gap-3">
        <UiCard
          v-for="note in notes"
          :key="note"
          :description="note"
          size="sm"
        />
      </div>
    </aside>
  </div>
</template>
