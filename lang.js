// Shows one language at a time. Order: ?lang= in the URL, saved choice, browser language.
(function () {
  var supported = ["pl", "en"];

  function saved() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function initial() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(fromUrl) >= 0) return fromUrl;
    if (supported.indexOf(saved()) >= 0) return saved();
    return (navigator.language || "en").toLowerCase().indexOf("pl") === 0 ? "pl" : "en";
  }

  function apply(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-set-lang") === lang));
    });
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.content;
  }

  apply(initial());
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-lang]");
    if (!button) return;
    var lang = button.getAttribute("data-set-lang");
    remember(lang);
    apply(lang);
  });
})();
