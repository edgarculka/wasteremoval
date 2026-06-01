<script setup lang="ts">
export interface TrustStripItem {
  value: string;
  label: string;
}

interface Props {
  items: TrustStripItem[];
}

defineProps<Props>();
</script>

<template>
  <dl
    class="grid w-full gap-3 rounded-lg border border-border bg-secondary p-3 shadow-[0_1rem_3rem_rgba(6,53,31,0.08)] sm:grid-cols-3"
  >
    <div
      v-for="item in items"
      :key="`${item.value}-${item.label}`"
      class="rounded-md bg-background px-4 py-3 text-center sm:text-left"
    >
      <UiText as="dt" size="xs" weight="bold" tone="low" class="uppercase">
        {{ item.label }}
      </UiText>
      <dd class="mt-1 text-lg font-bold leading-tight">
        {{ item.value }}
      </dd>
    </div>
  </dl>
</template>
