import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav, Col, Row } from 'react-bootstrap';
import 'statics/dist/scss/navigation.scss';

const Navitaion = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const location = useLocation();

  // 로그아웃 처리 함수
  const onClick = () => {
    localStorage.removeItem('jwt-token');
    setIsLoggedIn(false);
    history.push('/');
  };

  return (
    <Row>
      <Col>
        <Nav variant="pills" defaultActiveKey="/">
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link href="/">홈</Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link onClick={onClick}>로그아웃</Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                eventKey={'everymarket'}
                onClick={() => history.push('/everymarket')}
              >
                전체 서점
              </Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                eventKey={'yes24'}
                onClick={() => history.push('/yes24')}
              >
                예스24
              </Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                eventKey={'kyobo'}
                onClick={() => history.push('/kyobo')}
              >
                교보
              </Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                eventKey={'aladin'}
                onClick={() => history.push('/yes24')}
              >
                알라딘
              </Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                eventKey={'easyspub'}
                onClick={() => history.push('/easyspub')}
              >
                이지스퍼블리싱
              </Nav.Link>
            </Nav.Item>
          ) : (
            ''
          )}
        </Nav>
      </Col>
    </Row>
  );
};

export default Navitaion;
