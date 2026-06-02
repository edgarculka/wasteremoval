<script setup lang="ts">
import IconsChair from "~/components/icons/Chair.vue";
import IconsClose from "~/components/icons/Close.vue";
import IconsExpand from "~/components/icons/Expand.vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsMinimize from "~/components/icons/Minimize.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsSpinner from "~/components/icons/Spinner.vue";
import IconsStar from "~/components/icons/Star.vue";
import IconsTick from "~/components/icons/Tick.vue";
import IconsVan from "~/components/icons/Van.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import IconsAfternoon from "~/components/icons/Afternoon.vue";
import IconsEvening from "~/components/icons/Evening.vue";
import IconsMorning from "~/components/icons/Morning.vue";

const icons = [
  {
    name: "IconsClose",
    importPath: "Auto-imported as <IconsClose />",
    component: IconsClose,
  },
  {
    name: "IconsExpand",
    importPath: "Auto-imported as <IconsExpand />",
    component: IconsExpand,
  },
  {
    name: "IconsMail",
    importPath: "Auto-imported as <IconsMail />",
    component: IconsMail,
  },
  {
    name: "IconsMorning",
    importPath: "Auto-imported as <IconsMorning />",
    component: IconsMorning,
  },
  {
    name: "IconsAfternoon",
    importPath: "Auto-imported as <IconsAfternoon />",
    component: IconsAfternoon,
  },
  {
    name: "IconsEvening",
    importPath: "Auto-imported as <IconsEvening />",
    component: IconsEvening,
  },
  {
    name: "IconsMinimize",
    importPath: "Auto-imported as <IconsMinimize />",
    component: IconsMinimize,
  },
  {
    name: "IconsPhone",
    importPath: "Auto-imported as <IconsPhone />",
    component: IconsPhone,
  },
  {
    name: "IconsSpinner",
    importPath: "Auto-imported as <IconsSpinner />",
    component: IconsSpinner,
  },
  {
    name: "IconsStar",
    importPath: "Auto-imported as <IconsStar />",
    component: IconsStar,
  },
  {
    name: "IconsTick",
    importPath: "Auto-imported as <IconsTick />",
    component: IconsTick,
  },
  {
    name: "IconsWhatsApp",
    importPath: "Auto-imported as <IconsWhatsApp />",
    component: IconsWhatsApp,
  },
];
</script>

<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Icons</UiHeading>
      <UiText tone="low" class="mt-3">
        SVG icons sized in <code>1em</code> using <code>currentColor</code>.
        They inherit the parent's text size and color — drop them inside a
        button or text and they "just fit."
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Available icons</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Every icon currently shipping in
        <code>app/components/icons/</code>. Add a new one by dropping a
        <code>.vue</code> file there and registering it in this list.
      </UiText>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="icon in icons"
          :key="icon.name"
          class="rounded-xl border border-border p-4"
        >
          <div class="flex h-12 items-center text-2xl text-foreground">
            <component :is="icon.component" />
          </div>
          <UiText size="sm" weight="medium" class="mt-3">
            {{ icon.name }}
          </UiText>
          <UiText size="xs" tone="low" class="mt-1">
            {{ icon.importPath }}
          </UiText>
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Star variants</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        <code>IconsStar</code> accepts a <code>variant</code> prop:
        <code>filled</code> (default, single color), <code>outline</code> (line
        color via <code>currentColor</code>, inside fill from
        <code>--color-secondary</code>), and <code>half</code> for half-filled
        stars used by ratings.
      </UiText>
      <div class="mt-4 flex items-center gap-6 text-3xl text-primary">
        <IconsStar variant="filled" />
        <IconsStar variant="half" />
        <IconsStar variant="outline" />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Sizing demo</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        Icons inherit the parent's <code>font-size</code> via <code>1em</code>.
        Wrap in a sized text container to control them.
      </UiText>
      <div class="mt-4 flex items-center gap-6 text-foreground">
        <span class="text-sm"><IconsExpand /></span>
        <span class="text-base"><IconsExpand /></span>
        <span class="text-xl"><IconsExpand /></span>
        <span class="text-3xl"><IconsExpand /></span>
      </div>
    </section>
  </div>
</template>
