<script setup lang="ts">
const headerNav = [{ label: "Pricing", href: "/pricing" }];

const { openBookingWizard } = useBookingWizard();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <UiHeader :nav="headerNav" phone="020 1234 5678" @cta="openBookingWizard" />
    <slot />
  </div>
</template>
