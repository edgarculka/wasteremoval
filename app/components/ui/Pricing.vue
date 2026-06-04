<script setup lang="ts">
import type { Component } from "vue";
import type { BookingLoad } from "~/utils/booking-form";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface PricingTier extends BookingLoad {
  tag?: string;
  icon?: Component;
  iconProps?: Record<string, unknown>;
}

interface Props {
  lead?: string;
  accent: string;
  trailing?: string;
  subhead?: string;
  tiers: PricingTier[];
  headingLevel?: HeadingLevel;
  selectable?: boolean;
  selectedTierId?: string | null;
}

defineProps<Props>();

const emit = defineEmits<{
  select: [id: string];
}>();
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="max-w-3xl">
      <UiHeading
        :level="headingLevel ?? 2"
        size="xl"
        class="flex flex-wrap justify-center gap-2"
      >
        <span v-if="lead">{{ lead }}</span>
        {{ " " }}
        <span class="text-accent">{{ accent }}</span>
        <template v-if="trailing"> {{ " " }}<span class="italic">{{ trailing }}</span> </template>
      </UiHeading>
      <UiText v-if="subhead" size="lg" tone="low" class="mt-4 italic">
        {{ subhead }}
      </UiText>
    </div>
    <div
      class="mx-[calc(50%-50vw)] mt-7 flex w-screen snap-x gap-3 overflow-x-auto overscroll-x-contain px-(--section-px) pt-2 pb-8 [scroll-padding-inline:var(--section-px)] sm:mx-0 sm:mt-9 sm:grid sm:w-full sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0 lg:grid-cols-5"
    >
      <UiCard
        v-for="tier in tiers"
        :key="tier.id"
        class="w-48 shrink-0 snap-start sm:w-auto sm:shrink"
        :selectable="selectable"
        layout="option"
        :selected="selectedTierId === tier.id"
        :title="tier.name"
        :description="tier.ribbon"
        :detail="tier.weightLimit"
        :price="tier.price"
        :tag="tier.tag"
        :icon="tier.icon"
        :icon-props="tier.iconProps"
        :image-src="tier.imageSrc"
        :image-alt="tier.imageAlt"
        :image-width="tier.imageWidth"
        :image-height="tier.imageHeight"
        @select="emit('select', tier.id)"
      />
    </div>
  </div>
</template>
