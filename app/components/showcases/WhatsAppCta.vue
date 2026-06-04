<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">WhatsApp CTA</UiHeading>
      <UiText tone="low" class="mt-3">
        Fixed bottom-right action for public pages. The app shell controls
        where it renders; the component owns the sticky position, icon, and
        button styling.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Uses the shared WhatsApp icon and button primitive, opening the supplied
        WhatsApp URL in a new tab.
      </UiText>
      <div class="relative mt-4 min-h-56 overflow-hidden rounded-md border border-border bg-background">
        <UiWhatsAppCta href="https://wa.me/447747251550" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Custom label</UiHeading>
      <div class="relative mt-4 min-h-56 overflow-hidden rounded-md border border-border bg-background">
        <UiWhatsAppCta
          href="https://wa.me/447747251550"
          label="Send photos"
          aria-label="Send waste photos on WhatsApp"
        />
      </div>
    </section>
  </div>
</template>
