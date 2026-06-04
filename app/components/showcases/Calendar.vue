<script setup lang="ts">
const dateA = ref<string | null>(null);
const dateB = ref<string | null>(null);
const dateC = ref<string | null>(null);
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Calendar</UiHeading>
      <UiText tone="low" class="mt-3">
        Month-navigable date picker. Owns its own secondary-tone surface
        (white card with a dark border) so it stands out wherever it lands.
        Two-way bind via <code>v-model</code> with an ISO-format string
        (<code>YYYY-MM-DD</code>) or <code>null</code>. Past dates are
        disabled automatically; <code>minDaysAhead</code> controls how far
        forward selection starts, <code>monthsToShow</code> caps how far
        forward the user can navigate.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Earliest selectable day is tomorrow; user can navigate up to 3
        months ahead.
      </UiText>
      <div class="mt-4 max-w-md">
        <UiCalendar v-model="dateA" />
      </div>
      <UiText v-if="dateA" size="sm" tone="low" class="mt-3 italic">
        Selected: {{ dateA }}
      </UiText>
    </section>

    <section>
      <UiHeading :level="2" size="sm">No lead time</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>:min-days-ahead="0"</code> lets the user pick today.
      </UiText>
      <div class="mt-4 max-w-md">
        <UiCalendar v-model="dateB" :min-days-ahead="0" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Wider window</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>:months-to-show="6"</code> for longer-lead bookings.
      </UiText>
      <div class="mt-4 max-w-md">
        <UiCalendar v-model="dateC" :months-to-show="6" />
      </div>
    </section>
  </div>
</template>
