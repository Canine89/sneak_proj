import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

const Navitaion = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();

  // 로그아웃 처리 함수
  const onClick = () => {
    localStorage.removeItem('jwt-token');
    setIsLoggedIn(false);
    history.push('/');
  };

  return (
    <Grid>
      {isLoggedIn ? (
        <Breadcrumb separator=">" pb={4} pt={4}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {isLoggedIn ? (
              <BreadcrumbLink onClick={onClick}>로그아웃</BreadcrumbLink>
            ) : (
              ''
            )}
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => history.push('/everymarket')}>
              전체 서점
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => history.push('/yes24')}>
              예스24
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => history.push('/kyobo')}>
              교보문고
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => history.push('/aladin')}>
              알라딘
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => history.push('/easyspub')}>
              이지스퍼블리싱
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default Navitaion;
