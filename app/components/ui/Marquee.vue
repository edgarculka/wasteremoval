<script setup lang="ts">
type MarqueeTone = "background" | "secondary" | "dark" | "primary";
type MarqueeSpeed = "slow" | "medium" | "fast";

interface Props {
  items: string[];
  tone?: MarqueeTone;
  speed?: MarqueeSpeed;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tone: "background",
  speed: "medium",
  ariaLabel: "Highlights",
});

const toneClasses: Record<MarqueeTone, string> = {
  background: "bg-background text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  dark: "bg-surface-dark text-background",
  primary: "bg-primary text-primary-foreground",
};

const speedDurations: Record<MarqueeSpeed, string> = {
  slow: "60s",
  medium: "30s",
  fast: "15s",
};

const sectionClasses = computed(
  () =>
    `overflow-hidden border-y-2 border-current/40 ${toneClasses[props.tone]}`,
);

const trackStyle = computed(() => ({
  animationDuration: speedDurations[props.speed],
}));
</script>

<template>
  <section :class="sectionClasses" :aria-label="ariaLabel">
    <div class="marquee-track flex" :style="trackStyle">
      <ul class="flex shrink-0">
        <li v-for="(item, i) in items" :key="i" class="border px-8 py-6">
          <UiText weight="bold" as="span" class="whitespace-nowrap" size="lg">
            {{ item }}
          </UiText>
        </li>
      </ul>
      <ul aria-hidden="true" class="flex shrink-0">
        <li
          v-for="(item, i) in items"
          :key="`dup-${i}`"
          class="border px-8 py-6"
        >
          <UiText weight="bold" as="span" class="whitespace-nowrap" size="lg">
            {{ item }}
          </UiText>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.marquee-track {
  animation-name: marquee;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: max-content;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
