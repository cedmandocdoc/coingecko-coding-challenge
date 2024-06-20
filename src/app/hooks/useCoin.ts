import { useEffect, useState } from 'react';
import Coin from '../../models/Coin';
import { delay } from '../../lib/async';

const DELAY = import.meta.env.VITE_API_FETCH_INTERVAL?.toString() || '5000';

type Query = {
  minutes: string;
};

const useCoin = (id: string, query: Query) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ coin: Coin | undefined }>({
    coin: undefined,
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const getCoin = () => {
      const params = new URLSearchParams(query);
      fetch(`/api/coins/${id}?${params.toString()}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .then(() => delay(parseInt(DELAY)))
        .then(getCoin);
    };

    getCoin();

    return () => controller.abort();
  }, [id, JSON.stringify(query)]);

  return { data, loading };
};

export default useCoin;
