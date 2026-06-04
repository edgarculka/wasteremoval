<script setup lang="ts">
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
});

const isExternalHref = computed(() =>
  props.href ? /^(https?:|mailto:|tel:)/.test(props.href) : false,
);

const linkRel = computed(() =>
  props.rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined),
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border border-foreground shadow-[0_0.35rem_1rem_rgb(var(--shadow-color)/0.14)] hover:-translate-y-0.5 hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground border border-border shadow-[0_0.35rem_1rem_rgb(var(--shadow-color)/0.08)] hover:-translate-y-0.5 hover:border-foreground",
  ghost:
    "bg-transparent border border-transparent text-foreground hover:bg-secondary hover:border-border",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-1.5 px-4 text-sm",
  md: "h-12 gap-2 px-5 text-sm",
  lg: "h-14 gap-2 px-7 text-base",
  icon: "h-10 w-10 text-base",
};

const classes = computed(
  () =>
    `inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full font-bold transition disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${variantClasses[props.variant]} ${sizeClasses[props.size]}`,
);
</script>

<template>
  <a
    v-if="href && isExternalHref"
    :href="href"
    :target="target"
    :rel="linkRel"
    :class="classes"
  >
    <slot name="iconLeft" />
    <slot />
    <slot name="iconRight" />
  </a>
  <NuxtLink v-else-if="href" :to="href" :class="classes">
    <slot name="iconLeft" />
    <slot />
    <slot name="iconRight" />
  </NuxtLink>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot name="iconLeft" />
    <slot />
    <slot name="iconRight" />
  </button>
</template>
