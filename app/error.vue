<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const title = computed(() =>
  props.error.statusCode === 404 ? "Page not found" : "Something went wrong",
);
const description = computed(() =>
  props.error.statusCode === 404
    ? "The page you requested could not be found."
    : "The site hit an unexpected error.",
);

useSeoMeta({
  title: () => `${title.value} | ${companyDetails.tradingName}`,
  description,
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="min-h-screen bg-background px-6 py-16 text-foreground">
    <section class="mx-auto flex max-w-3xl flex-col gap-6">
      <p class="text-sm font-bold uppercase tracking-wide text-accent">
        {{ error.statusCode }}
      </p>
      <h1 class="text-4xl font-bold leading-tight sm:text-5xl">
        {{ title }}
      </h1>
      <p class="max-w-xl text-lg text-current/70">
        {{ description }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="/"
          class="inline-flex rounded-md border border-transparent bg-accent px-5 py-3 font-bold text-accent-foreground"
        >
          Back to homepage
        </a>
        <a
          href="/services/"
          class="inline-flex rounded-md border border-border px-5 py-3 font-bold"
        >
          View services
        </a>
      </div>
    </section>
  </main>
</template>
