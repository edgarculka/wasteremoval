<script setup lang="ts">
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
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

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border-2 border-foreground shadow-[0.25rem_0.25rem_0_0_var(--foreground)] hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground border-2 border-foreground shadow-[0.25rem_0.25rem_0_0_var(--foreground)] hover:bg-secondary/80",
  ghost:
    "bg-transparent border-2 border-transparent text-foreground hover:bg-secondary hover:border-2 hover:border-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-1.5 px-4 text-sm",
  md: "h-12 gap-2 px-5 text-sm",
  lg: "h-14 gap-2 px-7 text-base",
  icon: "h-10 w-10 text-base",
};

const classes = computed(
  () =>
    `inline-flex cursor-pointer items-center justify-center rounded-full font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${variantClasses[props.variant]} ${sizeClasses[props.size]}`,
);
</script>

<template>
  <a v-if="href && isExternalHref" :href="href" :class="classes">
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
