import React, { useEffect, useState } from 'react';
import TableRow from 'components/TableRow';

const Table = ({ tabledatas }) => {
  const [isAsc, setIsAsc] = useState(true);
  const [newTabledatas, setNewTabledatas] = useState([]);
  useEffect(() => {
    const tempTabledatas = [];
    tabledatas.forEach((element) => {
      const {
        author,
        isbn,
        publish_date,
        publisher,
        right_price,
        sales_price,
        title,
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
      });
    });
    setNewTabledatas(tempTabledatas);
  }, []);

  const tableRows = newTabledatas.map((tabledata) => {
    return (
      <TableRow
        rank={tabledata.rank}
        title={tabledata.title}
        publisher={tabledata.publisher}
        market={tabledata.market}
      />
    );
  });

  const changeOrder = (event) => {
    const orderTarget = event.target.dataset.key;
    if (isAsc == false) {
      newTabledatas.sort((a, b) => {
        if (a[orderTarget] > b[orderTarget]) {
          return 1;
        }
        if (a[orderTarget] < b[orderTarget]) {
          return -1;
        }
        return 0;
      });
    }
    if (isAsc == true) {
      newTabledatas.sort((a, b) => {
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
  };

  return (
    <table>
      <thead>
        <th onClick={changeOrder} data-key="rank">
          rank
        </th>
        <th onClick={changeOrder} data-key="title">
          title
        </th>
        <th onClick={changeOrder} data-key="publisher">
          publisher
        </th>
        <th onClick={changeOrder} data-key="market">
          market
        </th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default Table;
