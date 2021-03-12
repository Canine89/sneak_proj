import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const Pagiantion = ({ numberOfPage, page, setPage, searchTabledatas }) => {
  // 페이지네이션 함수

  const tableLength = searchTabledatas.length;
  const pagingLength = Math.ceil(tableLength / numberOfPage);
  const paging = [...Array(pagingLength).keys()];
  const pagingMaker = paging.map((element, index) => {
    return (
      <Button
        key={index}
        onClick={() => setPage(element)}
        size="xs"
        isActive={element === page ? true : false}
      >
        {element + 1}
      </Button>
    );
  });

  const frontPaging = pagingMaker.slice(page, page + 5);
  const rearPaging = pagingMaker.slice(pagingLength - 5, pagingLength);

  return (
    <ButtonGroup spacing="1" mt={2}>
      {page > 0 ? (
        <Button size="xs" onClick={() => setPage(page - 1)}>
          ←
        </Button>
      ) : (
        ''
      )}
      {frontPaging} <Button size="xs">...</Button> {rearPaging}
      {page < 50 ? (
        <Button size="xs" onClick={() => setPage(page + 1)}>
          →
        </Button>
      ) : (
        ''
      )}
    </ButtonGroup>
  );
};

export default Pagiantion;
