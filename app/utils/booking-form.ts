import type { Component } from "vue";

export interface BookingLoad {
  id: string;
  name: string;
  ribbon: string;
  price: string;
  tag?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface BookingTimeSlot {
  id: string;
  label: string;
  description?: string;
  icon?: Component;
  iconLabel?: string;
}

export type BookingFieldValidator =
  | "postcode"
  | "name"
  | "phone"
  | "email"
  | "minLength3";

export interface BookingTextField {
  id: "postcode" | "addressLine1" | "name" | "phone" | "email";
  label: string;
  type?: "text" | "tel" | "email";
  autocomplete?: string;
  placeholder?: string;
  required?: boolean;
  transform?: "uppercase";
  validator: BookingFieldValidator;
}

export type BookingQuestion =
  | {
      id: "load";
      type: "load";
      title: string;
      description: string;
    }
  | {
      id: "date";
      type: "date";
      title: string;
      description: string;
      selectedLabelPrefix?: string;
    }
  | {
      id: "time";
      type: "time";
      title: string;
      description: string;
    }
  | {
      id: "address" | "contact";
      type: "fields";
      title: string;
      description: string;
      fields: BookingTextField[];
    }
  | {
      id: "review";
      type: "review";
      title: string;
      description: string;
    };

export interface BookingFormConfig {
  questions: BookingQuestion[];
}

export const bookingFormConfig: BookingFormConfig = {
  questions: [
    {
      id: "load",
      type: "load",
      title: "Choose your load size",
      description: "How much do we need to clear?",
    },
    {
      id: "date",
      type: "date",
      title: "Pick a collection date",
      description: "Same-day if you book before 1pm, next-day everywhere else.",
      selectedLabelPrefix: "Booked for",
    },
    {
      id: "time",
      type: "time",
      title: "Pick a time",
      description: "We'll text 30 minutes before we arrive.",
    },
    {
      id: "address",
      type: "fields",
      title: "Where are we going?",
      description: "Tell us where to collect from.",
      fields: [
        {
          id: "postcode",
          label: "Postcode",
          autocomplete: "postal-code",
          required: true,
          placeholder: "SW1A 1AA",
          transform: "uppercase",
          validator: "postcode",
        },
        {
          id: "addressLine1",
          label: "First line of address",
          autocomplete: "address-line1",
          required: true,
          placeholder: "123 Example Street",
          validator: "minLength3",
        },
      ],
    },
    {
      id: "contact",
      type: "fields",
      title: "Your details",
      description: "We'll send confirmation by SMS and email.",
      fields: [
        {
          id: "name",
          label: "Full name",
          autocomplete: "name",
          required: true,
          placeholder: "Jane Smith",
          validator: "name",
        },
        {
          id: "phone",
          label: "Phone",
          type: "tel",
          autocomplete: "tel",
          required: true,
          placeholder: "07700 900000",
          validator: "phone",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          autocomplete: "email",
          required: true,
          placeholder: "jane@example.com",
          validator: "email",
        },
      ],
    },
    {
      id: "review",
      type: "review",
      title: "Review your booking",
      description: "Check everything looks right before you submit.",
    },
  ],
};
