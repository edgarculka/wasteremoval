<script setup lang="ts">
interface Props {
  heading: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-2xl border-2 border-foreground bg-primary p-8 text-center text-primary-foreground shadow-[0.5rem_0.5rem_0_0_var(--foreground)] sm:p-8 lg:min-h-80 lg:p-16"
  >
    <UiHeading :level="1" size="xl" class="max-w-4xl">
      {{ heading }}
    </UiHeading>
    <UiText size="lg" tone="low" class="mt-8 max-w-3xl">
      {{ description }}
    </UiText>
    <UiButton class="mt-5 w-full md:w-auto" variant="secondary"
      >Request a call back</UiButton
    >
  </div>
</template>
