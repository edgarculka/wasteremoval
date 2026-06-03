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

const actionAlignmentClasses = computed(() => {
  switch (alignment.value) {
    case "center":
      return "sm:justify-center";
    case "right":
      return "sm:justify-end";
    default:
      return "sm:justify-start";
  }
});
</script>

<template>
  <div class="w-full">
    <div
      v-if="$slots.visual"
      class="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-10"
    >
      <div :class="['order-1 flex flex-col', alignmentClasses]">
        <UiHeading :level="1" size="xl">
          {{ heading }}
        </UiHeading>
        <UiText v-if="description" size="lg" tone="low" class="mt-6 max-w-xl">
          {{ description }}
        </UiText>
      </div>

      <div class="order-2 lg:row-span-2">
        <slot name="visual" />
      </div>

      <div
        v-if="$slots.actions"
        :class="[
          'order-3 flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:self-auto lg:col-start-1 lg:row-start-2',
          actionAlignmentClasses,
        ]"
      >
        <slot name="actions" />
      </div>
    </div>

    <div v-else class="mx-auto max-w-6xl">
      <div :class="['flex flex-col', alignmentClasses]">
        <UiHeading :level="1" size="xl">
          {{ heading }}
        </UiHeading>
        <UiText v-if="description" size="lg" tone="low" class="mt-6 max-w-xl">
          {{ description }}
        </UiText>
        <div
          v-if="$slots.actions"
          :class="[
            'mt-8 flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:self-auto',
            actionAlignmentClasses,
          ]"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>
