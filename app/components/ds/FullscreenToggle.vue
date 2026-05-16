<script setup lang="ts">
interface Props {
  mode: "expand" | "minimize";
  href: string;
}

const props = defineProps<Props>();

const label = computed(() =>
  props.mode === "expand" ? "Expand to fullscreen" : "Exit fullscreen",
);
</script>

<template>
  <UiButton
    :href="href"
    variant="ghost"
    size="icon"
    :aria-label="label"
    :title="label"
  >
    <IconsExpand v-if="mode === 'expand'" />
    <IconsMinimize v-else />
  </UiButton>
</template>
