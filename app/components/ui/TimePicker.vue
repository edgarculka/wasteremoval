<script setup lang="ts">
import type { Component } from "vue";

export interface TimePickerOption {
  id: string;
  label: string;
  description?: string;
  icon?: Component;
  iconLabel?: string;
}

interface Props {
  modelValue: string | null;
  options: TimePickerOption[];
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  ariaLabel: "Choose a time",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div
    v-if="options.length"
    class="grid gap-4 sm:grid-cols-3"
    role="group"
    :aria-label="ariaLabel"
  >
    <UiCard
      v-for="option in options"
      :key="option.id"
      selectable
      :selected="modelValue === option.id"
      :title="option.label"
      :description="option.description"
      :icon="option.icon"
      :icon-label="option.iconLabel"
      @select="emit('update:modelValue', option.id)"
    />
  </div>
  <div
    v-else
    class="rounded-2xl border-2 border-border bg-secondary p-5 text-secondary-foreground"
  >
    <UiText weight="semibold">No collection windows available.</UiText>
    <UiText size="sm" tone="low" class="mt-1">
      Please go back and choose another date.
    </UiText>
  </div>
</template>
