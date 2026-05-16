<script setup lang="ts">
type StarVariant = "filled" | "outline" | "half";
type RatingSize = "sm" | "md" | "lg";
type RatingLabelSize = "xs" | "sm" | "md" | "lg";

interface Props {
  value: number;
  max?: number;
  size?: RatingSize;
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: "md",
});

const sizeClasses: Record<RatingSize, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-2xl",
};

const labelSizeClasses: Record<RatingSize, RatingLabelSize> = {
  sm: "xs",
  md: "xs",
  lg: "lg",
};

const stars = computed<StarVariant[]>(() =>
  Array.from({ length: props.max }, (_, i) => {
    const remainder = props.value - i;
    if (remainder >= 1) return "filled";
    if (remainder >= 0.5) return "half";
    return "outline";
  }),
);
</script>

<template>
  <div
    class="inline-flex items-center gap-2"
    role="img"
    :aria-label="`Rating: ${value} out of ${max}`"
  >
    <div :class="['flex gap-0.5 text-primary', sizeClasses[size]]">
      <IconsStar v-for="(variant, i) in stars" :key="i" :variant="variant" />
    </div>
    <UiText
      v-if="$slots.default"
      weight="medium"
      tone="low"
      :size="labelSizeClasses[size]"
    >
      <slot />
    </UiText>
  </div>
</template>
