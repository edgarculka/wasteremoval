<script setup lang="ts">
interface Props {
  heading: string;
  points: string[];
  ratingValue?: number;
  ratingLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
}

withDefaults(defineProps<Props>(), {
  points: () => [],
});
</script>

<template>
  <div
    class="relative w-full rounded-lg border border-border bg-primary p-8 shadow-[0_1rem_3rem_rgba(6,53,31,0.14)] sm:p-10 lg:p-12"
  >
    <div class="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div class="flex flex-col">
        <UiHeading :level="2" size="lg">
          {{ heading }}
        </UiHeading>
        <UiTickList v-if="points.length" :items="points" class="mt-6" />
      </div>

      <div class="flex flex-col items-center gap-0">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt ?? ''"
          class="block h-auto w-full max-w-[20rem] object-contain"
        />
        <div
          v-if="$slots.cta"
          class="flex flex-col items-stretch gap-4 self-stretch"
        >
          <slot name="cta" />
        </div>
      </div>
    </div>
  </div>
</template>
