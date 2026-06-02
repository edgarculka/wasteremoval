<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Hero</UiHeading>
      <UiText tone="low" class="mt-3">
        Hero text content (heading, description, actions) wrapped in a
        Section. Section's <code>#visual</code> slot holds the image — that
        way Section's horizontal grid centres the entire text column
        (including the Rating in <code>#above</code>) against the image.
      </UiText>
    </header>

    <section>
      <div class="overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="lg" alignment="left">
          <template #above>
            <UiRating :value="5">Five star rating</UiRating>
          </template>
          <UiHero
            heading="Unbeatable rubbish removal."
            description="Leading the charge in clearing what others can't. Same-day rubbish removal and property clearance for tenants, landlords, and businesses."
          >
            <template #actions>
              <UiButton size="lg">Try for free</UiButton>
              <UiButton variant="ghost" size="lg">
                Get a demo
                <template #iconRight>
                  <span aria-hidden="true">›</span>
                </template>
              </UiButton>
            </template>
          </UiHero>
          <template #visual>
            <img
              src="/images/rubbish-removal.webp"
              alt="Rubbish removal illustration"
              class="aspect-square w-full rounded-2xl border-2 border-foreground object-cover shadow-[0.5rem_0.5rem_0_0_var(--foreground)]"
            />
          </template>
        </UiSection>
      </div>
    </section>
  </div>
</template>
