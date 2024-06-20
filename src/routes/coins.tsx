import express from 'express';
import coingecko from '../lib/coingecko';

const router = express.Router();

router.get('/coins', (_req, res) => {
  return res.status(200).json({ coins: coingecko.db.getAll() });
});

router.get('/coins/:id', (req, res) => {
  const now = Date.now();
  const { id } = req.params;
  const { minutes = '60' } = req.query;
  const coin = coingecko.db.get(id);

  if (!coin) return res.status(404).json({ message: `Coin, ${id}, not found` });

  const history = coin.history.filter((item) => {
    const time = new Date(item.date).getTime();
    return time >= now - +minutes * 60000;
  });

  return res.status(200).json({
    coin: {
      ...coin,
      history,
    },
  });
});

export default router;
