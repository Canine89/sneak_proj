import React, { useState } from 'react';
import { Input, Button, Grid, GridItem } from '@chakra-ui/react';

const Search = ({ setSearchKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'keyword') {
      setKeyword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchKeyword(keyword);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        pb={4}
      >
        <GridItem colSpan={2}>
          <Input
            name="keyword"
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={onChange}
          />
        </GridItem>
        <Button type="submit">검색!</Button>
      </Grid>
    </form>
  );
};

export default Search;
