<template>
  <div class="space-y-10">
    <header>
      <UiHeading size="lg">Thank you</UiHeading>
      <UiText tone="low" class="mt-3">
        Booking confirmation content for the post-submit page.
        <code>UiThankYou</code> is content and should be wrapped in
        <code>UiSection</code> so the page controls tone, spacing, and width.
      </UiText>
    </header>

    <section>
      <UiHeading :level="2" size="sm">Default confirmation</UiHeading>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="background" spacing="md" alignment="center" wide>
          <UiThankYou
            heading="Thanks, your booking is confirmed."
            description="DBS Waste has received your details. The team will confirm the collection information shortly."
          />
        </UiSection>
      </div>
    </section>

    <section>
      <UiHeading :level="2" size="sm">Short message</UiHeading>
      <UiText size="sm" tone="low" class="mt-2">
        The component only renders the primary confirmation card.
      </UiText>
      <div class="mt-4 overflow-hidden rounded-md border border-border">
        <UiSection tone="secondary" spacing="md" alignment="center" wide>
          <UiThankYou
            heading="Your request has been received."
            description="The team has the details you submitted and will contact you if anything needs checking."
          />
        </UiSection>
      </div>
    </section>
  </div>
</template>
