export function useSelectedSeoLocation() {
  const route = useRoute();

  return computed(() => {
    const locationSlug = route.params.locationSlug;

    if (typeof locationSlug === "string") {
      return getSeoLocationBySlug(locationSlug) ?? defaultSeoLocation;
    }

    return defaultSeoLocation;
  });
}
