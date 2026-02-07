(() => {
  const MODE_KEY = "mode";
  const CUSTOM_URL_KEY = "customUrl";
  const DEFAULT_MODE = "nothing";

  const form = document.getElementById("modes");
  const inputs = Array.from(form.querySelectorAll("input[name=\"mode\"]"));
  const panel = document.getElementById("custom-panel");
  const textarea = document.getElementById("custom-url");
  const fileInput = document.getElementById("custom-file");
  const saveButton = document.getElementById("custom-save");
  const status = document.getElementById("custom-status");

  function setChecked(mode) {
    const target = inputs.find((input) => input.value === mode) || inputs[0];
    if (target) target.checked = true;
    togglePanel(target?.value === "custom");
  }

  function togglePanel(active) {
    panel.classList.toggle("active", active);
    panel.setAttribute("aria-hidden", String(!active));
  }

  function showStatus(message) {
    status.textContent = message;
    if (!message) return;
    setTimeout(() => {
      if (status.textContent === message) status.textContent = "";
    }, 2000);
  }

  chrome.storage.sync.get({ [MODE_KEY]: DEFAULT_MODE, [CUSTOM_URL_KEY]: "" }, (data) => {
    setChecked(data[MODE_KEY]);
    textarea.value = data[CUSTOM_URL_KEY];
  });

  form.addEventListener("change", (event) => {
    const mode = event.target.value;
    chrome.storage.sync.set({ [MODE_KEY]: mode });
    togglePanel(mode === "custom");
  });

  saveButton.addEventListener("click", () => {
    const value = textarea.value.trim();
    chrome.storage.sync.set({ [CUSTOM_URL_KEY]: value }, () => {
      showStatus(value ? "URL guardada" : "URL vaciada");
    });
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      textarea.value = dataUrl;
      chrome.storage.sync.set({ [CUSTOM_URL_KEY]: dataUrl, [MODE_KEY]: "custom" }, () => {
        setChecked("custom");
        showStatus("Imagen local cargada");
      });
    };
    reader.readAsDataURL(file);
  });
})();