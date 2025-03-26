# Cupcake App

- 📖 [Remix docs](https://remix.run/docs)

## Development

```shellscript
docker-compose up -d 
```

## Running migrations

After building you app, run the prisma migrations

```sh
npm run prisma:migrate:deploy"
```

## Seeding Data:
Adds fake cupcake and pastry chef data to the postgres database

```sh
npm run seed-data
```

<!-- Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client` -->

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
