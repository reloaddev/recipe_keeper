This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

In order to run the project locally, you need to have Node.js and Python installed.
Moreover, you need an PostgreSQL instance running locally. You can use the following
commands to start the local environment.

```bash
# Start the NextJS application (frontend)
npm run dev

# Start the ScrapyRT application (backend)
source ./bin/activate
scrapyrt

# Start PostgreSQL v16 with Brew
brew services start postgresql@16
```

Note: Using brew to install PostgreSQL is only one of many options.
