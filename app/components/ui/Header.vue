<script setup lang="ts">
export interface HeaderNavItem {
  label: string;
  href: string;
}

interface Props {
  nav?: HeaderNavItem[];
  phone?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const props = withDefaults(defineProps<Props>(), {
  nav: () => [],
  ctaLabel: "Get a quote",
});

const emit = defineEmits<{ cta: [] }>();

const phoneHref = computed(() =>
  props.phone ? `tel:${props.phone.replace(/\s+/g, "")}` : undefined,
);
</script>

<template>
  <header class="bg-background">
    <div
      class="mx-auto flex items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16"
    >
      <slot name="logo">
        <NuxtLink to="/" class="inline-flex" aria-label="Home">
          <UiLogo size="sm" />
        </NuxtLink>
      </slot>

      <nav
        v-if="nav.length"
        class="hidden items-center gap-6 md:flex"
        aria-label="Main"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.href"
          :to="item.href"
          class="text-sm font-bold hover:underline underline-offset-2"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <template v-if="phone">
          <div class="hidden sm:block">
            <UiButton :href="phoneHref" variant="secondary" size="sm">
              Call {{ phone }}
            </UiButton>
          </div>
          <div class="sm:hidden">
            <UiButton
              :href="phoneHref"
              variant="secondary"
              size="icon"
              :aria-label="`Call ${phone}`"
            >
              <IconsPhone />
            </UiButton>
          </div>
        </template>
        <UiButton v-if="ctaHref" :href="ctaHref" size="sm">
          {{ ctaLabel }}
        </UiButton>
        <UiButton v-else size="sm" @click="emit('cta')">
          {{ ctaLabel }}
        </UiButton>
      </div>
    </div>
  </header>
</template>
