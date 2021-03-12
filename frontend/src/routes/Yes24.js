import React, { useEffect, useState } from 'react';
import DataTable from 'components/DataTable';
import axios from 'axios';

const Yes24 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBooksData = async () => {
      const result = await axios.get('http://192.168.0.81:3000/books/yes24/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      setData(result.data);
      setIsLoading(false);
    };
    getBooksData();
  }, []);

  return <>{isLoading ? 'loading...' : <DataTable tabledatas={data} />}</>;
};

export default Yes24;
