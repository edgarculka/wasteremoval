<script setup lang="ts">
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";
import type { TimePickerOption } from "~/components/ui/TimePicker.vue";

const selectedTime = ref<string | null>("afternoon");

const times: TimePickerOption[] = [
  {
    id: "morning",
    label: "Morning",
    description: "8am - 12pm",
    icon: IconsMorning,
  },
  {
    id: "afternoon",
    label: "Afternoon",
    description: "12pm - 4pm",
    icon: IconsAfternoon,
  },
  {
    id: "evening",
    label: "Evening",
    description: "4pm - 8pm",
    icon: IconsEvening,
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Time picker</UiHeading>
      <UiText tone="low" class="mt-3">
        A selectable card group for collection windows. Options accept
        <code>id</code>, <code>label</code>, optional
        <code>description</code>, and optional <code>icon</code> component
        props, then bind the selected option with <code>v-model</code>.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Selectable options</UiHeading>
      <div class="mt-4 max-w-md">
        <UiTimePicker v-model="selectedTime" :options="times" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Without icons</UiHeading>
      <div class="mt-4 max-w-md">
        <UiTimePicker
          v-model="selectedTime"
          :options="times.map(({ icon, ...time }) => time)"
          aria-label="Choose a time without icons"
        />
      </div>
    </section>
  </div>
</template>
