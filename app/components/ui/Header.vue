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
    class="sticky top-0 z-50 bg-secondary/95 shadow-[0_0.75rem_2rem_rgb(var(--shadow-color)/0.08)] backdrop-blur-xl"
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
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            :aria-haspopup="item.children?.length ? 'true' : undefined"
          >
            {{ item.label }}
            <IconsChevronDown
              v-if="item.children?.length"
              class="text-base transition group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </NuxtLink>

          <div
            v-if="item.children?.length"
            class="invisible absolute left-1/2 top-full z-20 w-[min(calc(100vw-2rem),54rem)] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-150 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
          >
            <div
              class="overflow-hidden rounded-lg border border-border bg-secondary shadow-[0_1.25rem_3.5rem_rgb(var(--shadow-color)/0.16)]"
            >
              <div
                class="flex items-center justify-between gap-4 border-b border-border bg-surface-muted px-4 py-3"
              >
                <span>
                  <span class="block text-xs font-bold uppercase tracking-wide text-current/55">
                    {{ item.label }}
                  </span>
                  <span class="block text-sm font-bold leading-tight">
                    Choose a clearance service
                  </span>
                </span>
                <UiButton :href="item.href" variant="secondary" size="sm">
                  View all
                  <template #iconRight>
                    <IconsChevronRight />
                  </template>
                </UiButton>
              </div>
              <div class="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.href"
                  :to="child.href"
                  class="group/card grid min-h-20 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 bg-secondary p-2.5 text-secondary-foreground transition hover:bg-primary/20 focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus-ring"
                >
                  <img
                    v-if="child.image"
                    :src="child.image.src"
                    :alt="child.image.alt"
                    :width="child.image.width"
                    :height="child.image.height"
                    class="aspect-square w-full rounded-md object-cover"
                    data-no-lightbox
                  />
                  <span
                    v-else
                    class="aspect-square w-full rounded-md bg-primary/30"
                    aria-hidden="true"
                  />
                  <span class="min-w-0">
                    <span class="block text-sm font-bold leading-tight">
                      {{ child.label }}
                    </span>
                    <span class="mt-1 block text-xs font-bold text-current/55">
                      Learn more
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
          <div class="block lg:hidden">
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
        <UiButton
          v-if="nav.length"
          type="button"
          variant="secondary"
          size="icon"
          class="shrink-0 md:hidden"
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
        </UiButton>
      </div>
    </div>
    <div
      v-if="nav.length"
      id="mobile-navigation"
      :class="[
        'fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-secondary px-4 pb-5 pt-3 shadow-[0_1rem_2rem_rgb(var(--shadow-color)/0.12)] md:hidden',
        isMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <nav class="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile">
        <div v-for="item in nav" :key="item.href" class="grid gap-2">
          <div
            v-if="item.children?.length"
            class="grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border border-border bg-background"
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
            class="rounded-lg border border-border bg-background px-4 py-3 text-sm font-bold transition hover:bg-primary/20"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
          <div
            v-if="item.children?.length && expandedMobileItems[item.href]"
            class="grid max-h-[62dvh] gap-px overflow-hidden overflow-y-auto rounded-lg border border-border bg-border"
          >
            <NuxtLink
              :to="item.href"
              class="flex items-center justify-between gap-3 bg-surface-muted px-3 py-3 text-sm font-bold transition hover:bg-primary/20"
              @click="closeMenu"
            >
              View all {{ item.label.toLowerCase() }}
              <IconsChevronRight class="text-base" />
            </NuxtLink>
            <NuxtLink
              v-for="child in item.children"
              :key="child.href"
              :to="child.href"
              class="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 bg-background p-2.5 text-secondary-foreground transition hover:bg-primary/20"
              @click="closeMenu"
            >
              <img
                v-if="child.image"
                :src="child.image.src"
                :alt="child.image.alt"
                :width="child.image.width"
                :height="child.image.height"
                class="aspect-square w-full rounded-md object-cover"
                data-no-lightbox
              />
              <span
                v-else
                class="aspect-square w-full rounded-md bg-primary/30"
                aria-hidden="true"
              />
              <span class="min-w-0">
                <span class="block text-sm font-bold leading-tight">
                  {{ child.label }}
                </span>
                <span
                  v-if="child.description"
                  class="mt-1 block truncate text-xs font-medium leading-snug text-current/65"
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
