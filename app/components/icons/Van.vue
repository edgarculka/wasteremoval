<script setup lang="ts">
import { computed } from "vue";

type VanVariant = "quarter" | "half" | "three-quarters" | "full";

interface Props {
  variant?: VanVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "full",
});

const fractions: Record<VanVariant, number> = {
  quarter: 0.25,
  half: 0.5,
  "three-quarters": 0.75,
  full: 1,
};

const cargoBottom = 18;
const cargoHeight = 14;

const fillHeight = computed(() => cargoHeight * fractions[props.variant]);
const fillY = computed(() => cargoBottom - fillHeight.value);
</script>

<template>
  <svg
    width="1.33em"
    height="1em"
    viewBox="0 0 32 24"
    stroke="var(--color-foreground)"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 14 L5 8 H10 V18 H2 Z"
      fill="var(--color-primary)"
      stroke="none"
    />
    <rect x="10" y="4" width="19" height="14" fill="white" stroke="none" />
    <rect
      x="10"
      :y="fillY"
      width="19"
      :height="fillHeight"
      fill="var(--color-primary)"
      stroke="none"
    />
    <path d="M10 4 H29 V18 H2 V14 L5 8 H10 Z" />
    <line x1="10" y1="8" x2="10" y2="18" />
    <rect x="3.5" y="10" width="4" height="3.5" fill="white" />
    <circle
      cx="3.2"
      cy="16.4"
      r="0.7"
      fill="var(--color-foreground)"
      stroke="none"
    />
    <line x1="6.5" y1="15.5" x2="9" y2="15.5" stroke-width="1" />
    <line x1="25" y1="4" x2="25" y2="18" stroke-width="1" />
    <line x1="14" y1="14" x2="14" y2="18" stroke-width="1" />
    <line x1="20" y1="14" x2="20" y2="18" stroke-width="1" />
    <circle
      cx="7"
      cy="20.5"
      r="2.5"
      fill="var(--color-foreground)"
      stroke="none"
    />
    <circle
      cx="23"
      cy="20.5"
      r="2.5"
      fill="var(--color-foreground)"
      stroke="none"
    />
  </svg>
</template>
