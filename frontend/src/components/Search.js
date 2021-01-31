import React, { useState } from 'react';

const Search = ({ setSearchKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'keyword') {
      setKeyword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchKeyword(keyword);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="keyword"
        type="text"
        placeholder="검색어"
        value={keyword}
        onChange={onChange}
      />
      <button type="submit">검색하라</button>
    </form>
  );
};

export default Search;
