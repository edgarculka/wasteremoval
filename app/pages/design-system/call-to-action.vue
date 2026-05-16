<script setup lang="ts">
definePageMeta({
  layout: "design-system",
});

useSeoMeta({
  title: "Call to action — Design System",
  robots: "noindex, nofollow",
});
</script>

<template>
  <div class="relative">
    <div class="absolute right-0 top-0">
      <DsFullscreenToggle
        mode="expand"
        href="/design-system/fullscreen/call-to-action"
      />
    </div>
    <ShowcasesCallToAction />
  </div>
</template>
