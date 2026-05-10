# Laniakea Alta Reserve Coffee

Web app inicial para **Laniakea Alta Reserve Coffee LLC**, una marca premium de cafe colombiano de Gramalote, Norte de Santander, creada en California.

## Estructura

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Cart.tsx
  Contact.tsx
  Footer.tsx
  Header.tsx
  Hero.tsx
  ProductCard.tsx
  Products.tsx
  Story.tsx
data/
  products.ts
package.json
tailwind.config.ts
```

## Correr localmente

```bash
npm install
npm run dev
```

Despues abre:

```txt
http://localhost:3000
```

## Donde editar

- Productos, precios, fotos y descripciones: `data/products.ts`
- Textos principales de marca: `components/Hero.tsx` y `components/Story.tsx`
- Formulario de contacto y texto mayorista: `components/Contact.tsx`
- Colores premium: `tailwind.config.ts` y `app/globals.css`
- Variables para correo, telefono y Stripe futuro: `.env.example`

El boton de checkout todavia no procesa pagos reales. Esta preparado para conectar Stripe despues.

## Publicacion

Ver `DEPLOYMENT.md` para el paso a paso de GitHub, Vercel y Stripe.
