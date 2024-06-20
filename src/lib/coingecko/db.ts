import Coin from '../../models/Coin';

const db: Coin[] = [];

const get = (id: string) => db.find((coin) => coin.id === id);

const getAll = () => db;

type UpsertData = Omit<Coin, 'average' | 'history' | 'count' | 'latest'> & {
  price: number;
};

const upsert = (id: string, data: UpsertData) => {
  const index = db.findIndex((coin) => coin.id === id);

  if (index === -1)
    db.push({
      ...data,
      average: data.price,
      latest: data.price,
      count: 1,
      history: [{ date: new Date(), price: data.price }],
    });
  else {
    db[index].history.push({ date: new Date(), price: data.price });
    db[index].count++;
    db[index].latest = data.price;
    db[index].average =
      db[index].history
        .map((item) => item.price)
        .reduce((total, price) => price + total, 0) / db[index].history.length;
  }
};

export default {
  get,
  getAll,
  upsert,
};
