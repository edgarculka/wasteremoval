import type { Component } from "vue";

export interface BookingLoad {
  id: string;
  name: string;
  ribbon: string;
  weightLimit: string;
  price: string;
  pricePence: number;
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

export const bookingLoads: BookingLoad[] = [
  {
    id: "min",
    name: "Min Job",
    ribbon: "Single item",
    weightLimit: "Up to 50kg",
    price: "£40",
    pricePence: 4000,
    tag: "Minimum price",
    imageSrc: "/images/0van.svg",
    imageAlt: "Single item",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "mini",
    name: "Mini Load",
    ribbon: "1/4 van",
    weightLimit: "Up to 250kg",
    price: "£100",
    pricePence: 10000,
    imageSrc: "/images/1van.svg",
    imageAlt: "Quarter-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "small",
    name: "Half Load",
    ribbon: "1/2 van",
    weightLimit: "Up to 500kg",
    price: "£230",
    pricePence: 23000,
    tag: "Most popular",
    imageSrc: "/images/2van.svg",
    imageAlt: "Half-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "large",
    name: "Large Load",
    ribbon: "3/4 van",
    weightLimit: "Up to 750kg",
    price: "£240",
    pricePence: 24000,
    imageSrc: "/images/3van.svg",
    imageAlt: "Three-quarter-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
  {
    id: "full",
    name: "Full Load",
    ribbon: "Full van",
    weightLimit: "Up to 1,000kg",
    price: "£360",
    pricePence: 36000,
    imageSrc: "/images/4van.svg",
    imageAlt: "Full-load van",
    imageWidth: 88,
    imageHeight: 41,
  },
];

export type BookingFieldValidator =
  | "postcode"
  | "name"
  | "phone"
  | "email"
  | "minLength3";

export interface BookingTextField {
  id: string;
  label: string;
  type?: "text" | "tel" | "email";
  autocomplete?: string;
  placeholder?: string;
  required?: boolean;
  transform?: "uppercase";
  validator?: BookingFieldValidator;
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
      id: "photos";
      type: "photos";
      title: string;
      description: string;
      maxPhotos: number;
    }
  | {
      id: "additionalCharges";
      type: "additionalCharges";
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
      description:
        "Choose by volume first, then check the weight limit for heavy waste.",
    },
    {
      id: "additionalCharges",
      type: "additionalCharges",
      title: "Any specialist items?",
      description:
        "Add items that can need a separate disposal charge. Leave everything at zero if your load is standard rubbish.",
    },
    {
      id: "date",
      type: "date",
      title: "Pick a preferred collection date",
      description:
        "Choose the date you want. The team will confirm availability before the job is booked.",
      selectedLabelPrefix: "Preferred date",
    },
    {
      id: "time",
      type: "time",
      title: "Pick a preferred time",
      description: "The team will confirm the arrival window before the job is dispatched.",
    },
    {
      id: "photos",
      type: "photos",
      title: "Add photos",
      description:
        "Upload up to four photos so the team can quote the collection more accurately.",
      maxPhotos: 4,
    },
    {
      id: "address",
      type: "fields",
      title: "Where are we going?",
      description: "Tell us where to collect from so we can quote accurately.",
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
      description:
        "Add your details so the team can confirm the quote request.",
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
      title: "Review your quote request",
      description:
        "Check everything looks right, then submit the request.",
    },
  ],
};
