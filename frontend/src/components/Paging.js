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
    <ButtonGroup spacing="2">
      <Button onClick={onClick} value="10" size="sm">
        10
      </Button>
      <Button onClick={onClick} value="20" size="sm">
        20
      </Button>
      <Button onClick={onClick} value="50" size="sm">
        50
      </Button>
      <Button onClick={onClick} value="100" size="sm">
        100
      </Button>
    </ButtonGroup>
  );
};

export default Paging;
