# Coingecko Coding Challenge

## Quickstart

```shell
npm install && npm run build && npm start
```

Server is running at http://localhost:3001 by default.

The environment variables for development were included for an easy running of the application and can be found at `.env.development`, but usually api keys should not be included. The project uses dotenv, example environment can be found at `.env.example`.

## Running in Development

```shell
npm run dev
```

## Overriding environment variables

Create `.env` file on root folder and copy the values from `.env.example`, it should be runnable by default, but update the values accordingly

### Default values

```
PORT=3001 # backend port
VITE_API_URL=https://api.coingecko.com/api/v3
VITE_API_KEY=CG-8yR4X6oVpUdyqWbWrcztCsxM
VITE_API_HEADER_KEY=x-cg-demo-api-key
VITE_API_FETCH_INTERVAL=5000 # interval on fetching from coingecko in milliseconds
VITE_API_MAX_RETRY_ERROR=5 # max retry if api throws an error
```
