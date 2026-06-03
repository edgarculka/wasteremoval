export const adminQuoteStages = [
  {
    id: "quote-received",
    label: "New",
    description: "New customer requests ready for review.",
  },
  {
    id: "quote-sent",
    label: "Price Confirmed",
    description: "Price confirmed with the customer.",
  },
  {
    id: "job-booked",
    label: "Booked",
    description: "Collection slot agreed with the customer.",
  },
  {
    id: "job-completed",
    label: "Completed",
    description: "Waste collected and disposal complete.",
  },
  {
    id: "job-paid",
    label: "Paid",
    description: "Payment received and the job is closed.",
  },
] as const;

export type AdminQuoteStatus = (typeof adminQuoteStages)[number]["id"];

export const adminQuoteStatusIds = adminQuoteStages.map((stage) => stage.id);

export function normalizeAdminQuoteStatus(value: unknown): AdminQuoteStatus {
  return value === "new" || !adminQuoteStatusIds.includes(value as AdminQuoteStatus)
    ? "quote-received"
    : (value as AdminQuoteStatus);
}

export function getEmailDomain(email: string | null | undefined) {
  const [, domain = ""] = String(email ?? "").trim().toLowerCase().split("@");
  return domain;
}

export function normalizeDomain(value: string) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
}
