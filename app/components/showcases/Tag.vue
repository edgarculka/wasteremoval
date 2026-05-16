<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Tag</UiHeading>
      <UiText tone="low" class="mt-3">
        Small pill label for marking items in lists, cards, or filters. Used on
        <code>UiCard</code> option cards to highlight the most popular tier or
        minimum price.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Variants</UiHeading>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <UiTag>Primary</UiTag>
        <UiTag variant="secondary">Secondary</UiTag>
        <UiTag variant="accent">Accent</UiTag>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">In context</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Place a Tag absolutely positioned over the top edge of a card to draw
        the eye. <code>UiCard</code> exposes a <code>tag</code> prop that
        wires this up automatically.
      </UiText>
      <div class="mt-6 grid max-w-3xl gap-4 sm:grid-cols-3">
        <UiCard
          layout="option"
          title="Mini Load"
          description="1/4 van"
          price="£100"
          tag="Minimum price"
        />
        <UiCard
          layout="option"
          title="Small Load"
          description="1/2 van"
          price="£180"
          tag="Most popular"
        />
        <UiCard
          layout="option"
          title="Full Load"
          description="Full van"
          price="£300"
        />
      </div>
    </section>
  </div>
</template>
