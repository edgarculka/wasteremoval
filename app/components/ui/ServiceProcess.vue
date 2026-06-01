<script setup lang="ts">
export interface ServiceProcessStep {
  title: string;
  description: string;
}

interface Props {
  eyebrow?: string;
  heading: string;
  description?: string;
  steps: ServiceProcessStep[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex w-full flex-col items-center text-center">
    <div class="max-w-3xl">
      <UiTag v-if="eyebrow" variant="accent">{{ eyebrow }}</UiTag>
      <UiHeading :level="2" size="lg" :class="eyebrow ? 'mt-4' : ''">
        {{ heading }}
      </UiHeading>
      <UiText v-if="description" size="lg" tone="low" class="mt-4">
        {{ description }}
      </UiText>
    </div>

    <ol class="mt-9 grid w-full gap-4 md:grid-cols-4">
      <li v-for="(step, index) in steps" :key="step.title" class="h-full">
        <UiCard class="h-full">
          <article class="flex h-full flex-col items-start text-left">
            <UiTag variant="accent">Step {{ index + 1 }}</UiTag>
            <UiHeading :level="3" size="sm" class="mt-4">
              {{ step.title }}
            </UiHeading>
            <UiText size="sm" tone="low" class="mt-2">
              {{ step.description }}
            </UiText>
          </article>
        </UiCard>
      </li>
    </ol>
  </div>
</template>
