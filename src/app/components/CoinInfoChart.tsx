import React, { FC, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Coin from '../../models/Coin';

type Props = {
  coin: Coin;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const CoinInfoChart: FC<Props> = ({ coin }) => {
  const { latest, average } = coin;
  const climbing = useMemo(() => latest > average, [latest, average]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${coin.name} (${coin.symbol.toUpperCase()}) trend`,
      },
    },
  };

  const labels = coin.history.map((item) =>
    Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(item.date))
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: coin.history.map((item) => item.price),
        borderColor: climbing ? 'rgb(34 197 94)' : 'rgb(239 68 68)',
        backgroundColor: 'white',
      },
    ],
  };

  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default CoinInfoChart;
