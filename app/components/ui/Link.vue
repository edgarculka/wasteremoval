<script setup lang="ts">
type LinkTreatment = "default" | "subtle" | "muted";

interface Props {
  href: string;
  treatment?: LinkTreatment;
}

const props = withDefaults(defineProps<Props>(), {
  treatment: "default",
});

const treatmentClasses: Record<LinkTreatment, string> = {
  default:
    "text-foreground underline underline-offset-2 hover:no-underline",
  subtle:
    "text-inherit hover:underline underline-offset-2",
  muted:
    "text-foreground/70 hover:text-foreground hover:underline underline-offset-2",
};

const classes = computed(() => treatmentClasses[props.treatment]);
</script>

<template>
  <NuxtLink :to="href" :class="classes">
    <slot />
  </NuxtLink>
</template>
