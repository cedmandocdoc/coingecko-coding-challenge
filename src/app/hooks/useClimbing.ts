import { useMemo } from 'react';
import Coin from '../../models/Coin';

const useClimbing = (coin: Coin) => {
  const { latest, history, average } = coin;
  return useMemo(() => {
    const price = history[history.length - 2]?.price || average;
    return latest >= price;
  }, [latest, history, average]);
};

export default useClimbing;
