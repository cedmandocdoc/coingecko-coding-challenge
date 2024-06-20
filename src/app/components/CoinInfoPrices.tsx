import React, { FC, useMemo } from 'react';
import Coin from '../../models/Coin';
import Caret from './Caret';

type Props = {
  coin: Coin;
};

const CoinInfoPrices: FC<Props> = ({ coin }) => {
  const { latest, average } = coin;

  const climbing = useMemo(() => latest >= average, [latest, average]);
  return (
    <div className="flex flex-col gap-2">
      <p>
        <span className="text-sm">Current: </span>
        <span className="text-lg font-bold pr-2">
          {Intl.NumberFormat('eu', {
            style: 'currency',
            currency: 'EUR',
          }).format(coin.latest)}
        </span>
        <Caret
          className={
            climbing
              ? 'text-green-500 rotate-180 inline-block'
              : 'text-red-500 inline-block'
          }
        />
      </p>
      <p>
        <span className="text-sm">Average: </span>
        <span className="text-lg font-bold">
          {Intl.NumberFormat('eu', {
            style: 'currency',
            currency: 'EUR',
          }).format(coin.average)}
        </span>
      </p>
    </div>
  );
};

export default CoinInfoPrices;
