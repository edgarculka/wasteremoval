<script setup lang="ts">
export interface HeaderNavImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeaderNavItem {
  label: string;
  href: string;
  description?: string;
  image?: HeaderNavImage;
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
const expandedMobileItems = ref<Record<string, boolean>>({});

const phoneHref = computed(() =>
  props.phone ? `tel:${props.phone.replace(/\s+/g, "")}` : undefined,
);

function closeMenu() {
  isMenuOpen.value = false;
  expandedMobileItems.value = {};
}

function toggleMobileChildren(href: string) {
  expandedMobileItems.value = {
    ...expandedMobileItems.value,
    [href]: !expandedMobileItems.value[href],
  };
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-secondary/95 shadow-[0_0.75rem_2rem_rgba(6,53,31,0.08)] backdrop-blur-xl"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
    >
      <slot name="logo">
        <NuxtLink to="/" class="inline-flex shrink-0" aria-label="Home">
          <span class="hidden sm:inline-flex">
            <UiLogo size="sm" />
          </span>
          <span class="inline-flex sm:hidden">
            <UiLogo mark="brand-icon" size="sm" />
          </span>
        </NuxtLink>
      </slot>

      <nav
        v-if="nav.length"
        class="hidden items-center gap-1 md:flex"
        aria-label="Main"
      >
        <div v-for="item in nav" :key="item.href" class="group relative">
          <NuxtLink
            :to="item.href"
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-background hover:shadow-[0_0.5rem_1.5rem_rgba(6,53,31,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-haspopup="item.children?.length ? 'true' : undefined"
          >
            {{ item.label }}
            <IconsChevronDown v-if="item.children?.length" class="text-base" />
          </NuxtLink>

          <div
            v-if="item.children?.length"
            class="invisible fixed inset-x-4 top-12 z-20 mx-auto max-w-4xl pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
          >
            <div
              class="rounded-2xl border border-border bg-secondary p-3 shadow-[0_1.25rem_3.5rem_rgba(6,53,31,0.18)]"
            >
              <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.href"
                  :to="child.href"
                  class="group/card overflow-hidden rounded-xl border border-border bg-background text-secondary-foreground transition hover:-translate-y-1 hover:bg-primary/20 hover:shadow-[0_0.75rem_2rem_rgba(6,53,31,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <img
                    v-if="child.image"
                    :src="child.image.src"
                    :alt="child.image.alt"
                    :width="child.image.width"
                    :height="child.image.height"
                    class="aspect-[4/3] w-full object-cover transition group-hover/card:scale-105"
                    data-no-lightbox
                  />
                  <span class="block p-3">
                    <span class="block text-sm font-bold leading-tight">
                      {{ child.label }}
                    </span>
                    <span
                      v-if="child.description"
                      class="mt-1 block text-xs font-medium leading-snug text-current/65"
                    >
                      {{ child.description }}
                    </span>
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex min-w-0 items-center gap-2 sm:gap-3">
        <template v-if="phone">
          <div class="hidden lg:block">
            <UiButton :href="phoneHref" variant="secondary" size="sm">
              Call {{ phone }}
            </UiButton>
          </div>
          <div class="hidden sm:block lg:hidden">
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
          <span class="hidden sm:inline">{{ ctaLabel }}</span>
          <span class="sm:hidden">Quote</span>
        </UiButton>
        <UiButton v-else size="sm" @click="emit('cta')">
          <span class="hidden sm:inline">{{ ctaLabel }}</span>
          <span class="sm:hidden">Quote</span>
        </UiButton>
        <button
          v-if="nav.length"
          type="button"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_0.35rem_1rem_rgba(6,53,31,0.08)] transition hover:-translate-y-0.5 hover:bg-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          aria-controls="mobile-navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="grid gap-1" aria-hidden="true">
            <span
              :class="[
                'block h-0.5 w-5 rounded-full bg-current transition',
                isMenuOpen ? 'translate-y-1.5 rotate-45' : '',
              ]"
            />
            <span
              :class="[
                'block h-0.5 w-5 rounded-full bg-current transition',
                isMenuOpen ? 'opacity-0' : '',
              ]"
            />
            <span
              :class="[
                'block h-0.5 w-5 rounded-full bg-current transition',
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : '',
              ]"
            />
          </span>
        </button>
      </div>
    </div>
    <div
      v-if="nav.length"
      id="mobile-navigation"
      :class="[
        'fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-secondary px-4 pb-4 pt-2 shadow-[inset_0_1px_0_var(--border),0_1rem_2rem_rgba(6,53,31,0.12)] md:hidden',
        isMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <nav class="mx-auto flex max-w-7xl flex-col gap-3" aria-label="Mobile">
        <div v-for="item in nav" :key="item.href" class="grid gap-2">
          <div
            v-if="item.children?.length"
            class="grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-xl border border-border bg-background shadow-[0_0.35rem_1rem_rgba(6,53,31,0.06)]"
          >
            <NuxtLink
              :to="item.href"
              class="min-w-0 px-4 py-3 text-sm font-bold transition hover:bg-primary/20"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
            <button
              type="button"
              class="grid h-full w-12 place-items-center border-l border-border text-lg transition hover:bg-primary/20"
              :aria-expanded="Boolean(expandedMobileItems[item.href])"
              :aria-label="`${expandedMobileItems[item.href] ? 'Hide' : 'Show'} ${item.label} links`"
              @click="toggleMobileChildren(item.href)"
            >
              <IconsChevronDown
                :class="[
                  'transition',
                  expandedMobileItems[item.href] ? 'rotate-180' : '',
                ]"
              />
            </button>
          </div>
          <NuxtLink
            v-else
            :to="item.href"
            class="rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold shadow-[0_0.35rem_1rem_rgba(6,53,31,0.06)] transition hover:bg-primary/20"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
          <div
            v-if="item.children?.length && expandedMobileItems[item.href]"
            class="grid max-h-[60dvh] gap-2 overflow-y-auto rounded-xl border border-border bg-secondary p-2"
          >
            <NuxtLink
              v-for="child in item.children"
              :key="child.href"
              :to="child.href"
              class="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border bg-background p-2 text-secondary-foreground shadow-[0_0.35rem_1rem_rgba(6,53,31,0.06)] transition hover:bg-primary/20"
              @click="closeMenu"
            >
              <img
                v-if="child.image"
                :src="child.image.src"
                :alt="child.image.alt"
                :width="child.image.width"
                :height="child.image.height"
                class="aspect-square w-full rounded-lg object-cover"
                data-no-lightbox
              />
              <span
                v-else
                class="aspect-square w-full rounded-lg bg-primary/30"
                aria-hidden="true"
              />
              <span>
                <span class="block text-sm font-bold leading-tight">
                  {{ child.label }}
                </span>
                <span
                  v-if="child.description"
                  class="mt-1 block text-xs font-medium leading-snug text-current/65"
                >
                  {{ child.description }}
                </span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
