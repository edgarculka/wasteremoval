<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Logo</UiHeading>
      <UiText tone="low" class="mt-3">
        Brand, icon and design-system logo marks rendered from SVG files via a CSS
        mask, so any brand colour token can paint through. Use
        <code>mark</code> to choose the artwork, <code>tone</code> for the
        colour and <code>size</code> for the height. Aspect ratio stays fixed.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 rounded-md border border-border p-6">
        <UiLogo />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Marks</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>brand</code> is the default. <code>brand-icon</code> uses
        <code>/images/waste-logo-icon.svg</code> for compact mobile placements,
        and <code>design-system</code> uses <code>/images/design-system-logo.svg</code>.
      </UiText>
      <div class="mt-4 space-y-4 rounded-md border border-border p-6">
        <UiLogo mark="brand" />
        <UiLogo mark="brand-icon" />
        <UiLogo mark="design-system" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Sizes</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>xs</code> (1.25rem), <code>sm</code> (1.5rem),
        <code>md</code> (2rem, default), <code>lg</code> (2.5rem). Width
        tracks the SVG's aspect ratio.
      </UiText>
      <div
        class="mt-4 flex flex-wrap items-end gap-8 rounded-md border border-border p-6"
      >
        <UiLogo size="xs" />
        <UiLogo size="sm" />
        <UiLogo size="md" />
        <UiLogo size="lg" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Pick the tone that contrasts with the surface the logo sits on.
      </UiText>
      <div class="mt-4 space-y-3">
        <div class="rounded-md border border-border bg-background p-6">
          <UiLogo tone="primary" />
        </div>
        <div class="rounded-md border border-border bg-secondary p-6">
          <UiLogo tone="foreground" />
        </div>
        <div class="rounded-md border border-border bg-surface-dark p-6">
          <UiLogo tone="background" />
        </div>
      </div>
    </section>
  </div>
</template>
