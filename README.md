# Laniakea Alta Reserve Coffee

Web app inicial para **Laniakea Alta Reserve Coffee LLC**, una marca premium de cafe colombiano de Gramalote, Norte de Santander, creada en California.

## Estructura

```txt
app/
  api/checkout/route.ts
  cancel/page.tsx
  globals.css
  layout.tsx
  page.tsx
  success/page.tsx
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

## Stripe Checkout

El checkout ya crea una sesion de Stripe desde `app/api/checkout/route.ts`.

1. Crea un archivo `.env.local`.
2. Copia las variables desde `.env.example`.
3. Agrega tu llave secreta de prueba de Stripe:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Corre la app:

```bash
npm install
npm run dev
```

Cuando el cliente presiona `Checkout`, la app lo envia a Stripe Checkout. Al terminar, Stripe lo regresa a `/success`; si cancela, regresa a `/cancel`.

## Publicacion

Ver `DEPLOYMENT.md` para el paso a paso de GitHub, Vercel y Stripe.
