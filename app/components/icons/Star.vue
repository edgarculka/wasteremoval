<script setup lang="ts">
import { useId } from "vue";

interface Props {
  variant?: "filled" | "outline" | "half";
}

withDefaults(defineProps<Props>(), {
  variant: "filled",
});

const maskId = `icons-star-half-${useId()}`;
const points =
  "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2";
</script>

<template>
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-foreground)"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="variant === 'filled'">
      <polygon :points="points" fill="var(--color-primary)" stroke="none" />
    </template>

    <template v-else-if="variant === 'outline'">
      <polygon :points="points" fill="white" stroke="none" />
    </template>

    <template v-else>
      <defs>
        <mask :id="maskId">
          <rect
            x="0"
            y="0"
            width="12"
            height="24"
            fill="white"
          />
        </mask>
      </defs>
      <polygon :points="points" fill="white" stroke="none" />
      <polygon
        :points="points"
        fill="var(--color-primary)"
        stroke="none"
        :mask="`url(#${maskId})`"
      />
    </template>

    <polygon :points="points" fill="none" />
  </svg>
</template>
