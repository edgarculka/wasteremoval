<script setup lang="ts">
import type { Component } from "vue";

export type CardTone = "primary" | "secondary";
export type CardSize = "sm" | "md";
export type CardLayout = "row" | "option";

interface Props {
  title?: string;
  description?: string;
  price?: string;
  tag?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  href?: string;
  icon?: Component;
  iconLabel?: string;
  iconProps?: Record<string, unknown>;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  tone?: CardTone;
  size?: CardSize;
  layout?: CardLayout;
}

const props = withDefaults(defineProps<Props>(), {
  tone: "secondary",
  size: "md",
  layout: "row",
});

const emit = defineEmits<{ select: [] }>();

const isExternalHref = computed(() =>
  props.href ? /^(https?:|mailto:|tel:)/.test(props.href) : false,
);

const componentType = computed(() => {
  if (props.href) {
    return isExternalHref.value ? "a" : resolveComponent("NuxtLink");
  }
  if (props.selectable) return "button";
  return props.layout === "option" ? "article" : "div";
});

const componentAttrs = computed(() => {
  if (props.href) {
    return isExternalHref.value
      ? {
          href: props.disabled ? undefined : props.href,
          "aria-disabled": props.disabled || undefined,
          tabindex: props.disabled ? -1 : undefined,
        }
      : {
          to: props.disabled ? undefined : props.href,
          "aria-disabled": props.disabled || undefined,
          tabindex: props.disabled ? -1 : undefined,
        };
  }

  if (props.selectable) {
    return {
      type: "button",
      disabled: props.disabled,
      "aria-pressed": props.selected,
    };
  }

  return {};
});

const toneClasses: Record<CardTone, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

const sizeClasses: Record<CardSize, string> = {
  sm: "p-4",
  md: "p-5",
};

const cardClasses = computed(() => [
  "relative block w-full rounded-lg border text-left shadow-[0_0.75rem_2rem_rgb(var(--shadow-color)/0.08)] transition disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  sizeClasses[props.size],
  props.selected
    ? "border-foreground bg-primary text-primary-foreground shadow-[0_0.75rem_2rem_rgb(var(--shadow-color)/0.16)]"
    : `${toneClasses[props.tone]} border-border`,
  props.selectable || props.href ? "cursor-pointer" : "",
  props.selectable || props.href
    ? props.tone === "primary"
      ? "hover:-translate-y-0.5 hover:bg-primary/90"
      : "hover:-translate-y-0.5 hover:border-foreground"
    : "",
]);

const hasBuiltInContent = computed(
  () =>
    props.icon ||
    props.imageSrc ||
    props.title ||
    props.description ||
    props.price,
);

function handleClick() {
  if (!props.selectable || props.disabled) return;
  emit("select");
}
</script>

<template>
  <div class="relative min-w-38">
    <UiTag
      v-if="tag"
      variant="accent"
      class="absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap"
    >
      {{ tag }}
    </UiTag>
    <component
      :is="componentType"
      v-bind="componentAttrs"
      :class="cardClasses"
      @click="handleClick"
    >
      <div
        v-if="hasBuiltInContent && layout === 'option'"
        class="flex flex-col items-center gap-2 text-center"
      >
        <UiText v-if="title" as="span" size="sm" weight="semibold">
          {{ title }}
        </UiText>
        <div
          v-if="imageSrc || icon || description"
          class="flex flex-col items-center gap-2"
        >
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt ?? ''"
            :width="imageWidth"
            :height="imageHeight"
            loading="lazy"
            decoding="async"
            class="h-12 w-auto"
          />
          <span
            v-else-if="icon"
            class="text-6xl leading-none"
            :aria-label="iconLabel"
            :aria-hidden="iconLabel ? undefined : true"
          >
            <component :is="icon" v-bind="iconProps ?? {}" />
          </span>
          <UiText
            v-if="description"
            as="span"
            size="sm"
            weight="medium"
            tone="low"
          >
            {{ description }}
          </UiText>
        </div>
        <UiHeading v-if="price" :level="3" size="lg">{{ price }}</UiHeading>
      </div>

      <div v-else-if="hasBuiltInContent" class="flex items-start gap-4">
        <span
          v-if="icon"
          class="mt-0.5 shrink-0 text-2xl leading-none"
          :aria-label="iconLabel"
          :aria-hidden="iconLabel ? undefined : true"
        >
          <component :is="icon" v-bind="iconProps ?? {}" />
        </span>
        <span class="min-w-0 flex-1">
          <UiText v-if="title" as="span" weight="bold" class="block">
            {{ title }}
          </UiText>
          <UiText
            v-if="description"
            as="span"
            size="sm"
            tone="low"
            class="block"
          >
            {{ description }}
          </UiText>
        </span>
      </div>

      <slot v-else />

      <span
        v-if="selected"
        aria-hidden="true"
        class="absolute right-3 top-3 text-xl leading-none"
      >
        <IconsTick />
      </span>
    </component>
  </div>
</template>
