<script setup lang="ts">
export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

defineProps<Props>();
</script>

<template>
  <ul class="mx-auto w-full max-w-3xl space-y-3 text-left">
    <li v-for="item in items" :key="item.question">
      <details
        class="group rounded-2xl border-2 border-foreground bg-secondary text-secondary-foreground"
      >
        <summary
          class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 [&::-webkit-details-marker]:hidden"
        >
          <UiText as="span" weight="bold" size="md">
            {{ item.question }}
          </UiText>
          <IconsChevronDown
            class="shrink-0 text-xl transition-transform group-open:rotate-180"
          />
        </summary>
        <div class="px-6 pb-5">
          <UiText tone="low">{{ item.answer }}</UiText>
        </div>
      </details>
    </li>
  </ul>
</template>
