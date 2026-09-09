(function () {
  var els = document.querySelectorAll("[data-logo]");
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var PATTERNS = ["logo-anim-sweep", "logo-anim-breathe", "logo-anim-scan"];
  var STORAGE_KEY = "eydenv-last-logo-pattern";
  var last = null;
  try {
    last = sessionStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  var pool = PATTERNS.length > 1 ? PATTERNS.filter(function (p) { return p !== last; }) : PATTERNS;
  var pattern = pool[Math.floor(Math.random() * pool.length)];

  try {
    sessionStorage.setItem(STORAGE_KEY, pattern);
  } catch (e) {}

  var angle = Math.floor(Math.random() * 360);
  var duration = (4 + Math.random() * 6).toFixed(2);
  var delay = -(Math.random() * parseFloat(duration)).toFixed(2);

  els.forEach(function (el) {
    el.classList.add(pattern);
    el.style.setProperty("--logo-angle", angle + "deg");
    el.style.setProperty("--logo-duration", duration + "s");
    el.style.animationDelay = delay + "s";
  });
})();
