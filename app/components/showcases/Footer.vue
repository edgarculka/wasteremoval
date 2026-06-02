<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Footer</UiHeading>
      <UiText tone="low" class="mt-3">
        Site-wide footer with a logo block, top-level navigation and grouped
        SEO service links.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiFooter
          :primary-links="[
            { label: 'Home', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Design System', href: '#' },
          ]"
          selected-location-label="London"
          :service-links="[
            { label: 'End of Tenancy Rubbish Removal', href: '#' },
            { label: 'House Clearance', href: '#' },
            { label: 'Garden Waste Removal', href: '#' },
          ]"
          :location-links="[
            { label: 'London', href: '#' },
            { label: 'Brentford', href: '#' },
            { label: 'Chiswick', href: '#' },
            { label: 'Ealing', href: '#' },
          ]"
        />
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Few links</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiFooter
          :primary-links="[{ label: 'Home', href: '#' }]"
          selected-location-label="Brentford"
          :service-links="[
            { label: 'House Clearance', href: '#' },
            { label: 'Garden Waste Removal', href: '#' },
          ]"
          :location-links="[
            { label: 'London', href: '#' },
            { label: 'Brentford', href: '#' },
          ]"
        />
      </div>
    </section>
  </div>
</template>
