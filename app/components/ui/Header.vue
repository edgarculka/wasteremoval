<script setup lang="ts">
export interface HeaderNavItem {
  label: string;
  href: string;
  children?: HeaderNavItem[];
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
        <div
          v-for="item in nav"
          :key="item.href"
          class="group relative"
        >
          <NuxtLink
            :to="item.href"
            class="inline-flex items-center gap-1 text-sm font-bold hover:underline underline-offset-2"
            :aria-haspopup="item.children?.length ? 'true' : undefined"
          >
            {{ item.label }}
            <IconsChevronDown
              v-if="item.children?.length"
              class="text-base"
            />
          </NuxtLink>

          <div
            v-if="item.children?.length"
            class="invisible absolute left-0 top-full z-20 min-w-64 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
          >
            <div
              class="rounded-lg border-2 border-foreground bg-background p-2 shadow-[0.35rem_0.35rem_0_0_var(--foreground)]"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.href"
                :to="child.href"
                class="block rounded-md px-3 py-2 text-sm font-bold hover:bg-secondary"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
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
