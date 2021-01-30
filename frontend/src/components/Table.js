import React, { useEffect, useState } from 'react';
import TableRow from 'components/TableRow';

const Table = ({ tabledatas }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [orderTarget, setOrderTarget] = useState('');
  const [originTabledatas, setOriginTabledatas] = useState([]);
  const [searchTabledatas, setSearchTabledatas] = useState([]);
  const [renderingTabledatas, setRenderingTabledatas] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState(20);
  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  // set OriginTabledatas
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

  // change searchTabledatas
  useEffect(() => {
    if (searchKeyword === '') {
      setSearchTabledatas(originTabledatas);
    } else {
      // search logic...
      const temp = originTabledatas.reduce((acc, curr) => {
        for (var key in curr) {
          console.log(typeof curr[key]);
          if (
            typeof curr[key] == 'string' &&
            curr[key].indexOf(searchKeyword) >= 0
          ) {
            acc.push(curr);
            break;
          }
        }
        return acc;
      }, []);
      setSearchTabledatas(temp);
    }
  }, [searchKeyword, originTabledatas]);

  // rendering tabledata
  useEffect(() => {
    setRenderingTabledatas(
      searchTabledatas.slice(page * numberOfPage, numberOfPage * (page + 1)),
    );
    console.log(originTabledatas);
  }, [isAsc, searchTabledatas, numberOfPage, page]);

  const tableRows = renderingTabledatas.map((tabledata, index) => {
    return (
      <TableRow
        key={index}
        rank={tabledata.rank}
        title={tabledata.title}
        publisher={tabledata.publisher}
        market={tabledata.market}
        tags={tabledata.tags}
      />
    );
  });

  // paging 함수
  const tablePaging = () => {
    const tableLength = searchTabledatas.length;
    const pagingLength = Math.ceil(tableLength / numberOfPage);
    const paging = [...Array(pagingLength).keys()];
    return (
      <ul>
        {paging.map((element, index) => {
          return (
            <li key={index} onClick={() => setPage(element)}>
              {element + 1}
            </li>
          );
        })}
      </ul>
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

  // 검색 함수
  const changeKeyword = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return (
    <>
      <span>검색(beta 기능): </span>
      <input type="text" value={searchKeyword} onChange={changeKeyword} />
      <table>
        <thead>
          <tr>
            <th onClick={changeOrder} data-key="rank">
              rank {orderTarget === 'rank' ? (isAsc ? '▲' : '▼') : null}
            </th>
            <th onClick={changeOrder} data-key="title">
              title {orderTarget === 'title' ? (isAsc ? '▲' : '▼') : null}
            </th>
            <th onClick={changeOrder} data-key="publisher">
              publisher{' '}
              {orderTarget === 'publisher' ? (isAsc ? '▲' : '▼') : null}
            </th>
            <th onClick={changeOrder} data-key="market">
              market {orderTarget === 'market' ? (isAsc ? '▲' : '▼') : null}
            </th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
        <span>{tablePaging(20)}</span>
      </table>
    </>
  );
};

export default Table;
