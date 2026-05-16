<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Buttons</UiHeading>
      <UiText tone="low" class="mt-3">
        Button variants and sizes available across the site.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Variants</UiHeading>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton variant="primary">Primary</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Sizes</UiHeading>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton size="sm">Small</UiButton>
        <UiButton size="md">Medium</UiButton>
        <UiButton size="lg">Large</UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">With icon</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Use the <code>iconLeft</code> or <code>iconRight</code> slot. Icons are
        sized in <code>em</code> and inherit the button's text size and color.
      </UiText>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton>
          <template #iconLeft><IconsExpand /></template>
          Expand
        </UiButton>
        <UiButton>
          Expand
          <template #iconRight><IconsExpand /></template>
        </UiButton>
        <UiButton variant="secondary">
          <template #iconLeft><IconsMinimize /></template>
          Collapse
        </UiButton>
        <UiButton variant="ghost">
          Collapse
          <template #iconRight><IconsMinimize /></template>
        </UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Icon only</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Use <code>size="icon"</code> for square icon-only buttons. Always
        provide an <code>aria-label</code>.
      </UiText>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton size="icon" aria-label="Expand">
          <IconsExpand />
        </UiButton>
        <UiButton size="icon" variant="secondary" aria-label="Collapse">
          <IconsMinimize />
        </UiButton>
        <UiButton size="icon" variant="ghost" aria-label="Expand">
          <IconsExpand />
        </UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">As link</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Pass <code>href</code> to render the same button as a Nuxt
        <code>NuxtLink</code>. Same styles, navigation semantics.
      </UiText>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton href="/design-system">Go to overview</UiButton>
        <UiButton href="/" variant="secondary">Home</UiButton>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Disabled</UiHeading>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiButton disabled>Primary</UiButton>
        <UiButton variant="secondary" disabled>Secondary</UiButton>
        <UiButton variant="ghost" disabled>Ghost</UiButton>
        <UiButton size="icon" disabled aria-label="Expand">
          <IconsExpand />
        </UiButton>
      </div>
    </section>
  </div>
</template>
