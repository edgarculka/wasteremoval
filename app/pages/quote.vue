<script setup lang="ts">
const route = useRoute();
const { bookingLoads, bookingTimes, closeBookingWizard, submitBookingWizard } =
  useBookingWizard();

const initialLoadId = computed(() => {
  const load = route.query.load;

  if (typeof load !== "string") return null;

  return bookingLoads.some((item) => item.id === load) ? load : null;
});

function handleOpenChange(open: boolean) {
  if (!open) closeBookingWizard();
}

usePageSeo({
  title: "Get a Waste Removal Quote",
  description:
    "Get a fixed waste removal quote from DBS Waste. Choose your load size, collection date, arrival window and contact details.",
  path: "/quote",
});
</script>

<template>
  <UiBookingWizard
    :open="true"
    mode="page"
    brand-name="DBS Waste"
    :loads="bookingLoads"
    :times="bookingTimes"
    :initial-load-id="initialLoadId"
    @update:open="handleOpenChange"
    @submit="submitBookingWizard"
  />
</template>
