<script setup lang="ts">
export interface SkipComparisonColumn {
  id: string;
  title: string;
  label?: string;
  featured?: boolean;
}

export interface SkipComparisonFeature {
  label: string;
  values: Record<string, string | boolean>;
}

interface Props {
  lead?: string;
  accent: string;
  trailing?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  columns: SkipComparisonColumn[];
  features: SkipComparisonFeature[];
}

defineProps<Props>();

function valueLabel(value: string | boolean) {
  if (typeof value === "boolean") return value ? "Included" : "Not included";
  return value;
}

function featureValue(feature: SkipComparisonFeature, columnId: string) {
  return feature.values[columnId] ?? false;
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col items-start gap-5 lg:hidden">
      <UiHeading :level="2" size="xl">
        <template v-if="lead">{{ lead }}</template>
        <span class="block text-accent italic">{{ accent }}</span>
        <template v-if="trailing">
          <span class="block">{{ trailing }}</span>
        </template>
      </UiHeading>
      <UiText v-if="subhead" size="sm" tone="low" class="max-w-md">
        {{ subhead }}
      </UiText>
      <UiButton v-if="ctaLabel" :href="ctaHref" size="md">
        {{ ctaLabel }}
      </UiButton>
    </div>

    <div
      class="mt-8 overflow-x-auto pb-4 lg:mt-0 lg:overflow-visible lg:pb-0"
    >
      <div
        class="grid min-w-max gap-x-4 gap-y-0 [grid-template-columns:minmax(10rem,0.85fr)_repeat(var(--comparison-cols),minmax(10.5rem,1fr))] lg:min-w-0 lg:gap-x-6 lg:[grid-template-columns:minmax(12rem,0.85fr)_repeat(var(--comparison-cols),minmax(11rem,1fr))]"
        :style="{
          '--comparison-cols': columns.length,
        }"
      >
        <div
          class="hidden min-h-48 flex-col items-start justify-center gap-5 pb-6 lg:flex"
        >
          <div>
            <UiHeading :level="2" size="xl">
              <template v-if="lead">{{ lead }}</template>
              <span class="block text-accent italic">{{ accent }}</span>
              <template v-if="trailing">
                <span class="block">{{ trailing }}</span>
              </template>
            </UiHeading>
            <UiText v-if="subhead" size="sm" tone="low" class="mt-3 max-w-md">
              {{ subhead }}
            </UiText>
          </div>
          <UiButton v-if="ctaLabel" :href="ctaHref" size="md">
            {{ ctaLabel }}
          </UiButton>
        </div>

      <div
        v-for="column in columns"
        :key="`heading-${column.id}`"
        :class="[
          'flex min-h-48 flex-col items-center justify-center gap-3 rounded-t-2xl border-2 border-border bg-secondary p-6 text-center text-secondary-foreground',
          column.featured
            ? 'shadow-[0.35rem_0.35rem_0_0_var(--foreground)]'
            : '',
        ]"
      >
        <UiTag v-if="column.label" variant="accent">
          {{ column.label }}
        </UiTag>
        <UiHeading :level="3" size="md">{{ column.title }}</UiHeading>
      </div>

      <template v-for="(feature, featureIndex) in features" :key="feature.label">
        <UiText
          as="div"
          size="sm"
          weight="bold"
          class="flex min-h-14 items-center py-3"
        >
          {{ feature.label }}
        </UiText>
        <div
          v-for="column in columns"
          :key="`${feature.label}-${column.id}`"
          :class="[
            'grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-x-2 border-border bg-secondary px-5 py-3 text-secondary-foreground lg:flex lg:justify-center',
            featureIndex === features.length - 1
              ? 'rounded-b-2xl border-b-2'
              : 'border-b border-b-border/30',
            column.featured && featureIndex === features.length - 1
              ? 'shadow-[0.35rem_0.35rem_0_0_var(--foreground)]'
              : '',
          ]"
        >
          <UiText as="span" size="sm" weight="bold" class="lg:sr-only">
            {{ feature.label }}
          </UiText>
          <UiText
            v-if="typeof featureValue(feature, column.id) === 'string'"
            as="span"
            size="sm"
            weight="bold"
            class="text-right lg:text-center"
          >
            {{ featureValue(feature, column.id) }}
          </UiText>
          <span v-else class="flex justify-end lg:justify-center">
            <IconsTick
              v-if="featureValue(feature, column.id)"
              class="text-3xl leading-none text-accent"
              :aria-label="valueLabel(featureValue(feature, column.id))"
            />
            <IconsClose
              v-else
              class="text-2xl leading-none text-secondary-foreground"
              :aria-label="valueLabel(featureValue(feature, column.id))"
            />
          </span>
        </div>
      </template>
      </div>
    </div>
  </div>
</template>
