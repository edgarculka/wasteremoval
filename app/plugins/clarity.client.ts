const CLARITY_PROJECT_ID = "x0tf1bhgic";
const CLARITY_DELAY_MS = 60000;

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

export default defineNuxtPlugin(() => {
  let hasLoaded = false;
  let timeoutId: number | null = null;

  const loadClarity = () => {
    if (hasLoaded || !CLARITY_PROJECT_ID) return;
    hasLoaded = true;
    if (timeoutId !== null) window.clearTimeout(timeoutId);

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

  const scheduleLoad = () => {
    timeoutId = window.setTimeout(loadClarity, CLARITY_DELAY_MS);
    window.addEventListener("pointerdown", loadClarity, { once: true, passive: true });
    window.addEventListener("keydown", loadClarity, { once: true });
  };

  if (document.readyState === "complete") {
    scheduleLoad();
  } else {
    window.addEventListener("load", scheduleLoad, { once: true });
  }
});
