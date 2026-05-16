<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Sidebar</UiHeading>
      <UiText tone="low" class="mt-3">
        Vertical navigation rendering grouped link lists. Pass groups in as
        data; the component owns the markup, selected state, and styling. Use
        <code>logo-mark</code> to choose the brand or design-system logo.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Design-system logo</UiHeading>
      <div
        class="mt-4 flex h-96 flex-col overflow-hidden rounded-md border border-border lg:flex-row"
      >
        <UiSidebar
          logo
          logo-mark="design-system"
          logo-href="/design-system/sidebar"
          logo-label="Sidebar showcase"
          selected-href="/design-system/input"
          :groups="[
            {
              heading: 'Getting started',
              links: [
                { label: 'Overview', href: '/design-system' },
                { label: 'Typography', href: '/design-system/typography' },
              ],
            },
            {
              heading: 'Components',
              links: [
                { label: 'Button', href: '/design-system/buttons' },
                { label: 'Input', href: '/design-system/input' },
                { label: 'Card', href: '/design-system/card' },
              ],
            },
          ]"
        />
        <UiText tone="low" size="sm" class="min-h-0 flex-1 px-6 py-8">
          Main content area
        </UiText>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without title</UiHeading>
      <div
        class="mt-4 flex h-64 flex-col overflow-hidden rounded-md border border-border lg:flex-row"
      >
        <UiSidebar
          :groups="[
            {
              heading: 'Account',
              links: [
                { label: 'Header', href: '/design-system/header' },
                { label: 'Footer', href: '/design-system/footer' },
                { label: 'FAQ', href: '/design-system/faq' },
              ],
            },
          ]"
        />
        <UiText tone="low" size="sm" class="min-h-0 flex-1 px-6 py-8">
          Main content area
        </UiText>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Logo without title</UiHeading>
      <div
        class="mt-4 flex h-64 overflow-hidden rounded-md border border-border"
      >
        <UiSidebar
          logo
          :groups="[
            {
              heading: 'Account',
              links: [
                { label: 'Header', href: '/design-system/header' },
                { label: 'Footer', href: '/design-system/footer' },
                { label: 'FAQ', href: '/design-system/faq' },
              ],
            },
          ]"
        />
        <UiText tone="low" size="sm" class="flex-1 px-6 py-8">
          Main content area
        </UiText>
      </div>
    </section>
  </div>
</template>
