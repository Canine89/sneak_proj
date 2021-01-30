import React from 'react';

const TableRow = ({ rank, title, publisher, market, tags }) => {
  const tagsMaker = tags.map((element) => {
    return <td>{element}</td>;
  });
  return (
    <tr>
      <td>{rank}</td>
      <td>{title}</td>
      <td>{publisher}</td>
      <td>{market}</td>
      {tagsMaker}
    </tr>
  );
};

export default TableRow;
