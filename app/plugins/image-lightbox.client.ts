// Click any raster <img> on the page → it pops out fullscreen with a fade
// "coming out of the original" feel. Click again (or Esc) to minimise it back.
// Auto-applies site-wide; opt out with `data-no-lightbox` on the <img>.

const RASTER_RE = /\.(png|jpe?g|webp|avif|gif)(\?|#|$)/i;
const TRANSITION = "all 320ms cubic-bezier(0.2, 0.8, 0.2, 1)";
const FADE = "background 220ms ease, backdrop-filter 220ms ease, opacity 220ms ease";
const VIEWPORT_PADDING_Y_REM = 2;
// Horizontal padding stays minimal on narrow screens (where every px counts)
// and opens up on wider viewports.
const VIEWPORT_PADDING_X_REM_MOBILE = 0.25;
const VIEWPORT_PADDING_X_REM_DESKTOP = 2;
const MOBILE_BREAKPOINT_PX = 640;

export default defineNuxtPlugin(() => {
  let isOpen = false;

  const isRaster = (img: HTMLImageElement): boolean => {
    const src = img.currentSrc || img.src || "";
    return RASTER_RE.test(src);
  };

  const isEligible = (img: HTMLImageElement): boolean => {
    if (!isRaster(img)) return false;
    if ("noLightbox" in img.dataset) return false;
    // Don't hijack clicks on linked or interactive images.
    if (img.closest("a, button, [role='button'], label")) return false;
    // Hidden / zero-size images can't visibly pop.
    const rect = img.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return false;
    return true;
  };

  const remToPx = (rem: number): number => {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return rem * root;
  };

  const open = (source: HTMLImageElement) => {
    if (isOpen) return;
    isOpen = true;

    const startRect = source.getBoundingClientRect();
    const cs = getComputedStyle(source);
    const radius = cs.borderRadius || "0px";
    const fit = (cs.objectFit as string) || "cover";

    const backdrop = document.createElement("div");
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-label", source.alt || "Image preview");
    backdrop.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483646",
      "background:rgba(0,0,0,0)",
      "backdrop-filter:blur(0px)",
      "-webkit-backdrop-filter:blur(0px)",
      "cursor:zoom-out",
      `transition:${FADE}`,
      "opacity:1",
    ].join(";");

    const clone = document.createElement("img");
    clone.src = source.currentSrc || source.src;
    if (source.srcset) clone.srcset = source.srcset;
    if (source.sizes) clone.sizes = source.sizes;
    clone.alt = source.alt || "";
    clone.decoding = "sync";
    clone.style.cssText = [
      "position:fixed",
      `left:${startRect.left}px`,
      `top:${startRect.top}px`,
      `width:${startRect.width}px`,
      `height:${startRect.height}px`,
      `object-fit:${fit}`,
      `border-radius:${radius}`,
      "max-width:none",
      "max-height:none",
      "margin:0",
      "user-select:none",
      "-webkit-user-drag:none",
      `transition:${TRANSITION}`,
      "will-change:left,top,width,height,border-radius",
    ].join(";");

    backdrop.appendChild(clone);
    document.body.appendChild(backdrop);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Hide the original so the clone visually IS the image.
    const prevVisibility = source.style.visibility;
    source.style.visibility = "hidden";

    const computeTargetRect = () => {
      const padXRem =
        window.innerWidth < MOBILE_BREAKPOINT_PX
          ? VIEWPORT_PADDING_X_REM_MOBILE
          : VIEWPORT_PADDING_X_REM_DESKTOP;
      const padX = remToPx(padXRem);
      const padY = remToPx(VIEWPORT_PADDING_Y_REM);
      const vw = Math.max(0, window.innerWidth - padX * 2);
      const vh = Math.max(0, window.innerHeight - padY * 2);
      const naturalW = source.naturalWidth || startRect.width;
      const naturalH = source.naturalHeight || startRect.height;
      const ratio = naturalW / naturalH;
      let w = vw;
      let h = vw / ratio;
      if (h > vh) {
        h = vh;
        w = vh * ratio;
      }
      const left = (window.innerWidth - w) / 2;
      const top = (window.innerHeight - h) / 2;
      return { left, top, width: w, height: h };
    };

    // Two RAFs: first to commit start state, second to trigger the transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        backdrop.style.background = "rgba(0,0,0,0.85)";
        backdrop.style.backdropFilter = "blur(4px)";
        backdrop.style.setProperty("-webkit-backdrop-filter", "blur(4px)");
        const target = computeTargetRect();
        clone.style.left = `${target.left}px`;
        clone.style.top = `${target.top}px`;
        clone.style.width = `${target.width}px`;
        clone.style.height = `${target.height}px`;
        clone.style.borderRadius = "0px";
      });
    });

    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;

      // Re-read in case the page scrolled or layout shifted while open.
      const endRect = source.getBoundingClientRect();
      backdrop.style.background = "rgba(0,0,0,0)";
      backdrop.style.backdropFilter = "blur(0px)";
      backdrop.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
      clone.style.left = `${endRect.left}px`;
      clone.style.top = `${endRect.top}px`;
      clone.style.width = `${endRect.width}px`;
      clone.style.height = `${endRect.height}px`;
      clone.style.borderRadius = radius;

      const cleanup = () => {
        backdrop.remove();
        source.style.visibility = prevVisibility;
        document.body.style.overflow = prevOverflow;
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll, true);
        isOpen = false;
      };

      let done = false;
      const finishOnce = () => {
        if (done) return;
        done = true;
        cleanup();
      };
      clone.addEventListener("transitionend", finishOnce, { once: true });
      // Safety net in case transitionend doesn't fire.
      window.setTimeout(finishOnce, 450);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onResize = () => {
      if (closing) return;
      const target = computeTargetRect();
      clone.style.left = `${target.left}px`;
      clone.style.top = `${target.top}px`;
      clone.style.width = `${target.width}px`;
      clone.style.height = `${target.height}px`;
    };
    // If the page scrolls under the open lightbox, close so the FLIP-back lands on the right rect.
    const onScroll = () => {
      if (!closing) close();
    };

    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
  };

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!isEligible(target)) return;
      e.preventDefault();
      open(target);
    },
    // Capture phase so we win against component-level handlers if any add one later.
    true,
  );
});
