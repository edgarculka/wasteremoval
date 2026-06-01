<script setup lang="ts">
import type { Component } from "vue";
import type { BookingLoad } from "~/utils/booking-form";

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
        :level="2"
        size="xl"
        class="flex flex-wrap justify-center gap-2"
      >
        <template v-if="lead">{{ lead }} </template>
        <span class="text-accent">{{ accent }}</span>
        <template v-if="trailing">
          <span class="italic"> {{ trailing }}</span>
        </template>
      </UiHeading>
      <UiText v-if="subhead" size="lg" tone="low" class="mt-4 italic">
        {{ subhead }}
      </UiText>
    </div>
    <div
      class="mt-9 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      <UiCard
        v-for="tier in tiers"
        :key="tier.id"
        :selectable="selectable"
        layout="option"
        :selected="selectedTierId === tier.id"
        :title="tier.name"
        :description="tier.ribbon"
        :price="tier.price"
        :tag="tier.tag"
        :icon="tier.icon"
        :icon-props="tier.iconProps"
        :image-src="tier.imageSrc"
        :image-alt="tier.imageAlt"
        @select="emit('select', tier.id)"
      />
    </div>
  </div>
</template>
