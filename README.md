# Estrategias Que Venden — Landing Page

Landing page del ebook **"Estrategias Que Venden"** + asesoría 1-a-1.
Sitio 100 % estático: `index.html` + `styles.css` + `/images`.

## 🚀 Desplegar a Netlify (1 clic)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/antonio27cibrian-ship-it/Claudia)

Al darle al botón Netlify:
1. Te pide login (con GitHub, Google o email).
2. Conecta este repo automáticamente.
3. Lee `netlify.toml` y publica el sitio.
4. Cada `git push` a la rama re-despliega solo.

Te dará una URL tipo `https://estrategias-que-venden-xxx.netlify.app` que luego puedes cambiar a un dominio propio.

### Alternativa rápida (sin conectar repo)

Si solo quieres subirlo una vez para probar:

1. Abre <https://app.netlify.com/drop>
2. Arrastra la carpeta completa del proyecto.
3. Listo, URL en 5 segundos.

## 🌐 También está en GitHub Pages

URL pública: <https://antonio27cibrian-ship-it.github.io/Claudia/>
Se redespliega solo en cada push (workflow en `.github/workflows/pages.yml`).

## 📂 Estructura

```
Claudia/
├── index.html          ← Landing
├── styles.css          ← Estilos
├── netlify.toml        ← Config Netlify
├── images/             ← Fotos (4 archivos, ver images/README.md)
└── .github/workflows/  ← Despliegue a GitHub Pages
```

## ✏️ Para editar

- **Cambiar copy:** edita `index.html`.
- **Cambiar colores / tamaños:** edita `styles.css` (variables CSS al inicio).
- **Cambiar precio o link de pago:** busca `pago.clip.mx` en `index.html`.
- **Cambiar número de WhatsApp:** busca `wa.me/52...` en `index.html`.
