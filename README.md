# AntiDOBOT

Extension MV3 para ocultar o reemplazar el avatar del chatbot del campus (UNAD) **solo en tu navegador**. Permite elegir un modo fijo y, opcionalmente, usar una imagen personalizada.

## Modos
- `Nothing`: no hace nada.
- `Delete`: oculta el avatar (`display: none`).
- `Raiden`: reemplaza el avatar con un GIF predefinido.
- `Neuvillette`: reemplaza el avatar con un GIF predefinido.
- `Custom`: reemplaza el avatar con la URL que escribas en el popup.

## Cómo funciona
El content script observa cambios del DOM y aplica el modo seleccionado a los elementos que coinciden con estos selectores:
- `#avatar_active_image_small`
- `#avatar_active_image`
- `.pop-up-avatar`

Si el avatar cambia dinámicamente, el `MutationObserver` vuelve a aplicar el modo.

## Instalación (Chrome / Edge)
1. Abre `chrome://extensions` o `edge://extensions`.
2. Activa **Modo desarrollador**.
3. Haz clic en **Cargar descomprimida** y selecciona esta carpeta.
4. Abre el popup de la extensión y selecciona el modo.

## Uso del modo Custom
1. Selecciona `Custom` en el popup.
2. Pega una URL de imagen/GIF en el textarea.
3. Pulsa **Aplicar URL**.

El contenido se guarda en `chrome.storage.sync` y se aplica automáticamente.

## Permisos
- `storage`: para guardar el modo seleccionado y la URL personalizada.

## Estructura del proyecto
- `manifest.json`: manifiesto MV3.
- `content.js`: lógica que modifica el avatar en la página.
- `popup.html`: UI del popup.
- `popup.css`: estilos del popup.
- `popup.js`: lógica del popup (selección de modo y custom URL).

## Notas
- Por defecto, la extensión corre en todas las páginas (`"<all_urls>"`). Si quieres restringirla a un dominio específico, edita `manifest.json` y reemplaza `"<all_urls>"` por el dominio del campus.

## Licencia
- Este proyecto se distribuye bajo la licencia **MIT**.
- El icono de la extensión fue creado originalmente por **[Flowicon](https://www.flaticon.es/autores/flowicon)**, yo solo modifique un poco. Este icono esta bajo la licencia de **[Flaticon](https://www.flaticon.es/legal)**.

## Descargo de responsabilidad
Este proyecto **no tiene relación alguna** con la UNAD, su administración ni con los desarrolladores del campus virtual.  
Es un desarrollo independiente creado por un tercero.

## Uso
El uso de esta extensión es responsabilidad exclusiva del usuario.  
Utilízala bajo tu propio criterio.
