import React, { useState } from 'react';

const Paging = ({ setNumberOfPage, setPage }) => {
  const [number, setNumber] = useState(20);
  const onClick = (event) => {
    const {
      target: { value },
    } = event;
    setNumberOfPage(parseInt(value));
    setPage(0);
  };

  return (
    <div>
      <button onClick={onClick} value="10">
        10
      </button>
      <button onClick={onClick} value="20">
        20
      </button>
      <button onClick={onClick} value="50">
        50
      </button>
      <button onClick={onClick} value="100">
        100
      </button>
    </div>
  );
};

export default Paging;
