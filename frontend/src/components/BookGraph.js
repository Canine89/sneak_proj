import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Grid, GridItem } from '@chakra-ui/react';

const BookGraph = ({ clickedRow }) => {
  const [metadatas, setMetadatas] = useState([]);
  const [title, setTitle] = useState('');
  const [labels, setLabels] = useState([]);
  const [salesPoints, setSalesPoints] = useState([]);
  const [ranks, setRanks] = useState([]);

  const salesPointsData = {
    labels: labels,
    datasets: [
      {
        label: title + '의 판매지수',
        data: salesPoints,
        borderWidth: 5,
        hoverBorderWidth: 5,
        backgroundColor: [],
        fill: false,
      },
    ],
  };
  const ranksData = {
    labels: labels,
    datasets: [
      {
        label: title + '의 순위',
        data: ranks,
        borderWidth: 5,
        hoverBorderWidth: 5,
        backgroundColor: [],
        fill: false,
        yAxisID: 'left-y-axis',
      },
    ],
  };
  const rank_options = {
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 30,
            maxRotation: 90,
            minRotation: 90,
          },
        },
      ],
      yAxes: [
        {
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
          ticks: {
            reverse: true,
          },
        },
      ],
    },
  };
  const sales_options = {
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 30,
            maxRotation: 90,
            minRotation: 90,
          },
        },
      ],
      yAxes: [
        {
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
          ticks: {
            reverse: false,
          },
        },
      ],
    },
  };

  // 클릭 시 그래프 렌더링 함수
  useEffect(() => {
    const getRowData = async (clickedRow) => {
      const result = await axios.get(
        'http://localhost:8000/books/isbn/?keyword=' + clickedRow,
        {
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
          },
        },
      );
      setMetadatas(result.data);
    };
    getRowData(clickedRow);
  }, [clickedRow]);

  useEffect(() => {
    if (metadatas.length > 0) {
      setTitle(metadatas[0].book.title);
      setLabels(
        metadatas.map((data, index) => {
          return data.crawl_date.substring(0, 10);
        }),
      );
      setSalesPoints(
        metadatas.map((data, index) => {
          return data.sales_point;
        }),
      );
      setRanks(
        metadatas.map((data, index) => {
          return data.rank;
        }),
      );
    }
  }, [metadatas]);

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      pb={4}
      mt={4}
    >
      <GridItem colSpan={2}>
        <Line data={salesPointsData} options={sales_options} />
      </GridItem>
      <GridItem colSpan={2}>
        <Line data={ranksData} options={rank_options} />
      </GridItem>
    </Grid>
  );
};

export default BookGraph;
