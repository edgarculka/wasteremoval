<script setup lang="ts">
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

interface Props {
  primaryLinks: FooterLink[];
  serviceLinks: FooterLink[];
  locationLinks: FooterLink[];
  selectedLocationLabel?: string;
  brandName?: string;
  logoHref?: string;
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  brandName: "Waste Removal",
  logoHref: "/",
  ariaLabel: "Sitemap",
});
</script>

<template>
  <footer class="bg-surface-dark px-6 py-12 text-background sm:px-10 lg:px-16">
    <nav
      :aria-label="ariaLabel"
      class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(12rem,0.8fr)_minmax(0,2.2fr)]"
    >
      <div class="space-y-6">
        <NuxtLink
          :to="logoHref"
          class="inline-flex"
          :aria-label="`${brandName} home`"
        >
          <UiLogo tone="background" size="sm" />
        </NuxtLink>

        <div>
          <ul class="mt-3 space-y-2">
            <li v-for="link in primaryLinks" :key="link.href">
              <UiLink :href="link.href" treatment="subtle" class="text-sm">
                {{ link.label }}
              </UiLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="space-y-4">
        <div class="grid gap-8 sm:grid-cols-2">
          <section class="space-y-3">
            <UiText :level="2" size="xs" tone="low">
              Services
            </UiText>
            <ul class="space-y-2">
              <li v-for="link in serviceLinks" :key="link.href">
                <UiLink :href="link.href" treatment="subtle" class="text-sm">
                  {{ link.label }}
                  <span v-if="selectedLocationLabel" class="text-current/60">
                    in {{ selectedLocationLabel }}
                  </span>
                </UiLink>
              </li>
            </ul>
          </section>

          <section class="space-y-3">
            <UiText :level="2" size="xs" tone="low">
              Locations
            </UiText>
            <ul class="space-y-2">
              <li v-for="link in locationLinks" :key="link.href">
                <UiLink :href="link.href" treatment="subtle" class="text-sm">
                  {{ link.label }}
                </UiLink>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </nav>
  </footer>
</template>
