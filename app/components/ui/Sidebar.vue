<script setup lang="ts">
export interface SidebarLink {
  label: string;
  href: string;
}

export interface SidebarGroup {
  heading: string;
  links: SidebarLink[];
}

type SidebarLogoMark = "brand" | "design-system";
type SidebarLogoSize = "xs" | "sm" | "md" | "lg";

interface Props {
  title?: string;
  logo?: boolean;
  logoMark?: SidebarLogoMark;
  logoHref?: string;
  logoLabel?: string;
  groups: SidebarGroup[];
  selectedHref?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: "Sidebar",
  logoMark: "brand",
  logoLabel: "Home",
});

const isSelected = (href: string) => href === props.selectedHref;
const logoSize = computed<SidebarLogoSize>(() =>
  props.logoMark === "design-system" ? "sm" : "sm",
);
</script>

<template>
  <aside
    class="w-full shrink-0 border-b border-border bg-secondary px-6 py-5 lg:w-64 lg:border-b-0 lg:border-r lg:py-8"
  >
    <div v-if="logo || title" class="space-y-3">
      <NuxtLink
        v-if="logo && logoHref"
        :to="logoHref"
        class="inline-flex text-foreground"
        :aria-label="logoLabel"
      >
        <UiLogo :size="logoSize" tone="foreground" :mark="logoMark" />
      </NuxtLink>
      <UiLogo
        v-else-if="logo"
        :size="logoSize"
        tone="foreground"
        :mark="logoMark"
      />
      <UiText v-if="title" size="xs" weight="bold" tone="low">
        {{ title }}
      </UiText>
    </div>
    <nav
      :aria-label="ariaLabel"
      :class="
        logo || title
          ? 'mt-4 flex gap-5 overflow-x-auto pb-1 lg:mt-6 lg:block lg:space-y-6 lg:overflow-visible lg:pb-0'
          : 'flex gap-5 overflow-x-auto pb-1 lg:block lg:space-y-6 lg:overflow-visible lg:pb-0'
      "
    >
      <div v-for="group in groups" :key="group.heading" class="min-w-max">
        <UiText as="div" size="xs" weight="bold" tone="low">
          {{ group.heading }}
        </UiText>
        <ul class="mt-2 flex gap-1 lg:block lg:space-y-1">
          <li v-for="link in group.links" :key="link.href">
            <NuxtLink
              :to="link.href"
              :aria-current="isSelected(link.href) ? 'page' : undefined"
              class="block whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors"
              :class="
                isSelected(link.href)
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-foreground hover:bg-foreground/5'
              "
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
