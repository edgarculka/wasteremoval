<script setup lang="ts">
interface Props {
  items: string[];
}

defineProps<Props>();
</script>

<template>
  <ul class="flex flex-col gap-3 p-0 list-none">
    <li v-for="item in items" :key="item" class="flex items-start gap-3">
      <IconsTick class="shrink-0 text-xl" />
      <UiText>{{ item }}</UiText>
    </li>
  </ul>
</template>
