---
title: Cómo monté este blog con Eleventy
description: Un resumen rápido de cómo está armado este sitio y por qué elegí Eleventy para escribir sobre temas técnicos.
date: 2026-09-08
---

Este es el primer artículo del blog. La idea es simple: escribir sobre lo que voy aprendiendo trabajando como Software Engineer, desde notas rápidas hasta guías más largas, usando archivos Markdown como única fuente de contenido.

## ¿Por qué Eleventy?

Elegí [Eleventy](https://www.11ty.dev/) porque:

- No necesita un framework de frontend para funcionar.
- Genera HTML estático, rápido de servir y fácil de desplegar.
- Cada artículo es simplemente un archivo `.md` con un poco de front matter.

## Estructura del proyecto

- `src/_includes/`: layouts base y de artículo.
- `src/_data/`: datos globales, como la información de contacto de la landing page.
- `src/posts/`: los artículos del blog en Markdown.
- `src/assets/`: CSS y estáticos.
- `src/index.njk`: la landing page.

## Próximos pasos

Con el scaffolding listo, el plan es ir agregando artículos según vaya resolviendo problemas interesantes o aprendiendo algo que valga la pena documentar.
