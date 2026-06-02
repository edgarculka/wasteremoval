export function useSelectedSeoLocation() {
  const route = useRoute();
  const selectedLocationSlug = useCookie<string | null>(
    "selected-seo-location",
    {
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
      sameSite: "lax",
    },
  );

  return computed(() => {
    const locationSlug = route.params.locationSlug;

    if (typeof locationSlug === "string") {
      return getSeoLocationBySlug(locationSlug) ?? defaultSeoLocation;
    }

    if (selectedLocationSlug.value) {
      return getSeoLocationBySlug(selectedLocationSlug.value) ?? defaultSeoLocation;
    }

    return defaultSeoLocation;
  });
}

export function useRememberSeoLocation() {
  const selectedLocationSlug = useCookie<string | null>(
    "selected-seo-location",
    {
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
      sameSite: "lax",
    },
  );

  return (location: SeoLocation) => {
    selectedLocationSlug.value = location.slug;
  };
}
