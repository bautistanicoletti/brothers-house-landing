# Brother's House · Landing page

Sitio estático: HTML, CSS y JavaScript vanilla. No necesita build ni backend: se sube tal cual a Hostinger.

```
index.html          Estructura de la página + SEO / Open Graph
config.js           ← TODOS los datos editables (precios, horarios, textos, WhatsApp, GA4)
css/styles.css      Estilos
js/main.js          Lógica: arma las secciones, el quiz y la medición (no hace falta tocarlo)
assets/img/         hero.webp, logo.webp/png, og-image.jpg, favicons
assets/fonts/       Tipografías Anton y Barlow (alojadas en el sitio, sin Google Fonts)
.htaccess           HTTPS, compresión y caché para Hostinger
```

**Demo publicada:** https://bautistanicoletti.github.io/brothers-house-landing/ (GitHub Pages, se actualiza sola con cada `git push` a `main`, en uno o dos minutos).

---

## 1. Cómo editar `config.js`

Abrilo con cualquier editor de texto (Bloc de notas, VS Code, o el editor del Administrador de archivos de Hostinger). Cada bloque tiene comentarios que explican qué hace.

| Querés cambiar… | Buscá el bloque |
|---|---|
| Precios o lo que incluye cada plan | `planes.items` → `precio: 35000` (número sin puntos ni `$`) |
| Plan destacado ("Más elegido") | `destacado: true` en un solo plan |
| Horarios | `horarios.items` → `turnos: [["08:00", "11:30"], ["14:00", "22:00"]]` · `[]` = cerrado |
| Número de WhatsApp | `whatsapp.numero` (formato `549` + característica + número, sin `+` ni espacios) |
| Titular, subtítulo y botones del hero | `hero` |
| Beneficios | `beneficios.items` (íconos disponibles: `rutina`, `pesas`, `reloj`, `equipo`, `corazon`, `rayo`) |
| Qué plan recomienda el quiz | `quiz.recomendacion` → según los días elegidos, `plan:` es el `id` de un plan |
| Mensaje que llega por WhatsApp desde el quiz | `quiz.mensajeWhatsapp` (las `{palabras}` se reemplazan por las respuestas) |

Tips:
- En los títulos, lo que va entre `*asteriscos*` se pinta de rojo (o de negro sobre fondo rojo).
- Respetá comillas y comas. Si después de editar la página aparece vacía, casi siempre falta una coma o una comilla: abrí la consola del navegador (F12) y fijate el número de línea del error.
- Después de subir el cambio, recargá con **Ctrl+F5** (en el celular, cerrá y abrí la pestaña).

Lo que **no** está en `config.js`, a propósito:
- **Título, descripción y vista previa al compartir** (Open Graph): están en el `<head>` de `index.html`, porque WhatsApp, Instagram y Facebook no ejecutan JavaScript cuando leen el link.
- **Imágenes**: para cambiarlas, reemplazá el archivo en `assets/img/` **con el mismo nombre**. La foto del hero tiene que ser vertical (ideal 1080×1920 o más, en WebP o JPG de menos de 200 KB).

---

## 2. Cómo subir el sitio a Hostinger

1. Antes de subir, en `index.html` reemplazá `https://bautistanicoletti.github.io/brothers-house-landing/` por el dominio real (3 líneas: `canonical`, `og:url`, `og:image`).
2. Entrá a **hPanel → Sitios web → Administrar → Administrador de archivos** y abrí la carpeta `public_html`.
3. Borrá el `default.php` o `index.php` de ejemplo si existe.
4. Subí **todo el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `config.js`, `.htaccess` y las carpetas `css`, `js` y `assets`.
   - El `.htaccess` es un archivo oculto: si tu sistema no lo muestra, activá "mostrar archivos ocultos" o subilo aparte.
   - No hace falta subir `README.md` ni la carpeta `.claude`.
   - **Por FTP** (FileZilla): los datos están en hPanel → Archivos → Cuentas FTP. Conectate y arrastrá los archivos a `public_html`.
5. En hPanel → **Seguridad → SSL**, activá el certificado gratuito. El `.htaccess` ya redirige a `https://`.
6. Probá el sitio desde el celular y compartí el link por WhatsApp para ver la vista previa. Si la vista previa no se actualiza, pegá el link en el [Depurador de Facebook](https://developers.facebook.com/tools/debug/) y tocá "Volver a extraer".

Para actualizar precios u horarios más adelante: editá `config.js` y volvé a subir **solo ese archivo**.

---

## 3. Cómo configurar Google Analytics 4

1. Entrá a [analytics.google.com](https://analytics.google.com) → **Administrar → Crear → Propiedad** (zona horaria Argentina, moneda ARS).
2. Creá un **flujo de datos Web** con el dominio del sitio. Copiá el **ID de medición** (empieza con `G-`).
3. En `config.js` reemplazá `G-XXXXXXXXXX` por ese ID y subí el archivo.
4. Verificá en **Informes → Tiempo real** (o **Administrar → DebugView**) abriendo el sitio y tocando un botón.

Mientras el ID sea `G-XXXXXXXXXX` no se envía nada; los eventos aparecen en la consola del navegador (F12) como `[GA4 demo] …`, así que sirve para mostrarlos funcionando en la demo.

### Eventos que se registran

| Evento | Cuándo | Parámetros |
|---|---|---|
| `whatsapp_click` | Clic en **cualquier** botón de WhatsApp | `section`: `hero`, `planes`, `ubicacion`, `quiz_resultado`, `footer`, `footer_telefono`, `flotante` · `plan` (en planes y quiz) |
| `quiz_start` | Primera respuesta del quiz | — |
| `quiz_step` | Cada pregunta respondida (para ver en qué paso abandonan) | `step`, `question` |
| `quiz_complete` | Se muestra el resultado | `objetivo`, `experiencia`, `dias`, `horario`, `lesion`, `plan_recomendado` |
| `directions_click` | Clic en "Cómo llegar" | `section` |

### Para ver cuántas consultas genera la landing

1. **Administrar → Eventos** → marcá `whatsapp_click` (y `quiz_complete` si querés) como **evento clave**.
2. **Administrar → Definiciones personalizadas → Crear dimensión personalizada** (alcance: Evento) para `section` y `plan`. Así podés ver de qué sección viene cada consulta y qué plan pidió.
3. El número para mostrarle al dueño: **Informes → Interacción → Eventos → `whatsapp_click`**, desglosado por `section`.
