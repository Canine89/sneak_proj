import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

const TableRow = ({
  rank,
  sales_point,
  publish_date,
  crawl_date,
  title,
  publisher,
  market,
  tags,
  isbn,
  setClickedRow,
}) => {
  console.log(tags)
  const tagsMaker = tags.map((element, index) => {
    return element + ' ';
  });

  // 그래프 렌더링 함수
  const renderingGraph = (event) => {
    setClickedRow(isbn);
  };

  // 출간일 대비 할까 말까
  // publish_date = publish_date.slice(0, 7);
  // const date = new Date();
  // const book_day = new Date(publish_date);
  // const past_day = parseInt((date - book_day) / (1000*60*60*24))

  return (
    <Tr onClick={renderingGraph}>
      <Td>{rank}</Td>
      <Td>{sales_point}</Td>
      {/* <Td>{parseInt(sales_point / past_day)}</Td> */}
      <Td>{publish_date.slice(0, 7)}</Td>
      <Td>{title}</Td>
      <Td>{publisher}</Td>
      <Td>{market}</Td>
      <Td>{tagsMaker.slice(2, 5) + '...'}</Td>
    </Tr>
  );
};

export default TableRow;
