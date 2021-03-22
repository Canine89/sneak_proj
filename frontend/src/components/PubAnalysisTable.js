import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, GridItem } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PubAnalysisTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [pubName, setPubName] = useState([]);
  const [pubCount, setPubCount] = useState([]);
  const [salesPubName, setSalesPubName] = useState([]);
  const [salesPubCount, setSalesPubCount] = useState([]);
  const [salesBookPubCount, setSalesBookPubCount] = useState([]);
  const [totalSalesPoint, setTotalSalesPoint] = useState(0);

  useEffect(() => {
    const getPubData = async () => {
      const result = await axios.get('http://192.168.0.81:8000/books/pub/', {
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
    };
    getPubData();
  }, []);

  useEffect(() => {
    const getSalesPubData = async () => {
      const result = await axios.get('http://192.168.0.81:8000/books/sales/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      setSalesPubName(
        result.data.slice(0, 15).map((data, index) => {
          return data.book__publisher;
        }),
      );
      setSalesPubCount(
        result.data.slice(0, 15).map((data, index) => {
          return data.sales_point__sum;
        }),
      );
      setSalesBookPubCount(
        result.data.slice(0, 15).map((data, index) => {
          return data.sales_point__sum / data.book__publisher__count
        })
      )
      setTotalSalesPoint(
        result.data.reduce((acc, curr) => {
          return acc + curr.sales_point__sum;
        }, 0),
      );
      setIsLoading2(false);
    };
    getSalesPubData();
  }, []);

  return isLoading || isLoading2 ? (
    'loading...'
  ) : (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      pb={4}
      mt={4}
    >
      <GridItem colSpan={2}>
        <Table size="sm">
          <Thead>
            <Th>출판사</Th>
            <Th>600위 내 종수</Th>
          </Thead>
          <Tbody>
            {pubName.map((name, index) => {
              return (
                <Tr>
                  <Td>{name}</Td>
                  <Td>{pubCount[index].toLocaleString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </GridItem>
      <GridItem colSpan={3}>
        <Table size="sm">
          <Thead>
            <Th>출판사</Th>
            <Th>
              판매지수 합(전체: {totalSalesPoint.toLocaleString()})
            </Th>
            <Th>
              판매지수/종수
            </Th>
          </Thead>
          <Tbody>
            {salesPubName.map((name, index) => {
              return (
                <Tr>
                  <Td>{name}</Td>
                  <Td>{salesPubCount[index].toLocaleString()}</Td>
                  <Td>{parseInt(salesBookPubCount[index]).toLocaleString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
};

export default PubAnalysisTable;
