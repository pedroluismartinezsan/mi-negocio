(() => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(err => {
        console.error("No se pudo activar el modo instalable:", err);
      });
    });
  }
  const frame = document.getElementById("negocio");
  const status = document.getElementById("estado");
  if (frame && status) {
    frame.addEventListener("load", () => {
      status.textContent = "Aplicación conectada";
      window.setTimeout(() => status.remove(), 1800);
    });
  }
})();