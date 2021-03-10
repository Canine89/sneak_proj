import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

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
    <ButtonGroup spacing="2" mt={2} al>
      <Button size="xs" isDisabled>열 개수 설정(보고서는 1이 적절합니다)</Button>
      <Button onClick={onClick} value="1" size="xs">
        1
      </Button>
      <Button onClick={onClick} value="5" size="xs">
        5
      </Button>
      <Button onClick={onClick} value="10" size="xs">
        10
      </Button>
      <Button onClick={onClick} value="20" size="xs">
        20
      </Button>
      <Button onClick={onClick} value="50" size="xs">
        50
      </Button>
      <Button onClick={onClick} value="100" size="xs">
        100
      </Button>
    </ButtonGroup>
  );
};

export default Paging;
