import React, { useEffect, useState } from 'react';
import DataTableRow from 'components/DataTableRow';
import Search from 'components/Search';
import Paging from 'components/Paging';
import axios from 'axios';
import BookGraph from 'components/BookGraph';

import { Table, Grid, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import PubGraph from './PubGraph';

const DataTable = ({ tabledatas }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [orderTarget, setOrderTarget] = useState('');
  const [originTabledatas, setOriginTabledatas] = useState([]);
  const [searchTabledatas, setSearchTabledatas] = useState([]);
  const [renderingTabledatas, setRenderingTabledatas] = useState([]);

  // 출판사 분석 용
  const [renderingPubdatas, setRenderingPubdatas] = useState([]);

  // 클릭 시 책 데이터 보여주기
  const [clickedRow, setClickedRow] = useState(0);
  const [metadataByIsbn, setMetadataByIsbn] = useState([]);

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
      setPage(0); // 검색 후 0 페이지로 초기화
    }
  }, [searchKeyword, originTabledatas]);

  // 테이블 데이터 렌더링 함수
  useEffect(() => {
    setRenderingTabledatas(
      searchTabledatas.slice(page * numberOfPage, numberOfPage * (page + 1)),
    );
  }, [isAsc, searchTabledatas, numberOfPage, page]);

  // 클릭 시 그래프 렌더링 함수
  useEffect(() => {
    if (clickedRow !== 0) {
      const getRowData = async (clickedRow) => {
        console.log(clickedRow);
        const result = await axios.get(
          'http://localhost:8000/books/isbn/?keyword=' + clickedRow,
          {
            headers: {
              Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
            },
          },
        );
        console.log(result.data);
        setMetadataByIsbn(result.data);
      };
      getRowData(clickedRow);
    }
  }, [clickedRow]);

  // 출판사 그래프 렌더링 함수
  /*
  useEffect(() => {
    const getPubdatas = async () => {
      const result = await axios.get('http://localhost:8000/books/pub/', {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('jwt-token'),
        },
      });
      console.log(result.data);
    };
    getPubdatas();
  }, [searchTabledatas]);
  */

  // TableRow 리턴 함수
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
        setClickedRow={setClickedRow}
      />
    );
  });

  // 페이징 함수
  const tablePaging = () => {
    const tableLength = searchTabledatas.length;
    const pagingLength = Math.ceil(tableLength / numberOfPage);
    const paging = [...Array(pagingLength).keys()];
    const pagingMaker = paging.map((element, index) => {
      return (
        <Button
          key={index}
          onClick={() => setPage(element)}
          size="xs"
          isActive={element === page ? true : false}
        >
          {element + 1}
        </Button>
      );
    });

    const frontPaging = pagingMaker.slice(page, page + 5);
    const rearPaging = pagingMaker.slice(pagingLength - 5, pagingLength);

    return (
      <ButtonGroup spacing="1" mt={2}>
        {frontPaging} <Button size="xs">...</Button> {rearPaging}
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
      <Table striped size="sm" maxW="12xl">
        <Thead>
          <Tr>
            <Th onClick={changeOrder} data-key="rank">
              순위 {orderTarget === 'rank' ? (isAsc ? '▲' : '▼') : null}
            </Th>
            <Th onClick={changeOrder} data-key="sales_point">
              판매지수{' '}
              {orderTarget === 'sales_point' ? (isAsc ? '▲' : '▼') : null}
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
      {metadataByIsbn.length > 0 ? (
        <BookGraph metadataByIsbn={metadataByIsbn} />
      ) : (
        'loading...'
      )}
      <PubGraph />
    </Grid>
  );
};

export default DataTable;
