# MI NEGOCIO

PWA móvil que abre la aplicación de Google Apps Script y conserva Google Sheets como base de datos.

## Requisito de inserción

La página de GitHub Pages muestra la aplicación de Apps Script dentro de un iframe. Para permitir que se muestre, en el proyecto de Apps Script hay que reemplazar la función `doGet()` por:

```javascript
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('MI NEGOCIO')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Después guardar y crear una nueva implementación de tipo **Aplicación web**. Mantener la URL de implementación que aparece en `index.html` o actualizarla allí si Google entrega una URL nueva.

## Publicación

En GitHub: **Settings → Pages → Deploy from a branch → main → /(root) → Save**.

La PWA requiere internet para cargar la aplicación y guardar/consultar los datos. El service worker almacena únicamente los archivos de entrada de GitHub Pages; no almacena ni intercepta las operaciones de Google Sheets.

## Seguridad

La aplicación de Apps Script debe ejecutarse con la cuenta propietaria de la hoja y limitarse a los usuarios previstos. La opción `ALLOWALL` permite que otros sitios intenten incrustar la interfaz; no publiques datos sensibles ni compartas la URL con personas no autorizadas.