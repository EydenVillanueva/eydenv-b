(function () {
  var search = document.getElementById("post-search");
  var tagButtons = document.querySelectorAll(".tag-filter");
  var items = document.querySelectorAll(".post-item");
  var yearGroups = document.querySelectorAll(".post-year-group");
  var noResults = document.querySelector(".no-results");
  if (!items.length) return;

  var activeTag = "all";

  function applyFilters() {
    var query = ((search && search.value) || "").trim().toLowerCase();
    var totalVisible = 0;

    items.forEach(function (item) {
      var tags = (item.dataset.tags || "").split(",");
      var matchesTag = activeTag === "all" || tags.indexOf(activeTag) !== -1;
      var matchesQuery = !query || item.dataset.title.indexOf(query) !== -1;
      var visible = matchesTag && matchesQuery;
      item.hidden = !visible;
      if (visible) totalVisible++;
    });

    yearGroups.forEach(function (group) {
      group.hidden = group.querySelectorAll(".post-item:not([hidden])").length === 0;
    });

    if (noResults) noResults.hidden = totalVisible !== 0;
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeTag = btn.dataset.tag;
      tagButtons.forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      applyFilters();
    });
  });

  if (search) {
    search.addEventListener("input", applyFilters);
  }
})();
