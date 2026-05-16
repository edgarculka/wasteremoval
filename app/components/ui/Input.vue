<script setup lang="ts">
const model = defineModel<string>({ default: "" });

interface Props {
  type?: "text" | "tel" | "email" | "url" | "search" | "password" | "number";
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  id?: string;
  transform?: "normal" | "uppercase";
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  transform: "normal",
});

const transformClasses: Record<NonNullable<Props["transform"]>, string> = {
  normal: "",
  uppercase: "uppercase",
};
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :required="required"
    :id="id"
    :class="[
      'h-12 w-full rounded-lg border-2 border-foreground bg-secondary px-4 text-secondary-foreground placeholder:text-current/50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none',
      transformClasses[props.transform],
    ]"
  />
</template>
