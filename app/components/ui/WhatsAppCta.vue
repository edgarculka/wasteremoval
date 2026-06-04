<script setup lang="ts">
interface Props {
  href: string;
  label?: string;
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  label: "WhatsApp us",
  ariaLabel: "Chat with DBS Waste on WhatsApp",
});
</script>

<template>
  <div class="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
    <UiButton
      :href="href"
      target="_blank"
      size="lg"
      :aria-label="ariaLabel"
      class="shadow-[0_0.5rem_1.5rem_rgb(var(--shadow-color)/0.18)]"
    >
      <template #iconLeft>
        <IconsWhatsApp class="text-xl" />
      </template>
      <span>{{ label }}</span>
    </UiButton>
  </div>
</template>
