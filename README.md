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

## Coinbase Advanced API balances

La ruta `GET /api/coinbase/balances` consulta `GET /api/v3/brokerage/accounts` de Coinbase Advanced API desde el servidor y devuelve balances en JSON sin enviar claves al cliente.

Variables requeridas en `.env.local` o Vercel:

```bash
COINBASE_ADVANCED_API_KEY=organizations/{org_id}/apiKeys/{key_id}
COINBASE_ADVANCED_PRIVATE_KEY="-----BEGIN EC PRIVATE KEY-----\n...\n-----END EC PRIVATE KEY-----"
```

Variable opcional recomendada para proteger el endpoint de balances:

```bash
COINBASE_BALANCES_ACCESS_TOKEN=un-token-interno-largo-y-seguro
```

Si configuras `COINBASE_BALANCES_ACCESS_TOKEN`, llama la ruta con:

```bash
curl -H "Authorization: Bearer $COINBASE_BALANCES_ACCESS_TOKEN" http://localhost:3000/api/coinbase/balances
```

## Entrega de correo

Los formularios usan Resend. Configura `RESEND_API_KEY` en Vercel para Production y Preview. Después de renovar la clave, crea un nuevo despliegue para que las funciones usen el valor actualizado.
