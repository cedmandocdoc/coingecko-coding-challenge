import React from 'react';
import useCoins from '../hooks/useCoins';
import Loader from './Loader';
import CoinCard from '../components/CoinCard';

const Coins = () => {
  const { data, loading } = useCoins();
  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-3">
        {data.coins.map((coin) => (
          <CoinCard coin={coin} key={coin.id} />
        ))}
      </div>
    </>
  );
};

export default Coins;
