import type { SeoFaq, SeoLocation, SeoService } from "~/utils/seo-pages";
import { companyDetails } from "~/utils/company";

export function buildFaqStructuredData(faqs: SeoFaq[], id?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(id ? { "@id": id } : {}),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const homeFaqs: SeoFaq[] = [
  {
    question: "Do I need to be home during the collection?",
    answer:
      "Not always. If items are accessible and the instructions are clear, the team can often collect from a designated spot and confirm the job with photos.",
  },
  {
    question: "What items can't you take?",
    answer:
      "Standard household and business waste can usually be collected. Asbestos, hazardous chemicals, liquid paint, gas bottles, clinical waste and other specialist materials must be flagged before booking.",
  },
  {
    question: "How quickly can you come out?",
    answer:
      "Same-day and next-day slots are available where the route allows. Send photos, access notes and the collection address so the team can confirm the earliest realistic window.",
  },
  {
    question: "How do you handle disposal?",
    answer:
      "Waste is taken through appropriate disposal routes, with reusable and recyclable material separated where practical. Ask before booking if you need disposal records for a property or business file.",
  },
  {
    question: "How is the price worked out?",
    answer:
      "Pricing is based on load size, access and waste type. The crew confirms the final load size before removing anything, so the agreed price matches the collection.",
  },
  {
    question: "What areas do you cover?",
    answer: `${companyDetails.tradingName} covers West, Central, North and South London service areas including Ealing, Hammersmith, Westminster, Camden, Clapham, Wandsworth and nearby locations.`,
  },
  {
    question: "Do I need to hire a skip?",
    answer:
      "No. The team loads the items into the vehicle and removes them in one visit, so you do not need a skip permit, driveway space for a skip or several days of on-street storage.",
  },
  {
    question: "What should I send for a fast quote?",
    answer:
      "Send photos of the waste, the collection postcode, where the items are stored, parking or loading notes, and whether there are stairs, lifts, basements or rear-garden access.",
  },
];

export const pricingFaqs: SeoFaq[] = [
  {
    question: "How is the price worked out?",
    answer:
      "Pricing is based on load size. Labour, transport and standard disposal handling are included, so you can choose the closest tier before booking.",
  },
  {
    question: "What happens if my load is smaller or larger on the day?",
    answer:
      "The crew confirms the final load size before anything is removed. If it is different from your selection, they agree the correct tier with you first.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "There are no hidden fees for standard household and business waste. Specialist items, heavy materials or restricted waste are flagged before collection if separate handling is needed.",
  },
  {
    question: "Can I get a price before booking?",
    answer:
      "Yes. Send photos by WhatsApp or email and the team can confirm the most suitable load tier before you choose a collection slot.",
  },
  {
    question: "Do I need to arrange a skip permit?",
    answer:
      "No. The team arrives, loads the waste and takes it away in one visit, so there is no skip left on the road and no skip permit to arrange.",
  },
  {
    question: "Does the price include loading?",
    answer:
      "Yes. Standard loading from the agreed collection point is included. Tell the team about stairs, long carries, basements or awkward access before booking.",
  },
  {
    question: "Are heavy materials priced differently?",
    answer:
      "Heavy materials such as soil, rubble and tiles can affect the load tier because of weight limits and disposal handling. Send photos and approximate bag counts for an accurate quote.",
  },
  {
    question: "When do I pay?",
    answer:
      "Payment is taken after the final load size is confirmed and the collection is complete, unless a different arrangement is agreed before the job.",
  },
];

export const disposalFaqs: SeoFaq[] = [
  {
    question: "Can you provide disposal paperwork?",
    answer:
      "Ask before booking if you need disposal paperwork for landlord, business or property-management records. The team can confirm what can be supplied for your job type.",
  },
  {
    question: "What happens to reusable items?",
    answer:
      "Reusable and recyclable material is separated where practical before the remaining waste is sent through appropriate disposal routes.",
  },
  {
    question: "What should I mention before booking?",
    answer:
      "Mention heavy materials, liquids, chemicals, paint, gas bottles, electrical items, access restrictions and any items you think may need specialist handling.",
  },
  {
    question: "Can you take asbestos?",
    answer:
      "No. Asbestos and suspected asbestos need a specialist licensed contractor and must not be mixed with a standard rubbish removal load.",
  },
  {
    question: "Can you collect paint or chemicals?",
    answer:
      "Liquid paint, solvents, fuels, chemicals and unidentified liquids may need specialist handling. Describe them before booking so the team can advise.",
  },
  {
    question: "Can electrical items be collected?",
    answer:
      "Many small electrical items can be collected as part of a standard clearance, but they should be listed in the quote request so disposal handling can be planned.",
  },
  {
    question: "Do you separate recycling?",
    answer:
      "Reusable and recyclable materials are separated where practical, depending on the waste type, condition, access and disposal route available for the load.",
  },
  {
    question: "Why do photos matter for disposal?",
    answer:
      "Photos help identify restricted materials, heavy items and mixed loads before arrival, which reduces pricing surprises and avoids loading items that need separate handling.",
  },
];

export const thankYouFaqs: SeoFaq[] = [
  {
    question: "Has my booking been received?",
    answer: `Yes. If you are on this page, ${companyDetails.tradingName} has received your booking details. The team will review the request and confirm the collection information.`,
  },
  {
    question: "Will I receive a confirmation message?",
    answer:
      "Yes. The team will send a confirmation by text or email with the details you submitted. If anything looks unclear, they will contact you before the crew is dispatched.",
  },
  {
    question: "Can I change the booking details?",
    answer:
      "Yes. Contact the team as soon as possible with the booking name, collection address and what needs changing so the crew can be updated.",
  },
  {
    question: "When do I pay?",
    answer:
      "Payment is taken after the collection is complete and the final load size has been confirmed, unless a different arrangement was agreed before booking.",
  },
  {
    question: "Do I need to be at the property?",
    answer:
      "Not always. If the items are accessible and the team has clear instructions, collection can often happen without you being at the property.",
  },
  {
    question: "What should I do if I forgot to add an item?",
    answer:
      "Contact the team before the collection window and send a photo of the extra item. The final load tier can be confirmed before anything is removed.",
  },
  {
    question: "Can I send access or parking notes after booking?",
    answer:
      "Yes. Send any gate codes, concierge instructions, parking restrictions, floor levels, lift details or loading notes as soon as possible.",
  },
  {
    question: "What happens if the crew finds restricted waste?",
    answer:
      "Restricted materials are flagged before loading. The team will explain what can be collected and whether any item needs specialist handling or a separate disposal route.",
  },
];

function normalizeQuestionKey(question: string) {
  return question.trim().toLowerCase();
}

function uniqueFaqs(faqs: SeoFaq[]) {
  const seen = new Set<string>();
  return faqs.filter((item) => {
    const key = normalizeQuestionKey(item.question);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildServiceFaqs(service: SeoService): SeoFaq[] {
  return uniqueFaqs([
    ...service.faqs,
    {
      question: `How do I book ${service.name.toLowerCase()}?`,
      answer:
        "Send the collection address, photos of the waste, access notes and your preferred timing. The team will confirm the likely load size before the job is booked.",
    },
    {
      question: `What should I include in a ${service.name.toLowerCase()} quote request?`,
      answer: `Include photos, the postcode, where the items are stored, parking details and anything heavy or awkward. For ${service.name.toLowerCase()}, it also helps to list the main item types.`,
    },
    {
      question: `How is ${service.name.toLowerCase()} priced?`,
      answer:
        "Pricing is based on load size, waste type, access and handling. The crew confirms the final tier before removing anything.",
    },
    {
      question: `Can you collect ${service.name.toLowerCase()} from flats?`,
      answer:
        "Yes, where access is safe. Share the floor level, lift details, stair width, parking restrictions and any concierge or estate instructions before booking.",
    },
    {
      question: "Do I need a skip for this service?",
      answer:
        "No. The team loads the items and removes them in one visit, so there is no skip permit, fixed skip size or on-street skip storage to arrange.",
    },
    {
      question: "What items are restricted?",
      answer:
        "Asbestos, hazardous chemicals, liquid paint, gas bottles, clinical waste and some specialist materials cannot be mixed with a standard load. Flag anything unusual before booking.",
    },
    {
      question: "How quickly can the collection happen?",
      answer:
        "Same-day and next-day slots are available where the route allows. Photos and access notes help the team confirm the earliest realistic window.",
    },
    {
      question: "What happens after the waste is collected?",
      answer:
        "The load is taken through appropriate disposal routes, with reusable and recyclable material separated where practical.",
    },
  ]);
}

export function buildServiceLocationFaqs(
  service: SeoService,
  location: SeoLocation,
): SeoFaq[] {
  return uniqueFaqs([
    ...service.faqs,
    {
      question: `Is ${service.name.toLowerCase()} available in ${location.name}?`,
      answer: `Yes. ${companyDetails.tradingName} provides ${service.name.toLowerCase()} in ${location.name} and nearby areas including ${location.nearbyAreas.join(", ")}.`,
    },
    {
      question: `What access details help for collections in ${location.name}?`,
      answer: `Share parking, loading and property access details before booking. For ${location.name}, useful notes include ${location.accessNotes[0]?.toLowerCase() ?? "floor level, parking and item location"}.`,
    },
    {
      question: `How is ${service.name.toLowerCase()} priced in ${location.name}?`,
      answer:
        "Pricing is based on the final load size, waste type, access and handling. The crew confirms the correct tier before anything is removed.",
    },
    {
      question: `Can you collect from flats and managed buildings in ${location.name}?`,
      answer:
        "Yes, where access is safe. Send floor level, lift, concierge, gate, stairwell and loading-bay details so the collection can be planned properly.",
    },
    {
      question: `Do you cover nearby areas around ${location.name}?`,
      answer: `Yes. Nearby coverage includes ${location.nearbyAreas.join(", ")}. If the address is just outside the listed area, send the postcode for confirmation.`,
    },
    {
      question: "Do I need to arrange a skip permit?",
      answer:
        `No. ${companyDetails.tradingName} loads the items and removes them in one visit, so there is no skip permit or on-street skip storage to arrange.`,
    },
    {
      question: "What items should be flagged before booking?",
      answer:
        "Flag heavy materials, liquids, chemicals, paint, gas bottles, electrical items, awkward furniture and anything that may need specialist handling.",
    },
    {
      question: "What happens to the waste after collection?",
      answer:
        "Waste is taken through appropriate disposal routes, with reusable and recyclable material separated where practical.",
    },
  ]);
}
