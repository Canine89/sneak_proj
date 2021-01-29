import React from 'react';

const TableRow = ({ rank, title, publisher, market }) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{title}</td>
      <td>{publisher}</td>
      <td>{market}</td>
    </tr>
  );
};

export default TableRow;
