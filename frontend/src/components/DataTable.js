import React, { useEffect, useState } from 'react';
import DataTableRow from 'components/DataTableRow';
import Search from 'components/Search';
import Paging from 'components/Paging';
import axios from 'axios';
import Graph from 'components/Chart';

import { Table, Grid, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const DataTable = ({ tabledatas }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [orderTarget, setOrderTarget] = useState('');
  const [originTabledatas, setOriginTabledatas] = useState([]);
  const [searchTabledatas, setSearchTabledatas] = useState([]);
  const [renderingTabledatas, setRenderingTabledatas] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState(20);
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [doSearchTitle, setDoSearchTitle] = useState('false');
  const [doSearchPublisher, setDoSearchPublisher] = useState('false');
  const [doSearchTags, setDoSearchTags] = useState('false');

  // 최초 테이블 데이터 초기화 함수
  useEffect(() => {
    const tempTabledatas = [];
    tabledatas.forEach((element) => {
      const {
        title,
        author,
        isbn,
        publish_date,
        publisher,
        right_price,
        sales_price,
        tags,
      } = element.book;
      const { market, rank, sales_point } = element;
      tempTabledatas.push({
        author,
        isbn,
        publish_date,
        publisher,
        right_price,
        sales_price,
        title,
        market,
        rank,
        sales_point,
        tags,
      });
    });
    setOriginTabledatas(tempTabledatas);
  }, []);

  // 테이블 데이터 검색 로직 함수
  useEffect(() => {
    if (searchKeyword === '') {
      setSearchTabledatas(originTabledatas);
    } else {
      const temp = [];
      const getBooksData = async () => {
        console.log(doSearchTitle, doSearchPublisher, doSearchTags);
        const result = await axios.get(
          'http://localhost:8000/books/search/?keyword=' +
            searchKeyword +
            '&title=' +
            doSearchTitle +
            '&publisher=' +
            doSearchPublisher +
            '&tags=' +
            doSearchTags,
          {
            headers: {
              Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
            },
          },
        );
        console.log(result.data);
        result.data.forEach((element) => {
          const {
            title,
            author,
            isbn,
            publish_date,
            publisher,
            right_price,
            sales_price,
            tags,
          } = element.book;
          const { market, rank, sales_point } = element;
          temp.push({
            author,
            isbn,
            publish_date,
            publisher,
            right_price,
            sales_price,
            title,
            market,
            rank,
            sales_point,
            tags,
          });
        });
        setSearchTabledatas(temp);
      };
      getBooksData();
    }
  }, [searchKeyword, originTabledatas]);

  // 테이블 데이터 렌더링 함수
  useEffect(() => {
    setRenderingTabledatas(
      searchTabledatas.slice(page * numberOfPage, numberOfPage * (page + 1)),
    );
  }, [isAsc, searchTabledatas, numberOfPage, page]);

  const DataTableRows = renderingTabledatas.map((tabledata, index) => {
    return (
      <DataTableRow
        key={index}
        rank={tabledata.rank}
        sales_point={tabledata.sales_point}
        title={tabledata.title}
        publisher={tabledata.publisher}
        market={tabledata.market}
        tags={tabledata.tags}
        isbn={tabledata.isbn}
      />
    );
  });

  // 페이징 함수
  const tablePaging = () => {
    const tableLength = searchTabledatas.length;
    const pagingLength = Math.ceil(tableLength / numberOfPage);
    const paging = [...Array(pagingLength).keys()];

    return (
      <ButtonGroup spacing="1" mt={2}>
        {paging.map((element, index) => {
          return (
            <Button key={index} onClick={() => setPage(element)} size="xs">
              {element + 1}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  };

  // 정렬 함수
  const changeOrder = (event) => {
    const orderTarget = event.target.dataset.key;
    if (isAsc === false) {
      searchTabledatas.sort((a, b) => {
        if (a[orderTarget] > b[orderTarget]) {
          return 1;
        }
        if (a[orderTarget] < b[orderTarget]) {
          return -1;
        }
        return 0;
      });
    }
    if (isAsc === true) {
      searchTabledatas.sort((a, b) => {
        if (a[orderTarget] > b[orderTarget]) {
          return -1;
        }
        if (a[orderTarget] < b[orderTarget]) {
          return 1;
        }
        return 0;
      });
    }
    setIsAsc(!isAsc);
    setOrderTarget(orderTarget);
  };

  return (
    <Grid>
      <Search
        setSearchKeyword={setSearchKeyword}
        setDoSearchTitle={setDoSearchTitle}
        setDoSearchPublisher={setDoSearchPublisher}
        setDoSearchTags={setDoSearchTags}
      />
      <Table striped size="sm">
        <Thead>
          <Tr>
            <Th onClick={changeOrder} data-key="rank">
              순위 {orderTarget === 'rank' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th onClick={changeOrder} data-key="sales_point">
              판매지수 {orderTarget === 'rank' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th onClick={changeOrder} data-key="title">
              제목 {orderTarget === 'title' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th onClick={changeOrder} data-key="publisher">
              출판사 {orderTarget === 'publisher' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th onClick={changeOrder} data-key="market">
              시장 {orderTarget === 'market' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th>카테고리+태그</Th>
          </Tr>
        </Thead>
        <Tbody>{DataTableRows}</Tbody>
      </Table>
      {tablePaging()}
      <Paging setNumberOfPage={setNumberOfPage} setPage={setPage} />
      <Graph />
    </Grid>
  );
};

export default DataTable;
