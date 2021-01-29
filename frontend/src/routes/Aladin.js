import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import axios from 'axios';
const Aladin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBooksData = async () => {
      const result = await axios.get('http://localhost:8000/books/aladin/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      setData(result.data);
      setIsLoading(false);
    };
    getBooksData();
  }, []);

  return <>{isLoading ? 'loading...' : <Table tabledatas={data} />}</>;
};

export default Aladin;
