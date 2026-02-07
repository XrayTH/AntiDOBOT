(() => {
  const MODE_KEY = "mode";
  const DEFAULT_MODE = "nothing";

  const form = document.getElementById("modes");
  const inputs = Array.from(form.querySelectorAll("input[name=\"mode\"]"));

  function setChecked(mode) {
    const target = inputs.find((input) => input.value === mode) || inputs[0];
    if (target) target.checked = true;
  }

  chrome.storage.sync.get({ [MODE_KEY]: DEFAULT_MODE }, (data) => {
    setChecked(data[MODE_KEY]);
  });

  form.addEventListener("change", (event) => {
    const mode = event.target.value;
    chrome.storage.sync.set({ [MODE_KEY]: mode });
  });
})();