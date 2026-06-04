<script setup lang="ts">
definePageMeta({
  layout: "design-system",
});

useSeoMeta({
  title: "Colors - Design System",
  robots: "noindex, nofollow",
});

const paletteGroups = [
  {
    name: "Brand Colors",
    description:
      "The raw DBS Waste palette. These variables are the source colors for the semantic UI tokens.",
    colors: [
      {
        name: "Lime 300",
        variable: "--brand-lime-300",
        value: "#d7f55d",
        use: "Core brand action color.",
      },
      {
        name: "Forest 700",
        variable: "--brand-forest-700",
        value: "#087a4c",
        use: "Accent color for links, focus rings, and emphasis text.",
        dark: true,
      },
      {
        name: "Forest 800",
        variable: "--brand-forest-800",
        value: "#06351f",
        use: "Primary text and button foreground.",
        dark: true,
      },
      {
        name: "Forest 900",
        variable: "--brand-forest-900",
        value: "#06231f",
        use: "Dark section background.",
        dark: true,
      },
    ],
  },
  {
    name: "Additional Colors",
    description:
      "Support colors that keep surfaces, borders, and feedback consistent without introducing one-off palette classes.",
    colors: [
      {
        name: "Forest 50",
        variable: "--brand-forest-50",
        value: "#edf7f0",
        use: "Muted surface background.",
      },
      {
        name: "Forest 100",
        variable: "--brand-forest-100",
        value: "#d6e8dc",
        use: "Default border color.",
      },
      {
        name: "White",
        variable: "--neutral-white",
        value: "#ffffff",
        use: "Raised surfaces and secondary controls.",
      },
      {
        name: "Mist",
        variable: "--neutral-mist",
        value: "#f7faf6",
        use: "Page background.",
      },
      {
        name: "Red 700",
        variable: "--feedback-red-700",
        value: "#b42318",
        use: "Validation and destructive feedback.",
        dark: true,
      },
    ],
  },
];

const semanticTokens = [
  {
    token: "--background",
    source: "--neutral-mist",
    utility: "bg-background",
    usedBy: "Page canvas and quiet UI surfaces.",
  },
  {
    token: "--foreground",
    source: "--brand-forest-800",
    utility: "text-foreground",
    usedBy: "Default text, icon color, and strong borders.",
  },
  {
    token: "--surface-dark",
    source: "--brand-forest-900",
    utility: "bg-surface-dark",
    usedBy: "Dark sections.",
  },
  {
    token: "--surface-muted",
    source: "--brand-forest-50",
    utility: "bg-surface-muted",
    usedBy: "Subtle supporting panels.",
  },
  {
    token: "--surface-raised",
    source: "--neutral-white",
    utility: "bg-surface-raised",
    usedBy: "Admin and elevated surfaces.",
  },
  {
    token: "--primary",
    source: "--brand-lime-300",
    utility: "bg-primary",
    usedBy: "Primary buttons, callouts, selected cards, and brand CTAs.",
  },
  {
    token: "--primary-foreground",
    source: "--brand-forest-800",
    utility: "text-primary-foreground",
    usedBy: "Text on primary surfaces.",
  },
  {
    token: "--secondary",
    source: "--neutral-white",
    utility: "bg-secondary",
    usedBy: "Secondary buttons, cards, headers, and menus.",
  },
  {
    token: "--secondary-foreground",
    source: "--brand-forest-800",
    utility: "text-secondary-foreground",
    usedBy: "Text on secondary surfaces.",
  },
  {
    token: "--accent",
    source: "--brand-forest-700",
    utility: "text-accent",
    usedBy: "Text emphasis and accent tags.",
  },
  {
    token: "--destructive",
    source: "--feedback-red-700",
    utility: "text-destructive",
    usedBy: "Form validation and submit errors.",
  },
  {
    token: "--border",
    source: "--brand-forest-100",
    utility: "border-border",
    usedBy: "Default component borders and dividers.",
  },
  {
    token: "--focus-ring",
    source: "--accent",
    utility: "outline-focus-ring",
    usedBy: "Keyboard focus outlines.",
  },
  {
    token: "--shadow-color",
    source: "--brand-forest-800 as RGB channels",
    utility: "rgb(var(--shadow-color) / opacity)",
    usedBy: "Component and card shadows.",
  },
];

const uiExamples = [
  {
    name: "Primary action",
    tokens: "bg-primary, text-primary-foreground, outline-focus-ring",
  },
  {
    name: "Secondary card",
    tokens: "bg-secondary, text-secondary-foreground, border-border",
  },
  {
    name: "Dark section",
    tokens: "bg-surface-dark, text-background",
  },
  {
    name: "Validation",
    tokens: "text-destructive",
  },
];
</script>

<template>
  <div class="max-w-6xl space-y-12">
    <header>
      <UiHeading size="lg">Colors</UiHeading>
      <UiText tone="low" class="mt-3 max-w-3xl">
        DBS Waste colors start as brand and support palette variables in
        <code>main.css</code>. Components consume semantic variables through
        Tailwind utilities, so the UI can be themed from one token layer.
      </UiText>
    </header>

    <section v-for="group in paletteGroups" :key="group.name">
      <UiHeading :level="2" size="sm">{{ group.name }}</UiHeading>
      <UiText tone="low" class="mt-2 max-w-3xl">
        {{ group.description }}
      </UiText>

      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UiCard
          v-for="color in group.colors"
          :key="color.variable"
          size="sm"
        >
          <div
            class="flex min-h-28 flex-col justify-between rounded-md border border-border p-4"
            :class="color.dark ? 'text-background' : 'text-foreground'"
            :style="{ backgroundColor: `var(${color.variable})` }"
          >
            <UiText as="span" weight="bold">{{ color.name }}</UiText>
            <UiText as="span" size="xs" weight="bold">
              {{ color.variable }}
            </UiText>
          </div>
          <div class="mt-4 space-y-2">
            <UiText size="sm" weight="bold">{{ color.value }}</UiText>
            <UiText size="sm" tone="low">{{ color.use }}</UiText>
          </div>
        </UiCard>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Semantic Variables</UiHeading>
      <UiText tone="low" class="mt-2 max-w-3xl">
        These are the variables components should use. The source column links
        each semantic role back to the palette variable it inherits from.
      </UiText>

      <div class="mt-5 overflow-hidden rounded-lg border border-border bg-secondary">
        <div
          v-for="token in semanticTokens"
          :key="token.token"
          class="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[12rem_14rem_13rem_minmax(0,1fr)]"
        >
          <UiText as="span" size="sm" weight="bold">{{ token.token }}</UiText>
          <UiText as="span" size="sm" tone="low">{{ token.source }}</UiText>
          <UiText as="span" size="sm" weight="semibold">
            {{ token.utility }}
          </UiText>
          <UiText as="span" size="sm" tone="low">{{ token.usedBy }}</UiText>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">UI Usage</UiHeading>
      <UiText tone="low" class="mt-2 max-w-3xl">
        The examples below are live design-system components using the semantic
        variables listed above.
      </UiText>

      <div class="mt-5 grid gap-4 lg:grid-cols-2">
        <UiCard>
          <UiText weight="bold">{{ uiExamples[0]?.name }}</UiText>
          <UiText size="sm" tone="low" class="mt-1">
            {{ uiExamples[0]?.tokens }}
          </UiText>
          <div class="mt-4 flex flex-wrap gap-3">
            <UiButton>Get a quote</UiButton>
            <UiButton variant="secondary">Call us</UiButton>
          </div>
        </UiCard>

        <UiCard>
          <UiText weight="bold">{{ uiExamples[1]?.name }}</UiText>
          <UiText size="sm" tone="low" class="mt-1">
            {{ uiExamples[1]?.tokens }}
          </UiText>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <UiTag>Primary</UiTag>
            <UiTag variant="accent">Accent</UiTag>
          </div>
        </UiCard>

        <div class="rounded-lg border border-border bg-surface-dark p-5 text-background">
          <UiText weight="bold">{{ uiExamples[2]?.name }}</UiText>
          <UiText size="sm" tone="low" class="mt-1">
            {{ uiExamples[2]?.tokens }}
          </UiText>
        </div>

        <UiCard>
          <UiText weight="bold">{{ uiExamples[3]?.name }}</UiText>
          <UiText size="sm" tone="low" class="mt-1">
            {{ uiExamples[3]?.tokens }}
          </UiText>
          <UiText size="sm" weight="semibold" class="mt-4 text-destructive">
            Enter a valid email address.
          </UiText>
        </UiCard>
      </div>
    </section>
  </div>
</template>
