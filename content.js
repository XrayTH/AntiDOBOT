(() => {
  const MODE_KEY = "mode";
  const MODES = {
    NOTHING: "nothing",
    DELETE: "delete",
    RAIDEN: "raiden",
    NEUVILLETTE: "neuvillette"
  };

  const SRCS = {
    [MODES.RAIDEN]: "https://www.icegif.com/wp-content/uploads/2022/04/icegif-750.gif",
    [MODES.NEUVILLETTE]: "https://cdnb.artstation.com/p/assets/images/images/069/691/095/original/anart-no-2.gif?1700748116"
  };

  const TARGET_IDS = ["avatar_active_image_small", "avatar_active_image"];

  function getMode(cb) {
    chrome.storage.sync.get({ [MODE_KEY]: MODES.NOTHING }, (data) => {
      cb(data[MODE_KEY]);
    });
  }

  function applyModeToElement(el, mode) {
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

    if (mode === MODES.NOTHING && el.dataset.originalSrc) {
      el.setAttribute("src", el.dataset.originalSrc);
    }
  }

  function applyMode(mode) {
    TARGET_IDS.forEach((id) => {
      const el = document.getElementById(id);
      applyModeToElement(el, mode);
    });
  }

  function scanAndApply() {
    getMode((mode) => applyMode(mode));
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
    if (!changes[MODE_KEY]) return;
    applyMode(changes[MODE_KEY].newValue);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanAndApply, { once: true });
  } else {
    scanAndApply();
  }
})();