import { useEffect, useState } from 'react';
import Coin from '../../models/Coin';
import { delay } from '../../lib/async';

const DELAY = import.meta.env.VITE_API_FETCH_INTERVAL?.toString() || '5000';

const useCoins = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ coins: Coin[] }>({ coins: [] });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const getCoins = () => {
      fetch('/api/coins', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .then(() => delay(parseInt(DELAY)))
        .then(getCoins);
    };

    getCoins();

    return () => controller.abort();
  }, []);

  return { data, loading };
};

export default useCoins;
