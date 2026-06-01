<script setup lang="ts">
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl";
type HeadingTone = "high" | "low";

interface Props {
  level?: HeadingLevel;
  size?: HeadingSize;
  tone?: HeadingTone;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  tone: "high",
});

const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-base",
  sm: "text-lg",
  md: "text-2xl leading-tight",
  lg: "text-3xl leading-tight sm:text-4xl",
  xl: "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
};

const toneClasses: Record<HeadingTone, string> = {
  high: "",
  low: "text-current/60",
};

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "xl",
  2: "md",
  3: "sm",
  4: "xs",
  5: "xs",
  6: "xs",
};

const tag = computed(() => `h${props.level}`);
const resolvedSize = computed(
  () => props.size ?? defaultSizeForLevel[props.level],
);
const classes = computed(() =>
  [
    "font-bold tracking-tight",
    sizeClasses[resolvedSize.value],
    toneClasses[props.tone],
  ]
    .filter(Boolean)
    .join(" "),
);
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
