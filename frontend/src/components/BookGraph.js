import { Line } from 'react-chartjs-2';
import { Grid, GridItem } from '@chakra-ui/react';

const BookGraph = ({ metadataByIsbn }) => {
  console.log(metadataByIsbn);
  const title = metadataByIsbn[0].book.title;
  const labels = metadataByIsbn.map((data, index) => {
    return data.created_at.substring(0, 10);
  });
  const sales_points = metadataByIsbn.map((data, index) => {
    return data.sales_point;
  });
  const ranks = metadataByIsbn.map((data, index) => {
    return data.rank;
  });
  const salesPointsData = {
    labels: labels,
    datasets: [
      {
        label: title + '의 판매지수',
        data: sales_points,
        borderWidth: 2,
        hoverBorderWidth: 3,
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
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [],
        fill: false,
      },
    ],
  };
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      pb={4}
    >
      <GridItem colSpan={3}>
        <Line data={salesPointsData} />
      </GridItem>
      <GridItem colSpan={3}>
        <Line data={ranksData} />
      </GridItem>
    </Grid>
  );
};

export default BookGraph;
