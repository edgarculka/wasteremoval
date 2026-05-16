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
    :class="`inline-flex items-center rounded-full border-2 border-foreground px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${variantClasses[variant]}`"
  >
    <slot />
  </span>
</template>
