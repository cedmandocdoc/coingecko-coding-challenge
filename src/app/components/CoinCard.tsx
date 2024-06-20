import React, { FC, useMemo } from 'react';
import Coin from '../../models/Coin';
import Arrow from './Arrow';
import Caret from './Caret';
import { Link } from 'react-router-dom';
import useClimbing from '../hooks/useClimbing';

type Props = {
  coin: Coin;
};

const CoinCard: FC<Props> = ({ coin }) => {
  const { id, name, history, image } = coin;

  const lastUpdated = useMemo(() => {
    const last = history[history.length - 1];

    if (!last) return null;

    return Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(last.date));
  }, [history]);

  const climbing = useClimbing(coin);

  return (
    <div className="w-96 max-w-full rounded overflow-hidden shadow-lg">
      <div className="p-4 flex items-center gap-2">
        <img
          className="w-10 h-10"
          src={image.small}
          alt="Sunset in the mountains"
        />
        <p className="text-lg grow">{name}</p>
        <p
          className={`font-bold ${
            climbing ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {Intl.NumberFormat('eu', {
            style: 'currency',
            currency: 'EUR',
          }).format(coin.latest)}
        </p>
        <Caret
          className={climbing ? 'text-green-500 rotate-180' : 'text-red-500'}
        />
      </div>
      <div className="flex justify-between items-center p-4">
        {lastUpdated && (
          <span className="text-xs font-semibold text-gray-700">
            Last updated: <span className="font-bold">{lastUpdated}</span>
          </span>
        )}

        <Link
          to={`/coins/${id}?minutes=60`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <Arrow />
        </Link>
      </div>
    </div>
  );
};

export default CoinCard;
