document.getElementById("save").onclick = async () => {
  const tags = document
    .getElementById("tags")
    .value.split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.runtime.sendMessage(
    {
      type: "save-bookmark",
      url: tab.url,
      tags
    },
    res => {
      document.getElementById("status").textContent =
        res?.ok ? "Saved ✓" : res?.error;
    }
  );
};

document.getElementById("settings").onclick = () => {
  chrome.runtime.openOptionsPage();
};

