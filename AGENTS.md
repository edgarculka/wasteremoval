<!-- BEGIN:images -->
# Images: fetch from Pexels, never inline placeholders

When a feature, page, or showcase needs a real image, fetch it from Pexels using the project's existing key — never reach for an external placeholder URL or inline an SVG stand-in.

How:

1. The API key lives in [.env](.env) (gitignored) under `PEXELS_API_KEY`. There's a [.env.example](.env.example) for documentation.
2. Use the helper script: `npm run fetch-image -- "<search query>" <output-name> [orientation]`. Orientation defaults to `landscape`; `portrait` and `square` also work.
3. The script saves the photo to [public/images/](public/images/) as `<output-name>.<ext>`. Reference it as `/images/<output-name>.<ext>` in components.
4. The script logs photographer + alt text from Pexels — use the suggested alt text on the `<img>`.

Example: `npm run fetch-image -- "moving boxes home" section-demo` → `/images/section-demo.jpeg` (already in the repo, used by the Section showcase).

Don't commit the API key. Don't hardcode it in scripts. Don't print it to logs.

<!-- END:images -->

<!-- BEGIN:nuxt-agent-rules -->
# This is Nuxt 4

This project uses Nuxt 4 (`app/` directory layout, Vue 3 Composition API, `<script setup>`). APIs and conventions may differ from your training data — when in doubt, check the Nuxt docs at <https://nuxt.com/docs/4.x> rather than guessing.

Key conventions in this codebase:

- **Auto-imports.** Components in `app/components/<dir>/` auto-import as `<DirName>` prefixed: `app/components/ui/Button.vue` → `<UiButton>`, `app/components/icons/Expand.vue` → `<IconsExpand>`, `app/components/ds/FullscreenToggle.vue` → `<DsFullscreenToggle>`, `app/components/showcases/Buttons.vue` → `<ShowcasesButtons>`. Don't import these manually unless you specifically need to (e.g. `<component :is>` lookups).
- **Composables and utils** in `app/composables/` and `app/utils/` are auto-imported by name. Types are not — import types explicitly with `import type { ... } from "~/utils/..."`.
- **Routing.** File-based, under `app/pages/`. Dynamic segments use `[param].vue` (e.g. `[serviceSlug]/[locationSlug].vue`). Layouts live in `app/layouts/`; opt a page into a non-default layout via `definePageMeta({ layout: "name" })`.
- **Static generation.** Build with `npm run generate` (`nuxi generate`). Prerender entry points are in `nuxt.config.ts` `nitro.prerender.routes`; everything else is reached via `crawlLinks`. Adding a route that isn't reachable from `/` or `/design-system` requires adding it to that list.
<!-- END:nuxt-agent-rules -->

# Component styling: use brand tokens, not raw Tailwind colors

Reusable components MUST style brand-meaningful surfaces (button fills, badges, callouts, links, default borders, focus rings) using the semantic tokens declared in [app/assets/css/main.css](app/assets/css/main.css):

- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `text-foreground` / `bg-background`
- `border-border`

Rules:

1. **No raw palette classes for brand styling** inside components — `bg-zinc-900`, `text-blue-500`, `border-zinc-300` etc. are forbidden when the property carries brand meaning. A theme change must be one variable edit, not a project-wide find-and-replace.
2. **Hover/active states use opacity modifiers on the same token** (`hover:bg-primary/90`, `hover:bg-secondary/80`). Don't introduce a second shade unless the design genuinely requires one.
3. **Disabled state is opacity, not a separate color**: `disabled:opacity-50 disabled:pointer-events-none`. One token set covers every variant.
4. **Missing a token? Add it.** Define the raw value in `:root`, expose it under `@theme inline` as `--color-<name>` in [app/assets/css/main.css](app/assets/css/main.css), then use the generated utility (`bg-<name>`, `text-<name>`, etc.) in the component. Don't inline a hex/palette class as a stopgap.
5. **Neutral utilities for non-brand concerns are fine** — sizing, spacing, typography scale, transitions, layout. Zinc/gray utilities are acceptable for purely structural chrome where no brand meaning attaches; when in doubt, prefer a token.

Reference implementation: [app/components/ui/Button.vue](app/components/ui/Button.vue).

# Components are dumb: opinionated styles, data via props

Reusable components in [app/components/](app/components/) are DOM components — they own the markup and the styling. They are deliberately rigid about how things look and lay out, and deliberately empty of business logic.

Rules:

1. **The component owns the DOM tree and the classes.** Consumers cannot restyle internals. Don't accept a `class` override that pierces the inside; if a variation is needed, expose a `variant` or `size` prop.
2. **Data flows in via props.** Lists of items, labels, hrefs, headings, group structures — pass them in. The component never reaches into app state, fetches data, calls routers, or hard-codes project-specific content.
3. **Composable regions use slots.** When a region must be consumer-controlled (a card body, a modal footer, a hero's CTA row), expose a named slot (`<slot name="actions" />`) or the default slot, not configurable internal markup.
4. **Behavior stays minimal.** Loading, error states, navigation logic, data fetching — that's the page's job. A component renders what it's given.
5. **Components dictate their own styles — no glue between them.** When pages or layouts stack components vertically, never add a border, divider, ring, or separator between two stacked components from the outside. Each component is responsible for its own visual edge. If you find yourself reaching for `border-t`, `border-b`, or a wrapping `<hr>` between a Header and a Hero, or between a Hero and a Marquee, stop — change the component's own background/spacing instead, or build a new component that owns the divider. The default expectation is that two components placed next to each other look right by virtue of their own design, not an externally-added line.
6. **Reference implementations:**
   - [app/components/ui/Button.vue](app/components/ui/Button.vue) — `variant`, `size`, optional `href` (renders `<NuxtLink>` instead of `<button>` when provided). No logic.
   - [app/components/ui/Sidebar.vue](app/components/ui/Sidebar.vue) — accepts `title`, `groups: SidebarGroup[]`, `ariaLabel`. The shape of `SidebarGroup` (heading + links) is the entire API.

# Atomic design: atoms are sealed, molecules compose them

This project follows atomic design. The hierarchy:

- **Atoms** — single-purpose primitives that own their visual identity. SVG icons in [app/components/icons/](app/components/icons/) and the primitive layer of [app/components/ui/](app/components/ui/) (`UiButton`, `UiHeading`, `UiText`, `UiLink`).
- **Molecules / organisms** — compositions of atoms. Also in [app/components/ui/](app/components/ui/) (`UiRating`, `UiSidebar`, `UiHero`, `UiFooter`, `UiSection`).
- **Pages** — feature code under [app/pages/](app/pages/) composes organisms.

Rules:

1. **Atoms are sealed.** Don't override an atom's internal visual identity from a parent component. For icons specifically, that means: never pass `fill-*`, `stroke-*`, or `stroke-width-*` utility classes to an `<Icons*>` element. Color flows in via `currentColor` (set `text-*` on the icon or its wrapper); state changes (filled vs outline, etc.) must be exposed as a prop on the atom.
2. **Need a variant? Add a prop to the atom, not a class override on the consumer.** Example: `<IconsStar variant="outline" />` for the outline state — not `<IconsStar class="fill-none" />`. The atom controls its internals; consumers ask for the variant they want. Reference: [app/components/icons/Star.vue](app/components/icons/Star.vue) exposes `variant: "filled" | "outline" | "half"`, and [app/components/ui/Rating.vue](app/components/ui/Rating.vue) consumes it without any class overrides.
3. **Molecules compose atoms with props and slots, never with class injection.** A molecule's job is to arrange atoms and pass data into them. If a molecule wants to "tweak" how an atom looks, that's a sign the atom needs a new prop — add it there.

Why this matters: a designer must be able to change an atom's stroke width, default fill, or token mapping in one file and trust no consumer is silently overriding it. The moment a parent reaches in with utility classes, that guarantee dies.

# Use design system components everywhere

Pages and feature code MUST consume components from [app/components/ui/](app/components/ui/) and icons from [app/components/icons/](app/components/icons/). Do not write ad-hoc styled markup that duplicates a component's job.

Rules:

1. **Buttons and button-shaped links → `<UiButton>`.** Including icon-only triggers, fullscreen toggles, and CTAs. `UiButton` accepts an optional `href` and renders a `<NuxtLink>` when provided, so the same component covers both `<button>` and navigation cases. Don't hand-roll an `<a>` or `<button>` with button-like Tailwind classes.
2. **Typography → typography components, never raw `<p>`/`<h*>`/`<a>` with utility classes.** This is the heart of the system:
   - Headings → `<UiHeading :level="n" :size="..." :tone="..." />` (single weight, sizes `xs`/`sm`/`md`/`lg`/`xl`, tones `high`/`low`).
   - Body text → `<UiText :size="..." :weight="..." :tone="..." />` (sizes `xs`/`sm`/`md`/`lg`, weights `regular`/`medium`/`semibold`/`bold`, tones `high`/`low`/`primary`).
   - Inline text links → `<UiLink :href="..." :treatment="..." />` (treatments `default`/`subtle`/`muted`).
   - Button labels are encapsulated in `<UiButton>` — don't try to recreate that style elsewhere.
   - Single source of truth for every text style is [app/pages/design-system/typography.vue](app/pages/design-system/typography.vue).
3. **Layout / structural components → the named component.** Section → `<UiSection>` (every full-width on-page strip). Hero → `<UiHero>` (always wrapped in a Section). Footer → `<UiFooter>`. Sidebar → `<UiSidebar>`. Pass content in as props.

   - `<UiSection>` owns background tone (`background` / `secondary` / `dark` / `primary`), vertical spacing (`none` / `sm` / `md` / `lg` / `xl`), `alignment` (`left` / `center` / `right`), `wide` (default `false`; switch on for content like a 5-column pricing grid that needs `max-w-6xl` instead of the default `max-w-4xl` on the vertical layout), an optional `title` string, an optional `image: { src, alt }`, an optional `ribbon: { label, href? }` (renders a `<UiButton variant="secondary">` straddling the top edge of the section, overhanging into whatever sits above — a transition CTA that pulls the eye between sections), and a `cta` slot for action buttons. Body content goes in the default slot. Sections never set their own horizontal padding — content inside does.
   - **Typography colors cascade from Section.** Section sets `text-foreground` (or `text-background` on `dark` tone) at its root; `<UiHeading>` and `<UiText>` inherit via `currentColor`. Their `tone` prop applies opacity to the inherited color (`text-current/60`, `text-current/70`) for muted variants — never hardcode `text-foreground` inside a typography component.
   - **Alignment positions content; `center` also centers text.** With an image present: `left` → text on the left, image on the right (2-col, text reads left-to-right); `right` → image on the left, text on the right (2-col, text still reads left-to-right); `center` → vertical stack with the image rendered above the CTA, and text is centered. Without an image, alignment positions the content block (`items-start` / `items-center` / `items-end`); `center` also applies `text-center`, while `left` and `right` keep text reading left-to-right.
   - **Section's alignment cascades to nested `<UiHero>` automatically** via Vue `provide`/`inject` (key in [app/utils/section.ts](app/utils/section.ts)). The page sets `alignment` on the Section once; Hero picks it up. Don't pass alignment to Hero a second time.
   - **Full-bleed escape hatch.** Section publishes its horizontal padding as the CSS variable `--section-px` (responsive: `1.5rem` / `2.5rem` / `4rem` matching `px-6` / `sm:px-10` / `lg:px-16`). Content that needs to bleed to the viewport edges (e.g. a horizontally-scrollable card row inside `<UiPricing>`) uses `mx-[calc(50%-50vw)]` to escape both Section's padding AND its `max-w-*` constraint, then reapplies the inset with `px-(--section-px)` so first/last items still line up with the heading column above. This way Section keeps its spacing for normal content but doesn't trap scrollable strips.
   - **Section-content components don't render `<section>` themselves.** `<UiHero>` and `<UiPricing>` (and any future "page strip" component with a heading + body + CTA) are CONTENT — they go inside `<UiSection>`. The Section owns tone, spacing, alignment, max-width (`wide`), and the optional `ribbon`; the content component owns its internal layout and data, never the section chrome (no `<section>` element, no `bg-*` tone, no `py-*` vertical padding, no `aria-label="..."` on a section). Pages always render `<UiSection><UiHero/></UiSection>` or `<UiSection wide alignment="center" :ribbon="..."><UiPricing .../></UiSection>`. (Marquee is the exception — it's a self-contained animated strip with its own `<section>` and tone, not a heading+body content component.)
4. **Icons → `<IconsName>` from [app/components/icons/](app/components/icons/).** SVGs sized in `1em`, using `currentColor`. Never inline raw `<svg>` markup in pages or other feature code.
5. **Missing the right component or typography variant? Build one.** Add it to [app/components/ui/](app/components/ui/) (or [app/components/icons/](app/components/icons/) for SVGs), give it a tight props-driven API per the dumb-component rule, then consume it. Do not "just use a div with classes" as a stopgap.
6. **Component internals are exempt from the wrapper rule, not from the typography rule.** A `<UiHero>` may render its own `<section>`, `<div>` layout, but its heading/description text is still composed from `<UiHeading>` and `<UiText>` so the typography system stays canonical.
7. **External `class` attribute is acceptable for layout/spacing only.** `<UiText class="mt-3 max-w-2xl">` is fine — it doesn't override internal styling. But never reach for `class` to change typographic treatment (size, weight, color); use the props.

# Fluid sizing: rem everywhere, the root scales with viewport

The root `<html>` font-size is set with a viewport-width `clamp()` in [app/assets/css/main.css](app/assets/css/main.css). The entire UI scales with screen width — but only if every size is expressed in `rem`.

Rules:

1. **All sizes are rem (or rem-derived).** Tailwind utilities — `text-*`, `p-*`, `m-*`, `w-*`, `h-*`, `gap-*`, `space-*` — are rem-based by default. Custom CSS sizes go in `rem`.
2. **No `px` for typography or layout.** Hard-coded pixel font-sizes, paddings, margins, widths, or heights in style attributes or custom CSS will not scale and break the system.
3. **Acceptable px exceptions:** hairline borders (`1px`), image intrinsic dimensions, and the `clamp()` bounds in `main.css` itself. Tailwind breakpoints (`sm:`, `md:`, `lg:`) are also fine — they target physical viewport width, not document scale.
4. **Don't override `html { font-size }` elsewhere.** Changing it cascades through every rem in the app.

# Every component must be documented in the design system

When you add a component to [app/components/ui/](app/components/ui/) or [app/components/icons/](app/components/icons/), you MUST also document it in the design system. Undocumented components are invisible to other agents and contributors, and tend to get re-implemented from scratch.

For each new component, four files must exist or be updated:

1. **Showcase** — add [app/components/showcases/](app/components/showcases/)`<Name>.vue` exporting the showcase template (auto-imported as `<Showcases<Name>>`). Cover every prop, variant, size, and slot combination.
2. **Sidebar page** — add [app/pages/design-system/](app/pages/design-system/)`<name>.vue` that renders the showcase with the fullscreen toggle in the top-right corner. Use [app/pages/design-system/buttons.vue](app/pages/design-system/buttons.vue) as a template.
3. **Fullscreen map** — register the slug in the `showcases` map at [app/pages/design-system/fullscreen/[component].vue](app/pages/design-system/fullscreen/[component].vue).
4. **Sidebar nav** — add the entry to the `groups` array in [app/layouts/design-system.vue](app/layouts/design-system.vue) under the appropriate group (`Foundations`, `Layouts`, or `Components`), alphabetical by label.

A change that adds a UI component without these four updates is incomplete.
