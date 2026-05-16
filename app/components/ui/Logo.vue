<script setup lang="ts">
type LogoSize = "xs" | "sm" | "md" | "lg";
type LogoTone = "primary" | "foreground" | "background";
type LogoMark = "brand" | "design-system";

interface Props {
  size?: LogoSize;
  tone?: LogoTone;
  mark?: LogoMark;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  tone: "primary",
  mark: "brand",
});

const sizeClasses: Record<LogoSize, string> = {
  xs: "h-5",
  sm: "h-6",
  md: "h-8",
  lg: "h-10",
};

const toneClasses: Record<LogoTone, string> = {
  primary: "bg-foreground",
  foreground: "bg-foreground",
  background: "bg-background",
};

const marks: Record<LogoMark, { aspectRatio: string; maskImage: string }> = {
  brand: {
    aspectRatio: "2252 / 400",
    maskImage: 'url("/images/waste-logo.svg")',
  },
  "design-system": {
    aspectRatio: "4179 / 474",
    maskImage: 'url("/images/design-system-logo.svg")',
  },
};

const classes = computed(
  () => `logo-mark ${sizeClasses[props.size]} ${toneClasses[props.tone]}`,
);

const styles = computed(() => ({
  "--logo-aspect-ratio": marks[props.mark].aspectRatio,
  "--logo-mask-image": marks[props.mark].maskImage,
}));
</script>

<template>
  <span :class="classes" :style="styles" aria-hidden="true" />
</template>

<style scoped>
.logo-mark {
  display: inline-block;
  aspect-ratio: var(--logo-aspect-ratio);
  mask-image: var(--logo-mask-image);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: var(--logo-mask-image);
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}
</style>
