import React, { useState } from 'react';
import { Input, Button, Grid, GridItem } from '@chakra-ui/react';
import { Checkbox, Stack } from "@chakra-ui/react"


const Search = ({ setSearchKeyword, setDoSearchTitle, setDoSearchPublisher, setDoSearchTags }) => {
  const [keyword, setKeyword] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'keyword') {
      setKeyword(value);
    }
  };

  const onChangeDoSearchTitle = (event) => {
    console.log(event.target.checked);
    setDoSearchTitle(event.target.checked);
  }

  const onChangeDoSearchPublisher = (event) => {
    setDoSearchPublisher(event.target.checked);
  }

  const onChangeDoSearchTags = (event) => {
    setDoSearchTags(event.target.checked);
  }

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
        <Stack spacing={1} direction="row">
          <Checkbox onChange={onChangeDoSearchTitle}>제목</Checkbox>
          <Checkbox onChange={onChangeDoSearchPublisher}>출판사</Checkbox>
          <Checkbox onChange={onChangeDoSearchTags}>카테고리+태그</Checkbox>
        </Stack>
        <Button type="submit">검색!</Button>
      </Grid>
    </form>
  );
};

export default Search;
