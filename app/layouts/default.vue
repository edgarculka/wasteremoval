<script setup lang="ts">
const selectedLocation = useSelectedSeoLocation();
const route = useRoute();
const showHeader = computed(() => !route.path.startsWith("/quote"));

const headerNav = computed(() => [
  {
    label: "Services",
    href: "/services/",
    children: seoServices.map((service) => ({
      label: service.name,
      href: buildServiceLocationPath(service, selectedLocation.value),
      description: service.shortDescription,
      image: {
        src: service.image.src,
        alt: service.image.alt,
        width: service.image.width,
        height: service.image.height,
      },
    })),
  },
  { label: "Pricing", href: "/pricing/" },
  { label: "Extra charges", href: "/additional-charges/" },
]);

const { openBookingWizard } = useBookingWizard();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <UiHeader
      v-if="showHeader"
      :nav="headerNav"
      :phone="companyDetails.contact.primaryPhoneDisplay"
      @cta="openBookingWizard"
    />
    <slot />
  </div>
</template>
