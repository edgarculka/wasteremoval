const CLARITY_PROJECT_ID = "x0tf1bhgic";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  let hasLoaded = false;

  const loadClarity = () => {
    if (hasLoaded || !CLARITY_PROJECT_ID) return;
    hasLoaded = true;

    window.clarity =
      window.clarity ||
      Object.assign(
        (...args: unknown[]) => {
          window.clarity!.q!.push(args);
        },
        { q: [] as unknown[][] },
      );

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(script);
  };

  const trackRoute = () => {
    const path = `${window.location.pathname}${window.location.search}`;

    window.clarity?.("set", "page_path", path);
    window.clarity?.("event", "page_view");
  };

  const loadAndTrackRoute = () => {
    loadClarity();
    trackRoute();
  };

  if (document.readyState === "complete") {
    loadAndTrackRoute();
  } else {
    window.addEventListener("load", loadAndTrackRoute, { once: true });
  }

  router.beforeEach(() => {
    loadClarity();
  });

  router.afterEach(() => {
    window.requestAnimationFrame(trackRoute);
  });
});
