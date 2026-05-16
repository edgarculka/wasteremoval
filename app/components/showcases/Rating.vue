<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Rating</UiHeading>
      <UiText tone="low" class="mt-3">
        Star rating with optional label. Pass <code>value</code> for the
        number of filled stars and an optional <code>max</code> (default 5).
        Label content goes in the default slot.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4">
        <UiRating :value="5">Five star rating</UiRating>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Variants</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Different fill counts. Empty stars use the outline variant.
      </UiText>
      <div class="mt-4 space-y-3">
        <UiRating :value="5">5 of 5</UiRating>
        <UiRating :value="4">4 of 5</UiRating>
        <UiRating :value="3">3 of 5</UiRating>
        <UiRating :value="2">2 of 5</UiRating>
        <UiRating :value="1">1 of 5</UiRating>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Sizes</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Use <code>size</code> for compact inline ratings or larger aggregate
        ratings.
      </UiText>
      <div class="mt-4 space-y-3">
        <UiRating :value="4.5" size="sm">Small rating</UiRating>
        <UiRating :value="4.5">Default rating</UiRating>
        <UiRating :value="4.5" size="lg">Large rating</UiRating>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Fractional values</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Fractions of <code>0.5</code> or more on a star round up to the
        half variant; less than <code>0.5</code> stays empty.
      </UiText>
      <div class="mt-4 space-y-3">
        <UiRating :value="4.5">4.5 of 5</UiRating>
        <UiRating :value="3.5">3.5 of 5</UiRating>
        <UiRating :value="2.5">2.5 of 5</UiRating>
        <UiRating :value="0.5">0.5 of 5</UiRating>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without label</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Stars only when context already implies a rating.
      </UiText>
      <div class="mt-4">
        <UiRating :value="5" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Custom max</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Use <code>max</code> for non-five-star scales.
      </UiText>
      <div class="mt-4 space-y-3">
        <UiRating :value="3" :max="4">3 of 4</UiRating>
        <UiRating :value="7" :max="10">7 of 10</UiRating>
      </div>
    </section>
  </div>
</template>
