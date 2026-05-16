<template>
  <div class="space-y-12">
    <header>
      <UiHeading size="lg">Typography</UiHeading>
      <UiText tone="low" class="mt-3">
        Every text style used across the project. Headings, body, inline
        links, and the typography baked into button labels.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Headings — UiHeading</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Single weight (semibold). Sizes <code>xs</code>, <code>sm</code>,
        <code>md</code>, <code>lg</code>, <code>xl</code>. Default size derives
        from <code>level</code>.
      </UiText>

      <UiHeading :level="3" size="xs" class="mt-6">Sizes</UiHeading>
      <div class="mt-3 space-y-3">
        <UiHeading size="xl">Heading XL — display</UiHeading>
        <UiHeading size="lg">Heading LG — page title</UiHeading>
        <UiHeading size="md">Heading MD — section</UiHeading>
        <UiHeading size="sm">Heading SM — sub-section</UiHeading>
        <UiHeading size="xs">Heading XS</UiHeading>
      </div>

      <UiHeading :level="3" size="xs" class="mt-6">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        High for primary headings; low for muted treatments where the heading
        plays a supporting role.
      </UiText>
      <div class="mt-3 space-y-2">
        <UiHeading size="md" tone="high">High contrast heading</UiHeading>
        <UiHeading size="md" tone="low">Low contrast heading</UiHeading>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Body — UiText</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Multiple sizes, weights, and tones. Defaults: size <code>md</code>,
        weight <code>regular</code>, tone <code>high</code>. Use the
        <code>as</code> prop for non-paragraph elements (<code>span</code>,
        <code>div</code>).
      </UiText>

      <UiHeading :level="3" size="xs" class="mt-6">Sizes</UiHeading>
      <div class="mt-3 space-y-2">
        <UiText size="lg">Body LG — lead paragraph or callout intro.</UiText>
        <UiText size="md">Body MD — default body copy across the site.</UiText>
        <UiText size="sm">Body SM — supporting and helper text.</UiText>
        <UiText size="xs">Body XS — fine print, captions, footnotes.</UiText>
      </div>

      <UiHeading :level="3" size="xs" class="mt-6">Weights</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Headings have a single weight; body has four for emphasis within
        running text.
      </UiText>
      <div class="mt-3 space-y-2">
        <UiText weight="regular">Regular weight body text.</UiText>
        <UiText weight="medium">Medium weight body text.</UiText>
        <UiText weight="semibold">Semibold weight body text.</UiText>
        <UiText weight="bold">Bold weight body text.</UiText>
      </div>

      <UiHeading :level="3" size="xs" class="mt-6">Tones</UiHeading>
      <div class="mt-3 space-y-2">
        <UiText tone="high">High contrast — primary text colour.</UiText>
        <UiText tone="low">Low contrast — descriptions and muted prose.</UiText>
        <UiText tone="primary">Primary tinted — emphasis or callouts.</UiText>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Links — UiLink</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Inline text links. For button-shaped navigation, use UiButton with
        <code>href</code> instead.
      </UiText>

      <div class="mt-6 space-y-3">
        <UiText>
          Default treatment is the most prominent — primary colour with a
          persistent underline:
          <UiLink href="#" treatment="default">visit the docs</UiLink>.
        </UiText>
        <UiText>
          Subtle treatment uses the body colour and reveals the underline on
          hover:
          <UiLink href="#" treatment="subtle">read more</UiLink>.
        </UiText>
        <UiText>
          Muted treatment is lower contrast, emerging on hover:
          <UiLink href="#" treatment="muted">archived posts</UiLink>.
        </UiText>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Button labels</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Button label typography is encapsulated in UiButton — medium weight,
        size-derived font scale. Documented here so the system has one home.
      </UiText>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <UiButton size="sm">Small label</UiButton>
        <UiButton size="md">Medium label</UiButton>
        <UiButton size="lg">Large label</UiButton>
      </div>
    </section>
  </div>
</template>
