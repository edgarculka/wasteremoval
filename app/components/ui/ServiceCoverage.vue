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
        <article
          v-for="(note, index) in notes"
          :key="note"
          class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-background p-4 text-foreground shadow-[0_0.75rem_2rem_rgba(6,53,31,0.08)]"
        >
          <span
            class="grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          >
            {{ index + 1 }}
          </span>
          <span class="min-w-0">
            <UiText as="span" size="sm" weight="bold" class="block">
              {{ note.split(": ")[0] }}
            </UiText>
            <UiText as="span" size="sm" tone="low" class="mt-1 block">
              {{ note.split(": ").slice(1).join(": ") || note }}
            </UiText>
          </span>
        </article>
      </div>
    </aside>
  </div>
</template>
