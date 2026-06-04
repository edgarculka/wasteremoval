<script setup lang="ts">
import type { Component } from "vue";
import IconsMail from "~/components/icons/Mail.vue";
import IconsPhone from "~/components/icons/Phone.vue";
import IconsWhatsApp from "~/components/icons/WhatsApp.vue";

interface ContactCardLink {
  title: string;
  description: string;
  href: string;
  icon: Component;
  iconLabel: string;
}

usePageSeo({
  title: "Booking confirmed",
  description:
    "Your waste removal booking has been confirmed. Find out what happens next and how to contact the team.",
  path: "/thank-you/",
  robots: "noindex, nofollow",
  structuredData: buildFaqStructuredData(thankYouFaqs, "/thank-you/#faq"),
});

const contactCards: ContactCardLink[] = [
  {
    title: companyDetails.contact.primaryPhoneDisplay,
    description: companyDetails.openingHoursDisplay,
    href: companyDetails.contact.primaryPhoneHref,
    icon: IconsPhone,
    iconLabel: "Phone",
  },
  {
    title: "Chat on WhatsApp",
    description: "Send changes or access notes",
    href: companyDetails.contact.whatsappHref,
    icon: IconsWhatsApp,
    iconLabel: "WhatsApp",
  },
  {
    title: companyDetails.contact.email,
    description: "Send photos or booking details",
    href: companyDetails.contact.emailHref,
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
      :description="`${companyDetails.tradingName} has received your details. The team will confirm the collection information shortly.`"
    />
  </UiSection>

  <UiSection
    tone="secondary"
    spacing="md"
    alignment="left"
    title="Frequently asked questions"
  >
    <UiFaq :items="thankYouFaqs" />
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
