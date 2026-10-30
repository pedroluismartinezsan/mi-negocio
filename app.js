
(() => {

  const installButton =
    document.getElementById("installButton");

  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1
    );

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  // Registrar el Service Worker
  if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

      navigator.serviceWorker
        .register("./service-worker.js")
        .catch(error => {
          console.error(
            "Error registrando PWA:",
            error
          );
        });

    });

  }

  // Detectar instalación
  if (isStandalone) {
    installButton.hidden = true;
  }

  let installPrompt = null;

  // Android y navegadores compatibles
  window.addEventListener(
    "beforeinstallprompt",
    event => {

      event.preventDefault();

      installPrompt = event;

      installButton.hidden = false;

    }
  );

  // Botón de instalación
  installButton.addEventListener(
    "click",
    async () => {

      if (!installPrompt) {

        if (isIOS) {

          alert(
            "Para instalar MI NEGOCIO en iPhone:\n\n" +
            "1. Pulsa el botón Compartir.\n" +
            "2. Selecciona Agregar a pantalla de inicio.\n" +
            "3. Confirma la instalación."
          );

        }

        return;
      }

      installPrompt.prompt();

      await installPrompt.userChoice;

      installPrompt = null;

      installButton.hidden = true;

    }
  );

  // Confirmar instalación
  window.addEventListener(
    "appinstalled",
    () => {

      installButton.hidden = true;

      console.log(
        "MI NEGOCIO fue instalada correctamente."
      );

    }
  );

})();
