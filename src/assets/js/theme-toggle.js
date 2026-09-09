(function () {
  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  function currentTheme() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function reflect(theme) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  reflect(currentTheme());

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    reflect(next);
  });
})();
