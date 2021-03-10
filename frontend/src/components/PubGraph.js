import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Pie } from 'react-chartjs-2';
import { Grid, GridItem } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';

const PubGraph = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pubName, setPubName] = useState([]);
  const [pubCount, setPubCount] = useState([]);

  useEffect(() => {
    const getPubData = async () => {
      const result = await axios.get('http://localhost:8000/books/pub/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      setPubName(
        result.data.slice(0, 15).map((data, index) => {
          return data.book__publisher;
        }),
      );
      setPubCount(
        result.data.slice(0, 15).map((data, index) => {
          return data.book__publisher__count;
        }),
      );
      setIsLoading(false);
      console.log(result.data.slice(0, 15));
    };
    getPubData();
  }, []);

  const pubsData = {
    labels: pubName,
    datasets: [
      {
        data: pubCount,
        borderWidth: 5,
        hoverBorderWidth: 5,
        backgroundColor: [],
        fill: false,
      },
    ],
  };

  const options = {
    pieceLabel: {
      mode: 'label',
      position: 'outside',
    },
  };

  return isLoading ? (
    'loading...'
  ) : (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      pb={4}
      mt={4}
    >
      <GridItem colSpan={3}>
        <Pie data={pubsData} options={options} />
      </GridItem>
      <GridItem colSpan={3}>
        <Table>
          <Thead>
            <th>출판사</th>
            <th>600위 내 종수</th>
          </Thead>
          <Tbody>
            {pubName.map((name, index) => {
              return <tr>{name}</tr>;
            })}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
};

export default PubGraph;
