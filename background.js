chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === "login") {
      const res = await fetch(`${msg.server}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: msg.username,
          password: msg.password,
          remember_me: true
        })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const json = await res.json();
      await chrome.storage.local.set({
        server: msg.server,
        token: json.message.token
      });

      return { ok: true };
    }

    if (msg.type === "save-bookmark") {
      const { server, token } = await chrome.storage.local.get([
        "server",
        "token"
      ]);

      if (!server || !token) {
        throw new Error("Not logged in");
      }

      const res = await fetch(`${server}/api/bookmarks`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Shiori-Response-Format": "json"
        },
        body: JSON.stringify({
          url: msg.url,
          tags: msg.tags.map(t => ({ name: t })),
          createArchive: false,
          public: 1
        })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      return { ok: true };
    }
  })()
    .then(sendResponse)
    .catch(err => sendResponse({ error: err.message }));

  return true; // REQUIRED for MV3
});
