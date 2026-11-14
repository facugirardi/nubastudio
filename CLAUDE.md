# Nuba Frontend — CLAUDE.md

## Qué es este proyecto
Sitio institucional de **Nuba Studio**, una agencia digital que hace páginas web, apps, marketplaces y productos digitales. Es la carta de presentación de la agencia — debe transmitir creatividad, profesionalismo y calidad.

## Stack
- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — para animaciones de scroll y micro-interacciones
- **DM Sans** — fuente principal (ya configurada en `layout.tsx`)
- Framer Motion estaba en la versión anterior (branch `main`) — en el nuevo diseño preferir GSAP

## Colores
| Token | Valor |
|---|---|
| Negro | `#000000` |

| Blanco | `#ffffff` |
| Acento lima | `#C6FF00` |

Los colores pueden cambiar — no es definitivo.

## Logo
- SVG en `/public/Nuba logo.svg` — nube estilizada con path stroke negro
- Para fondo oscuro: cambiar stroke a blanco o `#C6FF00`

## Casos de portafolio
Los datos están en el branch `main` en `app/page.tsx` como array `works`. Los casos son:
- **Nuddo** — web & mobile
- **FFMates**
- **Kennedy's**
- **CheckRTO**

Las imágenes están en `/public/images/cases/`.

## Estructura de secciones (nueva versión)
1. **Hero** — fullscreen, tagline grande, video/imagen de fondo, scroll indicator
2. **Works** — grid de proyectos con hover effects
3. **About** — quiénes somos, filosofía
4. **Services** — qué hacemos (web, apps, marketplaces)
5. **Contact** — CTA grande + email + redes

Puede ser one-pager o multi-página — está por definir.

## Animaciones y micro-interacciones acordadas
- GSAP ScrollTrigger para reveals de secciones
- Cursor personalizado (círculo que sigue el mouse)
- Loader inicial antes de mostrar la página
- Parallax sutil en el hero
- Hover reveal de imagen al pasar sobre nombre de proyecto
- Fade-in escalonado de texto en viewport
- Marquee de texto horizontal (servicios, tecnologías, clientes)
- Transiciones de página suaves

## Referencias de diseño
- **Son Daven** (sondaven.com) — oscuro lujoso, SVG transitions, loader con %, parallax
- **REF Digital** (ref.digital) — agencia limpia, hover video en proyectos
- **Pacôme Pertant** (pacomepertant.com) — inmersivo, marquee, GSAP
- **Tresmares Capital** — estructura corporativa clara

## Idiomas y SEO (en / es)
- El inglés es el idioma raíz (`/`, `/about`, `/cases/x`) y el español vive bajo `/es` (`/es`, `/es/about`…). `/en/...` redirige (308) a la URL sin prefijo.
- Las páginas viven en `app/[lang]/…` y `proxy.ts` traduce la URL pública a la interna (rewrite a `/en/...`). El layout raíz (`app/[lang]/layout.tsx`) pone `<html lang>` y le pasa `lang` al `LanguageProvider`: el idioma sale de la URL, no del navegador, así el HTML ya sale traducido del servidor.
- Los 404 los resuelve `app/global-not-found.tsx` (necesita `experimental.globalNotFound`); el idioma le llega por el header `x-site-lang` que pone el proxy.
- Helpers en `app/lib/lang.ts` (puros, sirven en servidor y cliente: `localePath`, `stripLocale`…). En componentes: `const { lang, path } = useLanguage()` y `path("/about")` para todo link interno. Cambiar de idioma es un link real al mismo path en el otro idioma (`Navbar`).
- Todo el SEO por idioma está en `app/lib/seoText.ts` (títulos, descripciones, Open Graph, JSON-LD, llms.txt) y, para cada case, en `seoTitle`/`seoDescription` de `works.ts` (inglés) y `works.es.ts` (español). `app/lib/pageMeta.ts` arma canonical + hreflang (`en`, `es`, `x-default`), Open Graph y Twitter: cada página usa `pageMetadata()` en su `generateMetadata` (Next reemplaza, no mezcla, los objetos `openGraph`/`twitter` del layout). Cada traducción tiene su propio canonical.
- El dominio canónico es `https://www.nuba.studio` (Vercel redirige el apex a www). No hay cuenta de X: no usar `twitter:site`.
- Rutas: `/` landing, `/works` portfolio (espiral), `/about`, `/services`, `/contact`, `/cases/[slug]`. Los casos con `hidden: true` salen con `noindex`.
- GSAP: `SmoothScroll` no registra ScrollTrigger; cada componente o hook que lo use hace `gsap.registerPlugin(ScrollTrigger)`.
- **Blog:** artículos en `app/data/blog/posts/` (un archivo por post, en/es). El slug en español sale de `app/data/blog/slugs.ts` (agregar ahí cada post nuevo); en el cuerpo los links a otros posts van con el slug en inglés y sin idioma, `PostBody` los traduce. Un post con `date` futura queda programado: da 404 y no aparece en listados, sitemap ni llms.txt hasta ese día (medianoche de Argentina, ISR cada 1 h). El autor sale de `postAuthor` (por categoría, o `author` en el post).
- **Landings de servicio** (`/services/[slug]`): contenido en `app/data/services/pages/` (un archivo por servicio, en/es, con H1, body, FAQ, casos y posts relacionados) y slugs por idioma en `app/data/services/slugs.ts`. Salen solas en el dropdown del Navbar, sitemap, llms.txt y JSON-LD. `translatePath` (`app/lib/translatePath.ts`) traduce slugs de blog y servicios al cambiar de idioma y en el redirect del proxy.
- Una página nueva: crearla en `app/[lang]/…`, usar `pageMetadata`, agregarla a `app/sitemap.ts` y sumar sus textos a `seoText.ts`. `llms.txt` sale de `app/lib/llms.ts` (`/llms.txt` en inglés, `/es/llms.txt` en español).

## Convenciones
- Fondo oscuro (negro) como base — texto blanco
- Acento `#C6FF00` para CTAs, highlights, bordes activos
- Sin comentarios innecesarios en el código
- Componentes en `app/components/`
