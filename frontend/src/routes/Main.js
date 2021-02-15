import React from 'react';
import { Grid, GridItem, Center } from '@chakra-ui/react';

const Main = () => {
  return (
    <Grid
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(2, 1fr)"
      h="512px"
      gap={4}
    >
      <Center bg="tomato" h="256px" color="white">
        콘텐츠 1
      </Center>

      <Center bg="tomato" h="256px" color="white">
        콘텐츠 1
      </Center>

      <Center bg="tomato" h="256px" color="white">
        콘텐츠 1
      </Center>

      <Center bg="tomato" h="256px" color="white">
        콘텐츠 1
      </Center>
    </Grid>
  );
};

export default Main;
