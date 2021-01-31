import React, { useState } from 'react';
import {
  InputGroup,
  Row,
  Col,
  FormControl,
  Button,
  FormGroup,
  Form,
} from 'react-bootstrap';

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
    <Row>
      <Col>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Form.Label>검색어</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                name="keyword"
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={onChange}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  검색!
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
