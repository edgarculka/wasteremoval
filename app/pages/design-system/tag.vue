<script setup lang="ts">
definePageMeta({
  layout: "design-system",
});

useSeoMeta({
  title: "Tag — Design System",
  robots: "noindex, nofollow",
});
</script>

<template>
  <div class="relative">
    <div class="absolute right-0 top-0">
      <DsFullscreenToggle mode="expand" href="/design-system/fullscreen/tag" />
    </div>
    <ShowcasesTag />
  </div>
</template>
