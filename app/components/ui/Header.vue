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
const isMenuOpen = ref(false);

const phoneHref = computed(() =>
  props.phone ? `tel:${props.phone.replace(/\s+/g, "")}` : undefined,
);

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
    >
      <slot name="logo">
        <NuxtLink to="/" class="inline-flex" aria-label="Home">
          <UiLogo size="sm" />
        </NuxtLink>
      </slot>

      <nav
        v-if="nav.length"
        class="hidden items-center gap-2 md:flex"
        aria-label="Main"
      >
        <div
          v-for="item in nav"
          :key="item.href"
          class="group relative"
        >
          <NuxtLink
            :to="item.href"
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold hover:bg-secondary"
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
              class="rounded-lg border border-border bg-secondary p-2 shadow-[0_1rem_3rem_rgba(6,53,31,0.16)]"
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
        <button
          v-if="nav.length"
          type="button"
          class="inline-flex h-10 items-center justify-center rounded-full border border-border bg-secondary px-4 text-sm font-bold md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ isMenuOpen ? "Close" : "Menu" }}
        </button>
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
    <div
      v-if="nav.length"
      id="mobile-navigation"
      :class="[
        'border-t border-border bg-background px-4 py-4 md:hidden',
        isMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <nav class="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile">
        <div v-for="item in nav" :key="item.href" class="grid gap-2">
          <NuxtLink
            :to="item.href"
            class="rounded-lg bg-secondary px-4 py-3 text-sm font-bold"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
          <div v-if="item.children?.length" class="grid gap-2 ps-3">
            <NuxtLink
              v-for="child in item.children"
              :key="child.href"
              :to="child.href"
              class="rounded-lg px-4 py-2 text-sm font-bold text-current/75 hover:bg-secondary"
              @click="closeMenu"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
