(() => {
  const installButton = document.getElementById("installButton");
  const androidHelp = document.getElementById("androidHelp");
  const iosHelp = document.getElementById("iosHelp");
  const installedMessage = document.getElementById("installedMessage");
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(console.error);
    });
  }

  if (isStandalone) {
    installedMessage.hidden = false;
    return;
  }
  if (isIOS) {
    iosHelp.hidden = false;
  } else {
    androidHelp.hidden = false;
  }

  let installPrompt = null;
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });
  installButton.addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = true;
  });
  window.addEventListener("appinstalled", () => {
    installButton.hidden = true;
    androidHelp.hidden = true;
    iosHelp.hidden = true;
    installedMessage.hidden = false;
  });
})();