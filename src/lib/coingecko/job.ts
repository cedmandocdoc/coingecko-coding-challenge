import Coins from '../../enums/Coins';
import db from './db';
import { delay } from '../async';

import dotenv from 'dotenv';
dotenv.config();

const {
  VITE_API_URL = 'https://api.coingecko.com/api/v3',
  VITE_API_KEY = 'CG-8yR4X6oVpUdyqWbWrcztCsxM',
  VITE_HEADER_KEY = 'x-cg-demo-api-key',
  VITE_API_FETCH_INTERVAL = '5000',
  VITE_API_MAX_RETRY_ERROR = '5',
} = process.env;

let retry = 0;
const options = {
  method: 'GET',
  headers: { accept: 'application/json', [VITE_HEADER_KEY]: VITE_API_KEY },
};

const getCoin = (coin: Coins) =>
  fetch(`${VITE_API_URL}/coins/${coin}`, {
    ...options,
  }).then((res) => res.json());

const updateCoin = (data: any) =>
  db.upsert(data.id, {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    description: data.description.en,
    homepage: data.links.homepage,
    image: data.image,
    price: data.market_data.current_price.eur,
  });

const job = () => {
  console.log('Coingecko job is fetching');
  const coins = Object.values(Coins) as Coins[];

  // just a simple job interval
  Promise.all(coins.map(getCoin))
    .then((coins) => coins.forEach(updateCoin))
    .then(() => delay(parseInt(VITE_API_FETCH_INTERVAL)))
    .then(job)
    .catch(() => {
      if (retry++ <= parseInt(VITE_API_MAX_RETRY_ERROR)) {
        console.log('Coingecko job experience an error, re-running...');
        job();
      } else {
        console.log(
          'Coingecko job max retry error has reach its limit, stopping the job...'
        );
      }
    });
};

export default job;
