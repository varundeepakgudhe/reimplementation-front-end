import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Input from "../Input";
import Select from "../Select";

const Pagination = (props) => {
  const {
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
    pageCount,
  } = props;
  return (
      <Container className="mb-md-3">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
          </Col>
          <Col xs="auto">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </Col>
          <Col xs="auto">
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </Button>
          </Col>
          <Col xs="auto">
            <Button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </Col>
          <Col xs="auto" className="center">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          </Col>
          <Col xs="auto">
            <Input
                id="columnFilter"
                label="Go to page"
                input={{
                  type: "number",
                  min: "1",
                  max: pageOptions.length,
                  defaultValue: pageIndex + 1,
                  onChange: (e) => {
                    const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                    gotoPage(pageNumber);
                  },
                }}
            />
          </Col>
          <Col xs="auto">
            <Select
                id="pageSize"
                label="Rows per page"
                options={[
                  {label: "10", value: 10},
                  {label: "25", value: 25},
                  {label: "50", value: 50},
                ]}
                input={{value: pageSize, onChange: (e) => setPageSize(Number(e.target.value))}}
            />
          </Col>
        </Row>
      </Container>
  );
};

export default Pagination;
