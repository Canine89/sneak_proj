import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Navitaion = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const location = useLocation();

  const onClick = () => {
    localStorage.removeItem('jwt-token');
    setIsLoggedIn(false);
    history.push('/');
  };

  return (
    <div>
      <h2>navigation</h2>
      <ul>
        {location.pathname !== '/' ? (
          <li onClick={() => history.push('/')}>홈</li>
        ) : (
          ''
        )}
        {isLoggedIn ? <li onClick={onClick}>로그아웃</li> : ''}
        {isLoggedIn ? (
          <li onClick={() => history.push('/everymarket')}>
            분석기(전체 서점)
          </li>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <li onClick={() => history.push('/yes24')}>분석기(yes24)</li>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <li onClick={() => history.push('/kyobo')}>분석기(교보문고)</li>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <li onClick={() => history.push('/aladin')}>분석기(알라딘)</li>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <li onClick={() => history.push('/easyspub')}>
            분석기(도서별 이지스퍼블리싱 종합)
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export default Navitaion;
