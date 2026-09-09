(function () {
  var el = document.querySelector("[data-logo]");
  var gifs = window.__LOGO_GIFS__;
  if (!el || !gifs || !gifs.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var pick = gifs[Math.floor(Math.random() * gifs.length)];
  el.style.backgroundImage = 'url("' + pick + '")';
})();
