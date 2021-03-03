import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

const TableRow = ({ rank, sales_point, title, publisher, market, tags }) => {
  const tagsMaker = tags.map((element) => {
    return element + ' ';
  });
  console.log(tagsMaker);
  return (
    <Tr>
      <Td>{rank}</Td>
      <Td>{sales_point}</Td>
      <Td>{title}</Td>
      <Td>{publisher}</Td>
      <Td>{market}</Td>
      <Td>{tagsMaker}</Td>
    </Tr>
  );
};

export default TableRow;
