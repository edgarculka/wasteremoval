import type { InjectionKey, Ref } from "vue";

export type SectionAlignment = "left" | "center" | "right";

export const SECTION_ALIGNMENT_KEY: InjectionKey<Ref<SectionAlignment>> =
  Symbol("section-alignment");
