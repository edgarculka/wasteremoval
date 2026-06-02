<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";
import type { FaqItem } from "~/components/ui/Faq.vue";

interface ContactCardLink {
  title: string;
  description: string;
  href: string;
  icon: Component;
  iconLabel: string;
}

useSeoMeta({
  title: "Booking confirmed",
  description:
    "Your waste removal booking has been confirmed. Find out what happens next and how to contact the team.",
  robots: "noindex, nofollow",
});

const faqItems: FaqItem[] = [
  {
    question: "Has my booking definitely been made?",
    answer:
      "Yes. If you are on this page, we've received your booking details and reserved the request for the team to review.",
  },
  {
    question: "Will I receive a confirmation message?",
    answer:
      "Yes. We'll send a confirmation by text or email with the details you submitted. If anything looks unclear, we'll contact you before the crew is dispatched.",
  },
  {
    question: "Can I change the booking details?",
    answer:
      "Yes. Contact us as soon as possible with the booking name, collection address, and what needs changing so we can update the crew.",
  },
  {
    question: "When do I pay?",
    answer:
      "Payment is taken after the collection is complete and the final load size has been confirmed.",
  },
  {
    question: "Do I need to be at the property?",
    answer:
      "Not always. If the items are accessible and we have clear instructions, we can often collect without you being there.",
  },
];

const contactCards: ContactCardLink[] = [
  {
    title: "020 1234 5678",
    description: "Mon-Fri, 7am-7pm",
    href: "tel:+442012345678",
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Fastest response - usually under 5 minutes",
    href: "https://wa.me/442012345678",
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: "hello@bigvanmen.com",
    description: "We reply within the hour",
    href: "mailto:hello@bigvanmen.com",
    icon: IconsMail,
    iconLabel: "Email",
  },
];
</script>

<template>
  <UiSection
    tone="background"
    spacing="md"
    alignment="center"
    wide
    class="pt-2"
  >
    <UiThankYou
      heading="Thanks, your booking is confirmed."
      description="We've received your booking details and your collection request has been made. The team will review everything and send your next update shortly."
    />
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="left"
    title="Frequently asked questions"
  >
    <UiFaq :items="faqItems" />
    <template #visual>
      <div
        class="rounded-2xl border-2 border-foreground bg-primary p-6 text-primary-foreground shadow-[0.5rem_0.5rem_0_0_var(--foreground)]"
      >
        <UiHeading :level="3" size="md">Need to contact us?</UiHeading>
        <UiText tone="low" class="mt-2">
          Pick whichever way to reach us suits you best. Include your booking
          name or collection address so we can find the details quickly.
        </UiText>
        <div class="mt-5 flex flex-col gap-3">
          <UiCard
            v-for="card in contactCards"
            :key="card.href"
            v-bind="card"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UiSection>
</template>
