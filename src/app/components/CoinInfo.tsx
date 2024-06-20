import React, { useMemo } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import useCoin from '../hooks/useCoin';
import Loader from './Loader';
import Caret from './Caret';
import CoinInfoPrices from './CoinInfoPrices';
import CoinInfoChart from './CoinInfoChart';
import ReadMore from './ReadMore';
import CoinInfoSelect from './CoinInfoSelect';

const CoinInfo = () => {
  const { push } = useHistory();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const minutes = search.get('minutes') || '60';

  const { data, loading } = useCoin(id, { minutes });
  const { coin } = data;

  return (
    <section className="w-full max-w-[900px]">
      {loading && <Loader />}
      {coin && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Link to="/coins">
              <Caret className="rotate-90 w-4 h-4" />
            </Link>
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10"
                src={coin.image.small}
                alt="Sunset in the mountains"
              />
              <p className="text-xl grow font-bold">{coin.name}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <CoinInfoPrices coin={coin} />
            <CoinInfoSelect
              value={minutes}
              onChange={(minute) => push(`/coins/${coin.id}?minutes=${minute}`)}
            />
          </div>
          <CoinInfoChart coin={coin} />
          <ReadMore text={coin.description} className="text-sm text-gray-700" />
        </div>
      )}
    </section>
  );
};

export default CoinInfo;
