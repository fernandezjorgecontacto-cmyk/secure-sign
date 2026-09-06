# Estudio Notarial & Jurídico ARAÚJO

Sitio web oficial del Estudio Notarial & Jurídico ARAÚJO.

Sede: Cayetano Silva casi Av. Juana de América, El Tesoro, La Barra, Punta del Este.
Trabajamos en Maldonado, La Barra, Punta del Este y con clientes del exterior.

- Teléfono / WhatsApp: +598 99 852 911
- Email: araujoescribania@gmail.com
- Horario: Lunes a Viernes · 09:30 – 18:30

## Desarrollo

Requiere Node.js 22+ y npm, o Bun.

```sh
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
npm install
npm run dev
```

Con Bun:

```sh
bun install
bun run dev
```

## Variables de entorno

Copiá `.env.example` como `.env` y completá las variables de Supabase para ejecutar el proyecto localmente.

```sh
cp .env.example .env
```

El archivo `.env` está ignorado por Git y **no debe subirse al repositorio**.

## Deploy en Cloudflare Workers

Este proyecto está preparado para **Cloudflare Workers + GitHub** y no depende de una plataforma de generación o hosting específica.

### Deploy desde GitHub

1. Subí el contenido de este proyecto a un repositorio de GitHub.
2. En Cloudflare, entrá a **Workers & Pages → Create application → Import a repository**.
3. Seleccioná el repositorio de GitHub.
4. Usá `npm run build` como **Build command**.
5. Usá `npx wrangler deploy` como **Deploy command**.
6. Configurá las variables de entorno de `.env.example` en Cloudflare si vas a utilizar Supabase.

Cloudflare Workers Builds puede volver a desplegar automáticamente cada vez que hagas push al repositorio conectado.

### Deploy local con Wrangler

```sh
npm install
npm run build
npx wrangler deploy
```

## Tecnologías

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- Supabase
- Vite + Nitro
