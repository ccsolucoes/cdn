/* cc-reveal.js v1.0.1
   Adds .is-visible to .reveal elements when they enter viewport.
   Optional per-element config via data-* attributes:
   - data-duration="900"   (ms)
   - data-delay="120"      (ms)
   - data-distance="24"    (px)
   - data-ease="cubic-bezier(.2,.8,.2,1)" (string)
*/
(function () {
  "use strict";

  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = document.querySelectorAll(".reveal");
  if (!els.length) {
    document.documentElement.classList.add("ccreveal-ready");
    return;
  }

  // Apply per-element overrides via data-attributes (before observing)
  els.forEach((el) => {
    const { duration, delay, distance, ease } = el.dataset;

    if (duration) el.style.setProperty("--reveal-duration", `${duration}ms`);
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
    if (distance) el.style.setProperty("--reveal-distance", `${distance}px`);
    if (ease) el.style.setProperty("--reveal-ease", ease);
  });

  // Fallback: reveal everything
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    document.documentElement.classList.add("ccreveal-ready");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => io.observe(el));
  document.documentElement.classList.add("ccreveal-ready");
})();
