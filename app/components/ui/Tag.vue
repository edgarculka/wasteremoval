<script setup lang="ts">
type TagVariant = "primary" | "secondary" | "accent";

interface Props {
  variant?: TagVariant;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const variantClasses: Record<TagVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};
</script>

<template>
  <span
    :class="`inline-flex items-center rounded-full border border-current/15 px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[0_0.35rem_1rem_rgb(var(--shadow-color)/0.08)] ${variantClasses[variant]}`"
  >
    <slot />
  </span>
</template>
