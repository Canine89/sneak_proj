import React, { useEffect, useState } from 'react';
import DataTableRow from 'components/DataTableRow';
import Search from 'components/Search';
import Paging from 'components/Paging';
import axios from 'axios';
import BookGraph from 'components/BookGraph';

import { Table, Thead, Tbody, Th } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';

import { CircularProgress } from '@chakra-ui/react';
import PubGraph from './PubAnalysisTable';
import Pagiantion from './Pagination';

const DataTable = ({ tabledatas }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [orderTarget, setOrderTarget] = useState('');
  const [originTabledatas, setOriginTabledatas] = useState([]);
  const [searchTabledatas, setSearchTabledatas] = useState([]);
  const [renderingTabledatas, setRenderingTabledatas] = useState([]);

  // 클릭 시 책 데이터 보여주기
  const [clickedRow, setClickedRow] = useState(0);

  // 페이징, 검색
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
    console.log(tempTabledatas)
  }, [tabledatas]);

  // 테이블 데이터 검색 로직 함수
  useEffect(() => {
    if (searchKeyword === '') {
      setSearchTabledatas(originTabledatas);
    } else {
      const temp = [];
      const getBooksData = async () => {
        const result = await axios.get(
          'http://192.168.0.81:8000/books/search/?keyword=' +
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
      setPage(0); // 검색 후 0 페이지로 초기화
    }
  }, [
    searchKeyword,
    originTabledatas,
    doSearchPublisher,
    doSearchTags,
    doSearchTitle,
  ]);

  // 테이블 데이터 렌더링 함수
  useEffect(() => {
    setRenderingTabledatas(
      searchTabledatas.slice(page * numberOfPage, numberOfPage * (page + 1)),
    );
  }, [isAsc, searchTabledatas, numberOfPage, page]);

  // TableRow 리턴 함수
  const DataTableRows = renderingTabledatas.map((tabledata, index) => {
    return (
      <DataTableRow
        key={index}
        rank={tabledata.rank}
        sales_point={tabledata.sales_point}
        publish_date={tabledata.publish_date}
        crawl_date={tabledata.crawl_date}
        title={tabledata.title}
        publisher={tabledata.publisher}
        market={tabledata.market}
        tags={tabledata.tags}
        isbn={tabledata.isbn}
        setClickedRow={setClickedRow}
      />
    );
  });

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
      <Table striped size="sm" maxW="12xl">
        <Thead>
          <Th onClick={changeOrder} data-key="rank">
            순위 {orderTarget === 'rank' ? (isAsc ? '▲' : '▼') : null}
          </Th>
          <Th onClick={changeOrder} data-key="sales_point">
            판매지수{' '}
            {orderTarget === 'sales_point' ? (isAsc ? '▲' : '▼') : null}
          </Th>
          <Th onClick={changeOrder} data-key="publish_date">
            출간월
            {orderTarget === 'publish_date' ? (isAsc ? '▲' : '▼') : null}
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
        </Thead>
        <Tbody>{DataTableRows}</Tbody>
      </Table>
      <Pagiantion
        numberOfPage={numberOfPage}
        page={page}
        setPage={setPage}
        searchTabledatas={searchTabledatas}
      />
      <Paging setNumberOfPage={setNumberOfPage} setPage={setPage} />
      {clickedRow ? (
        <BookGraph clickedRow={clickedRow} />
      ) : (
        <>
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            pb={4}
            mt={4}
          >
            <GridItem colSpan={2}>
              <CircularProgress isIndeterminate color="green.300" />
            </GridItem>
            <GridItem colSpan={2}>
              <CircularProgress isIndeterminate color="green.300" />
            </GridItem>
          </Grid>
        </>
      )}
      <PubGraph />
    </Grid>
  );
};

export default DataTable;
