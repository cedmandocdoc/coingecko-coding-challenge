import React, { FC } from 'react';

type Props = {
  onChange?: (data: number) => void;
  value?: string;
};

const options = [1, 3, 5, 10, 20, 30, 40, 50, 60];

const CoinInfoSelect: FC<Props> = ({ onChange, value }) => (
  <form className="flex gap-2 items-center self-start">
    <label
      htmlFor="minutes"
      className="block text-xs font-medium text-gray-700 dark:text-white"
    >
      Trend for the last:
    </label>
    <select
      id="minutes"
      value={value}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => onChange?.(+e.target.value)}
    >
      {options.map((option) => (
        <option value={option}>
          {option} {option > 1 ? 'mins' : 'min'}
        </option>
      ))}
    </select>
  </form>
);

export default CoinInfoSelect;
