(() => {
  const MODE_KEY = "mode";
  const CUSTOM_URL_KEY = "customUrl";
  const MODES = {
    NOTHING: "nothing",
    DELETE: "delete",
    RAIDEN: "raiden",
    NEUVILLETTE: "neuvillette",
    CUSTOM: "custom"
  };

  const SRCS = {
    [MODES.RAIDEN]: "https://cdn.imgchest.com/files/470f8541052f.gif",
    [MODES.NEUVILLETTE]: "https://cdnb.artstation.com/p/assets/images/images/069/691/095/original/anart-no-2.gif?1700748116"
  };

  const TARGET_IDS = ["avatar_active_image_small", "avatar_active_image"];

  function getSettings(cb) {
    chrome.storage.sync.get({ [MODE_KEY]: MODES.NOTHING, [CUSTOM_URL_KEY]: "" }, (data) => {
      cb(data[MODE_KEY], data[CUSTOM_URL_KEY]);
    });
  }

  function applyModeToElement(el, mode, customUrl) {
    if (!el) return;

    if (!el.dataset.originalSrc && el.getAttribute("src")) {
      el.dataset.originalSrc = el.getAttribute("src");
    }

    if (mode === MODES.DELETE) {
      el.style.display = "none";
      return;
    }

    el.style.display = "";

    if (mode === MODES.RAIDEN || mode === MODES.NEUVILLETTE) {
      el.setAttribute("src", SRCS[mode]);
      return;
    }

    if (mode === MODES.CUSTOM && customUrl) {
      el.setAttribute("src", customUrl);
      return;
    }

    if (mode === MODES.NOTHING && el.dataset.originalSrc) {
      el.setAttribute("src", el.dataset.originalSrc);
    }
  }

  function applyMode(mode, customUrl) {
    TARGET_IDS.forEach((id) => {
      const el = document.getElementById(id);
      applyModeToElement(el, mode, customUrl);
    });
  }

  function scanAndApply() {
    getSettings((mode, customUrl) => applyMode(mode, customUrl));
  }

  const observer = new MutationObserver(() => {
    scanAndApply();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    const modeChange = changes[MODE_KEY];
    const customChange = changes[CUSTOM_URL_KEY];

    if (!modeChange && !customChange) return;

    getSettings((mode, customUrl) => applyMode(mode, customUrl));
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanAndApply, { once: true });
  } else {
    scanAndApply();
  }
})();