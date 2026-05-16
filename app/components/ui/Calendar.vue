<script setup lang="ts">
import { computed, ref } from "vue";

const model = defineModel<string | null>({ default: null });

interface Props {
  minDaysAhead?: number;
  monthsToShow?: number;
  today?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  minDaysAhead: 1,
  monthsToShow: 3,
});

const today = computed(() => props.today ?? new Date());
const earliestSelectable = computed(() => {
  const d = new Date(today.value);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + props.minDaysAhead);
  return d;
});

const visibleMonthOffset = ref(0);

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const visibleMonth = computed(
  () =>
    new Date(
      today.value.getFullYear(),
      today.value.getMonth() + visibleMonthOffset.value,
      1,
    ),
);

const visibleMonthLabel = computed(() =>
  visibleMonth.value.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  }),
);

interface CalendarCell {
  date: Date | null;
  iso: string | null;
  disabled: boolean;
}

const calendarCells = computed<CalendarCell[]>(() => {
  const first = visibleMonth.value;
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0);
  const startWeekday = (first.getDay() + 6) % 7;
  const cells: CalendarCell[] = [];
  for (let i = 0; i < startWeekday; i++)
    cells.push({ date: null, iso: null, disabled: true });
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(first.getFullYear(), first.getMonth(), d);
    cells.push({
      date,
      iso: isoDate(date),
      disabled: date < earliestSelectable.value,
    });
  }
  return cells;
});

const canGoPrevMonth = computed(() => {
  const first = visibleMonth.value;
  const earliest = earliestSelectable.value;
  return (
    first.getFullYear() > earliest.getFullYear() ||
    (first.getFullYear() === earliest.getFullYear() &&
      first.getMonth() > earliest.getMonth())
  );
});
const canGoNextMonth = computed(
  () => visibleMonthOffset.value < props.monthsToShow - 1,
);

function prevMonth() {
  if (canGoPrevMonth.value) visibleMonthOffset.value -= 1;
}
function nextMonth() {
  if (canGoNextMonth.value) visibleMonthOffset.value += 1;
}

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<template>
  <div
    class="rounded-2xl border-2 border-foreground bg-secondary p-5 text-secondary-foreground max-w-sm"
  >
    <div class="flex items-center justify-between gap-3">
      <UiButton
        size="icon"
        variant="ghost"
        aria-label="Previous month"
        :disabled="!canGoPrevMonth"
        @click="prevMonth"
      >
        <span aria-hidden="true">‹</span>
      </UiButton>
      <UiText as="span" weight="bold" size="md">
        {{ visibleMonthLabel }}
      </UiText>
      <UiButton
        size="icon"
        variant="ghost"
        aria-label="Next month"
        :disabled="!canGoNextMonth"
        @click="nextMonth"
      >
        <span aria-hidden="true">›</span>
      </UiButton>
    </div>
    <div class="mt-4 grid grid-cols-7 gap-1 text-center">
      <UiText
        v-for="label in weekdayLabels"
        :key="label"
        as="span"
        size="xs"
        tone="low"
        weight="semibold"
        class="py-2"
      >
        {{ label }}
      </UiText>
      <template v-for="(cell, i) in calendarCells" :key="i">
        <button
          v-if="cell.date"
          type="button"
          class="aspect-square rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-30"
          :class="
            model === cell.iso
              ? 'border-2 border-foreground bg-primary text-primary-foreground'
              : 'border-2 border-transparent hover:bg-background'
          "
          :disabled="cell.disabled"
          :aria-pressed="model === cell.iso"
          @click="model = cell.iso"
        >
          {{ cell.date.getDate() }}
        </button>
        <span v-else aria-hidden="true" />
      </template>
    </div>
  </div>
</template>
