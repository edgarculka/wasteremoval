<script setup lang="ts">
const name = ref("");
const email = ref("");
const phone = ref("");
const postcode = ref("");
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Input</UiHeading>
      <UiText tone="low" class="mt-3">
        Single-line text field. Brand styling — secondary surface, dark
        border, primary focus ring — with a softly rounded shape
        (<code>rounded-lg</code>) rather than a fully circular pill. Two-way
        bind via <code>v-model</code>. Use <code>transform="uppercase"</code>
        for fields such as postcodes. Pair with <code>UiText</code> inside a
        <code>&lt;label&gt;</code> for accessible field labels.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 max-w-md">
        <UiInput v-model="name" placeholder="Type something" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">With label</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Compose with <code>UiText</code> inside a native
        <code>&lt;label&gt;</code> — the typographic style stays canonical
        and the click target wraps both label and field.
      </UiText>
      <div class="mt-4 flex max-w-md flex-col gap-5">
        <label class="flex flex-col gap-2">
          <UiText as="span" size="sm" weight="semibold">Email</UiText>
          <UiInput
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="jane@example.com"
          />
        </label>
        <label class="flex flex-col gap-2">
          <UiText as="span" size="sm" weight="semibold">Phone</UiText>
          <UiInput
            v-model="phone"
            type="tel"
            autocomplete="tel"
            placeholder="07700 900000"
          />
        </label>
        <label class="flex flex-col gap-2">
          <UiText as="span" size="sm" weight="semibold">Postcode</UiText>
          <UiInput
            v-model="postcode"
            autocomplete="postal-code"
            placeholder="SW1A 1AA"
            transform="uppercase"
          />
        </label>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Disabled</UiHeading>
      <div class="mt-4 max-w-md">
        <UiInput model-value="Read-only value" disabled />
      </div>
    </section>
  </div>
</template>
