<script setup lang="ts">
import { toRef } from "vue";
import type { Component } from "vue";
import { SECTION_ALIGNMENT_KEY, type SectionAlignment } from "~/utils/section";

type SectionTone = "background" | "secondary" | "dark" | "primary";
type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
type IconAlignment = "left" | "center" | "right";

interface SectionImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  srcset?: string;
  sizes?: string;
}

export interface SectionRibbon {
  label: string;
  href?: string;
}

interface Props {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  title?: string;
  alignment?: SectionAlignment;
  image?: SectionImage;
  vertical?: boolean;
  ribbon?: SectionRibbon;
  wide?: boolean;
  icon?: Component;
  iconProps?: Record<string, unknown>;
  iconSrc?: string;
  iconAlt?: string;
  iconAlignment?: IconAlignment;
}

const props = withDefaults(defineProps<Props>(), {
  tone: "background",
  spacing: "md",
  alignment: "left",
  vertical: false,
  wide: false,
  iconAlignment: "left",
});

const iconAlignmentClasses: Record<IconAlignment, string> = {
  left: "me-auto",
  center: "mx-auto",
  right: "ms-auto",
};

provide(SECTION_ALIGNMENT_KEY, toRef(props, "alignment"));

const slots = useSlots();

const toneClasses: Record<SectionTone, string> = {
  background: "bg-background text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  dark: "bg-surface-dark text-background",
  primary: "bg-primary text-primary-foreground",
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-8 sm:py-10",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-24 lg:py-32",
  xl: "py-24 sm:py-32 lg:py-40",
};

const verticalAlignmentClasses: Record<SectionAlignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-left",
};

const sectionClasses = computed(
  () => `${toneClasses[props.tone]} ${spacingClasses[props.spacing]}`,
);

const hasVisual = computed(() => Boolean(props.image) || Boolean(slots.visual));

const isHorizontal = computed(
  () =>
    !props.vertical &&
    hasVisual.value &&
    (props.alignment === "left" || props.alignment === "right"),
);
</script>

<template>
  <section
    :class="[
      'relative',
      sectionClasses,
      '[--section-px:1.5rem] sm:[--section-px:2.5rem] lg:[--section-px:4rem] max-w-[100dvw]',
    ]"
  >
    <div class="px-(--section-px)">
      <div v-if="isHorizontal" class="mx-auto max-w-6xl">
        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div
            :class="[
              'flex flex-col items-start gap-4 text-left',
              alignment === 'right' ? 'lg:order-2' : 'lg:order-1',
            ]"
          >
            <div
              v-if="icon || iconSrc"
              class="bg-primary/20 rounded-full p-4 h-16 w-16"
              :class="['flex', iconAlignmentClasses[iconAlignment]]"
            >
              <span
                v-if="iconSrc"
                :role="iconAlt ? 'img' : undefined"
                :aria-label="iconAlt || undefined"
                :aria-hidden="iconAlt ? undefined : 'true'"
                :style="{ maskImage: `url(${iconSrc})` }"
                class="block h-full w-full bg-current mask-no-repeat mask-contain mask-center"
              />
              <component
                v-else
                :is="icon"
                v-bind="iconProps ?? {}"
                class="text-5xl"
              />
            </div>
            <div v-if="$slots.above">
              <slot name="above" />
            </div>
            <UiHeading v-if="title" :level="2" size="lg">
              {{ title }}
            </UiHeading>
            <slot />
            <div
              v-if="$slots.cta"
              class="flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:self-auto"
            >
              <slot name="cta" />
            </div>
          </div>
          <div :class="alignment === 'right' ? 'lg:order-1' : 'lg:order-2'">
            <div v-if="$slots.visual" class="w-full">
              <slot v-if="$slots.visual" name="visual" />
            </div>
            <div v-else-if="image" class="w-full">
              <img
                :src="image.src"
                :alt="image.alt ?? ''"
                :width="image.width"
                :height="image.height"
                :srcset="image.srcset"
                :sizes="image.sizes"
                loading="lazy"
                decoding="async"
                class="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        :class="[
          'mx-auto flex flex-col gap-6',
          wide ? 'max-w-6xl' : 'max-w-4xl',
          verticalAlignmentClasses[alignment],
        ]"
      >
        <div class="flex flex-col gap-4">
          <div
            v-if="icon || iconSrc"
            :class="[
              'flex text-5xl bg-primary/20 rounded-full p-4 h-16 w-16',
              iconAlignmentClasses[iconAlignment],
            ]"
          >
            <span
              v-if="iconSrc"
              :role="iconAlt ? 'img' : undefined"
              :aria-label="iconAlt || undefined"
              :aria-hidden="iconAlt ? undefined : 'true'"
              :style="{ maskImage: `url(${iconSrc})` }"
              class="block h-full w-full bg-current mask-no-repeat mask-contain mask-center"
            />
            <component
              v-else
              :is="icon"
              v-bind="iconProps ?? {}"
              class="text-5xl"
            />
          </div>
          <slot v-if="$slots.above" name="above" />
          <UiHeading v-if="title" :level="2" size="lg">
            {{ title }}
          </UiHeading>
        </div>
        <slot />
        <div v-if="$slots.visual" class="w-full">
          <slot v-if="$slots.visual" name="visual" />
        </div>
        <div v-else-if="image" class="aspect-video w-full">
          <img
            :src="image.src"
            :alt="image.alt ?? ''"
            :width="image.width"
            :height="image.height"
            :srcset="image.srcset"
            :sizes="image.sizes"
            loading="lazy"
            decoding="async"
            class="w-full h-full"
          />
        </div>
        <div
          v-if="$slots.cta"
          class="flex flex-col items-stretch gap-4 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:self-auto"
        >
          <slot name="cta" />
        </div>
      </div>
    </div>
    <div
      v-if="ribbon"
      variant="secondary"
      class="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-lg border border-t-0 border-border bg-secondary px-5 py-3 text-center text-sm shadow-[0_0.75rem_2rem_rgb(var(--shadow-color)/0.08)]"
    >
      <UiText size="xs" weight="bold" tone="low">
        {{ ribbon.label }}
      </UiText>
    </div>
  </section>
</template>
