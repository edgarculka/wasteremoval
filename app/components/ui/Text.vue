<script setup lang="ts">
type TextSize = "xs" | "sm" | "md" | "lg";
type TextWeight = "regular" | "medium" | "semibold" | "bold";
type TextTone = "high" | "low" | "primary";
type TextAs = "p" | "span" | "div" | "dt" | "dd";

interface Props {
  as?: TextAs;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  size: "md",
  weight: "regular",
  tone: "high",
});

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg leading-8",
};

const weightClasses: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const toneClasses: Record<TextTone, string> = {
  high: "",
  low: "text-current/70",
  primary: "text-accent",
};

const classes = computed(() =>
  [
    sizeClasses[props.size],
    weightClasses[props.weight],
    toneClasses[props.tone],
  ]
    .filter(Boolean)
    .join(" "),
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
