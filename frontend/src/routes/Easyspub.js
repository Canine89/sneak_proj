import React, { useEffect, useState } from 'react';
import DataTable from 'components/DataTable';
import axios from 'axios';
import { CircularProgress, Center } from '@chakra-ui/react';

const Easyspub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBooksData = async () => {
      const result = await axios.get('http://192.168.0.81:3000/books/easyspub/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      setData(result.data);
      setIsLoading(false);
    };
    getBooksData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Center h="768px">
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <DataTable tabledatas={data} />
      )}
    </>
  );
};

export default Easyspub;
