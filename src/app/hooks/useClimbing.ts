import { useMemo } from 'react';
import Coin from '../../models/Coin';

const useClimbing = (coin: Coin) => {
  const { latest, history } = coin;
  return useMemo(() => {
    const price = Math.max(...history.map((item) => item.price));
    return latest >= price;
  }, [latest, history]);
};

export default useClimbing;
