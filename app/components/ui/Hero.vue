<script setup lang="ts">
import { ref } from "vue";
import {
  SECTION_ALIGNMENT_KEY,
  type SectionAlignment,
} from "~/utils/section";

interface Props {
  heading: string;
  description?: string;
}

defineProps<Props>();

const alignment = inject(SECTION_ALIGNMENT_KEY, ref<SectionAlignment>("left"));

const alignmentClasses = computed(() => {
  switch (alignment.value) {
    case "center":
      return "items-center text-center";
    case "right":
      return "items-end text-left";
    default:
      return "items-start text-left";
  }
});
</script>

<template>
  <div class="w-full">
    <div
      :class="[
        'mx-auto max-w-6xl',
        $slots.visual ? 'grid items-center gap-10 lg:grid-cols-2' : '',
      ]"
    >
      <div :class="['flex flex-col', alignmentClasses]">
        <UiHeading :level="1" size="xl">
          {{ heading }}
        </UiHeading>
        <UiText v-if="description" size="lg" tone="low" class="mt-6 max-w-xl">
          {{ description }}
        </UiText>
        <div
          v-if="$slots.actions"
          class="mt-8 flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:self-auto"
        >
          <slot name="actions" />
        </div>
      </div>
      <div v-if="$slots.visual">
        <slot name="visual" />
      </div>
    </div>
  </div>
</template>
