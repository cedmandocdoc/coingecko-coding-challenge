type Coin = {
  id: string;
  symbol: string;
  name: string;
  description: string;
  homepage: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };

  // least requirements
  average: number;
  history: { date: Date; price: number }[];
  count: number;
  latest: number;
};

export default Coin;
