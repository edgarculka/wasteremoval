<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Service process</UiHeading>
      <UiText tone="low" class="mt-3">
        Ordered process section for service-location pages. The component
        keeps numbered cards consistent while the page controls surrounding
        section tone.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default process</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiServiceProcess
            eyebrow="How it works"
            heading="Rubbish removal without skip hire delays"
            description="A simple collection flow for homes, landlords and businesses."
            :steps="serviceProcessSteps"
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Primary band</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="primary" spacing="md" alignment="center" wide>
          <UiServiceProcess
            heading="From quote to licensed disposal"
            :steps="serviceProcessSteps.slice(0, 3)"
          />
        </UiSection>
      </div>
    </section>
  </div>
</template>
