import React from 'react';

const TableRow = ({ rank, title, publisher, market, tags }) => {
  const tagsMaker = tags.map((element) => {
    return element + ' ';
  });
  return (
    <tr>
      <td>{rank}</td>
      <td>{title}</td>
      <td>{publisher}</td>
      <td>{market}</td>
      <td>{tagsMaker}</td>
    </tr>
  );
};

export default TableRow;
