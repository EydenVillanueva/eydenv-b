(function () {
  var els = document.querySelectorAll("[data-logo]");
  var gifs = window.__LOGO_GIFS__;
  if (!els.length || !gifs || !gifs.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var STORAGE_KEY = "eydenv-last-logo-gif";
  var last = null;
  try {
    last = sessionStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  var pool = gifs.length > 1 ? gifs.filter(function (gif) { return gif !== last; }) : gifs;
  var pick = pool[Math.floor(Math.random() * pool.length)];

  try {
    sessionStorage.setItem(STORAGE_KEY, pick);
  } catch (e) {}

  els.forEach(function (el) {
    el.style.backgroundImage = 'url("' + pick + '")';
  });
})();
