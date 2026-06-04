<script setup lang="ts">
const tones = ["background", "secondary", "dark", "primary"] as const;
const spacings = ["none", "sm", "md", "lg", "xl"] as const;
const alignments = ["left", "center", "right"] as const;
const iconAlignments = ["left", "center", "right"] as const;

const placeholderImage = {
  src: "/images/section-demo.jpeg",
  alt: "Young woman carrying stacked moving boxes through a doorway",
};
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Section</UiHeading>
      <UiText tone="low" class="mt-3">
        Wraps full-width page sections. Owns background tone, vertical spacing,
        an optional title / image / body / call-to-action layout, and alignment
        that flips the layout when an image is provided.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Tones</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Each tone maps to a brand surface token: <code>background</code> (page
        yellow), <code>secondary</code> (white), <code>dark</code> (deep green),
        <code>primary</code> (lime).
      </UiText>

      <div class="mt-4 space-y-4">
        <div
          v-for="tone in tones"
          :key="tone"
          class="overflow-hidden rounded-md border border-border"
        >
          <UiSection :tone="tone" spacing="sm">
            <UiText weight="medium">tone="{{ tone }}"</UiText>
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Spacing</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Vertical padding scale. Use <code>none</code> when stacking adjacent
        sections that should share continuous space.
      </UiText>

      <div class="mt-4 space-y-4">
        <div
          v-for="spacing in spacings"
          :key="spacing"
          class="overflow-hidden rounded-md border border-border"
        >
          <UiSection tone="secondary" :spacing="spacing">
            <UiText weight="medium">spacing="{{ spacing }}"</UiText>
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Alignment without image</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Without an image, alignment positions the content block.
        <code>right</code> places the block on the right but text inside still
        reads left-to-right — it's a position prop, not a text-direction prop.
      </UiText>

      <div class="mt-4 space-y-4">
        <div
          v-for="alignment in alignments"
          :key="alignment"
          class="overflow-hidden rounded-md border border-border"
        >
          <UiSection
            tone="background"
            spacing="sm"
            :alignment="alignment"
            :title="`Alignment: ${alignment}`"
          >
            <UiText tone="low" class="max-w-xl">
              Body content sits with the title and CTA according to the
              alignment prop.
            </UiText>
            <template #cta>
              <UiButton>Primary</UiButton>
              <UiButton variant="secondary">Secondary</UiButton>
            </template>
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Alignment with image</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        When an image is provided, alignment flips the layout:
        <code>left</code> puts text on the left and image on the right;
        <code>right</code> reverses (image on the left, text on the right with
        LTR reading); <code>center</code> stacks vertically with the image
        rendered just above the call-to-action.
      </UiText>

      <div class="mt-4 space-y-4">
        <div class="overflow-hidden rounded-md border border-border">
          <UiSection
            tone="secondary"
            spacing="md"
            alignment="left"
            title="Left alignment"
            :image="placeholderImage"
          >
            <UiText tone="low">
              Text on the left, image on the right. Default reading direction.
            </UiText>
            <template #cta>
              <UiButton>Get a quote</UiButton>
              <UiButton variant="secondary">View services</UiButton>
            </template>
          </UiSection>
        </div>

        <div class="overflow-hidden rounded-md border border-border">
          <UiSection
            tone="secondary"
            spacing="md"
            alignment="right"
            title="Right alignment"
            :image="placeholderImage"
          >
            <UiText tone="low">
              Image on the left, text on the right. Text inside still reads
              left-to-right.
            </UiText>
            <template #cta>
              <UiButton>Get a quote</UiButton>
              <UiButton variant="secondary">View services</UiButton>
            </template>
          </UiSection>
        </div>

        <div class="overflow-hidden rounded-md border border-border">
          <UiSection
            tone="secondary"
            spacing="md"
            alignment="center"
            title="Centred alignment"
            :image="placeholderImage"
          >
            <UiText tone="low" class="max-w-xl">
              Single-column stack: title, body, image, then call-to-action. The
              image renders above the CTA so the buttons close the section.
            </UiText>
            <template #cta>
              <UiButton>Get a quote</UiButton>
              <UiButton variant="secondary">View services</UiButton>
            </template>
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Title and CTA only</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Minimal closing CTA strip — just a heading with action buttons.
      </UiText>

      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection
          tone="dark"
          spacing="md"
          alignment="center"
          title="Ready to clear out?"
        >
          <template #cta>
            <UiButton>Get a quote</UiButton>
            <UiButton variant="secondary">See pricing</UiButton>
          </template>
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Icon above title</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Render a symbol above the title — either an SVG via the
        <code>icon</code> prop (with optional <code>iconProps</code>) or a
        raster image via <code>iconSrc</code> + <code>iconAlt</code>. Position
        with <code>iconAlignment</code> — <code>left</code> (default),
        <code>center</code>, or <code>right</code>. The position is independent
        of the section's content alignment.
      </UiText>

      <div class="mt-4 space-y-4">
        <div
          v-for="iconAlignment in iconAlignments"
          :key="iconAlignment"
          class="overflow-hidden rounded-md border border-border"
        >
          <UiSection
            tone="background"
            spacing="sm"
            alignment="center"
            :title="`iconAlignment: ${iconAlignment}`"
          >
            <UiText tone="low" class="max-w-xl">
              The icon sits above the title. Its horizontal position is
              controlled by <code>iconAlignment</code>.
            </UiText>
          </UiSection>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Ribbon</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Pass a <code>ribbon</code> prop (<code>{ label, href? }</code>) to
        attach a button-shaped ribbon that straddles the top edge of the
        section, overhanging into whatever sits above. Useful as a transition
        CTA. The showcase wrapper below uses extra top padding so the overhang
        stays visible inside the demo card.
      </UiText>

      <div class="mt-4 pt-8">
        <div class="overflow-visible rounded-md border border-border">
          <UiSection
            tone="background"
            spacing="md"
            alignment="center"
            title="Clear pricing before loading"
            :ribbon="{ label: 'See our pricing' }"
          >
            <UiText size="lg" tone="low">
              Published load tiers help customers understand the likely cost
              before the crew confirms the final price.
            </UiText>
          </UiSection>
        </div>
      </div>
    </section>
  </div>
</template>
