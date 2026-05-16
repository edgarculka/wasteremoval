<script setup lang="ts">
import type { ReviewItem } from "~/components/ui/Reviews.vue";

const reviews: ReviewItem[] = [
  {
    author: "Aisha Khan",
    meta: "House clearance",
    rating: 5,
    quote: "Booked in minutes, arrived on time, and left the place spotless.",
  },
  {
    author: "Tom Bradley",
    meta: "Sofa removal",
    rating: 5,
    quote: "Clear pricing, friendly crew, and no fuss getting a bulky sofa out.",
  },
  {
    author: "Maya Roberts",
    meta: "Garden waste",
    rating: 4.5,
    quote: "Fast collection and they swept up after loading everything.",
  },
  {
    author: "Daniel Green",
    meta: "Office clear-out",
    rating: 5,
    quote: "Professional from quote to pickup. Exactly what we needed.",
  },
  {
    author: "Nina Patel",
    meta: "Garage clearance",
    rating: 5,
    quote: "They handled years of clutter in one visit and kept me updated.",
  },
  {
    author: "George Wilson",
    meta: "Appliance removal",
    rating: 4.5,
    quote: "Simple, tidy, and much easier than hiring a skip.",
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Reviews</UiHeading>
      <UiText tone="low" class="mt-3">
        Content component for a review section. It shows a large average rating
        followed by six review cards. <code>UiReviews</code> is content - always
        wrap it in a <code>UiSection</code>. Use <code>wide</code> when the
        three-column grid needs the wider section measure.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default (background tone)</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiReviews
            :average="4.9"
            average-label="Average from 240+ customer reviews"
            :reviews="reviews"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The Section owns the surface. Review cards and typography keep using
        semantic tokens and current color.
      </UiText>
      <div class="mt-4 space-y-6">
        <div class="overflow-hidden rounded-md border border-border">
          <UiSection tone="secondary" spacing="md" alignment="center" wide>
            <UiReviews
              :average="4.8"
              average-label="Average customer rating"
              :reviews="reviews"
            />
          </UiSection>
        </div>
        <div class="overflow-hidden rounded-md border border-border">
          <UiSection tone="dark" spacing="md" alignment="center" wide>
            <UiReviews
              :average="4.9"
              average-label="Trusted by local homes and teams"
              :reviews="reviews"
            />
          </UiSection>
        </div>
      </div>
    </section>
  </div>
</template>
