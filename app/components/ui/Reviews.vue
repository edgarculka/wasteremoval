<script setup lang="ts">
export interface ReviewItem {
  author: string;
  meta?: string;
  rating: number;
  quote: string;
}

interface Props {
  average: number;
  averageLabel: string;
  reviews: ReviewItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="flex flex-col items-center gap-3 text-center">
      <UiHeading :level="2" size="xl">{{ average.toFixed(1) }}</UiHeading>
      <UiRating :value="average" size="lg">{{ averageLabel }}</UiRating>
    </div>

    <div
      class="mt-9 flex w-full snap-x gap-3 overflow-x-auto overscroll-x-contain pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3"
    >
      <UiCard
        v-for="review in reviews"
        :key="`${review.author}-${review.meta ?? review.quote}`"
        class="w-72 shrink-0 snap-start md:w-auto md:shrink"
      >
        <article class="flex h-full flex-col gap-4">
          <UiRating :value="review.rating" />
          <UiText size="md" weight="medium"> "{{ review.quote }}" </UiText>
          <footer class="mt-auto">
            <UiText as="p" weight="bold">{{ review.author }}</UiText>
            <UiText v-if="review.meta" size="sm" tone="low">
              {{ review.meta }}
            </UiText>
          </footer>
        </article>
      </UiCard>
    </div>
  </div>
</template>
