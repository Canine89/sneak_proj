import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

const TableRow = ({
  rank,
  sales_point,
  title,
  publisher,
  market,
  tags,
  isbn,
  setClickedRow,
}) => {
  const tagsMaker = tags.map((element) => {
    return element + ' ';
  });

  // 그래프 렌더링 함수
  const renderingGraph = (event) => {
    setClickedRow(isbn);
  };

  return (
    <Tr onClick={renderingGraph}>
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
