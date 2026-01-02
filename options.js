document.getElementById("login").onclick = async () => {
  const server = document.getElementById("server").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.runtime.sendMessage(
    {
      type: "login",
      server,
      username,
      password
    },
    res => {
      document.getElementById("status").textContent =
        res?.ok ? "Logged in ✓" : res?.error;
    }
  );
};
