import React, { FC, useState } from 'react';
import Caret from './Caret';

type Props = {
  text: string;
  className?: string;
};

const ReadMore: FC<Props> = ({ text, className }) => {
  const [open, setOpen] = useState(false);

  if (!open)
    return (
      <div className="flex items-center">
        <p
          className={`text-ellipsis whitespace-nowrap overflow-hidden ${className}`}
          dangerouslySetInnerHTML={{ __html: text }}
        />

        <button onClick={() => setOpen(true)}>
          <Caret />
        </button>
      </div>
    );

  return (
    <div className="">
      <span className={className} dangerouslySetInnerHTML={{ __html: text }} />

      <button className="inline-block" onClick={() => setOpen(false)}>
        <Caret className="rotate-180" />
      </button>
    </div>
  );
};

export default ReadMore;
