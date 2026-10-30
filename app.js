
(() => {
  const installButton = document.getElementById("installButton");

  // Si el botón no existe, no intenta utilizarlo.
  if (!installButton) return;

  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  let installPrompt = null;

  if (isStandalone) {
    installButton.hidden = true;
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .catch(error => console.error("Error del Service Worker:", error));
    });
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      installButton.hidden = true;
    } else if (isIOS) {
      alert(
        "Para instalar MI NEGOCIO en iPhone:\n\n" +
        "1. Pulsa Compartir.\n" +
        "2. Selecciona Agregar a pantalla de inicio.\n" +
        "3. Confirma."
      );
    }
  });

  window.addEventListener("appinstalled", () => {
    installButton.hidden = true;
  });
})();
