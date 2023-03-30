import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import {useFilters, useGlobalFilter, usePagination, useSortBy, useTable,} from "react-table";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";
import Pagination from "./Pagination";

const Table = (props) => {
  // Apply the Column Filter property to all columns
  const defaultColumn = React.useMemo(() => ({Filter: ColumnFilter}), []);

  const table = useTable(
      {
        columns: props.columns,
        data: props.data,
        defaultColumn,
        initialState: props.initialState,
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = table;

  const {globalFilter, pageIndex, pageSize} = state;
  return (
      <Container fluid>
        <Row className="mb-md-2">
          <Col md={{span: 4, offset: 4}}>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>{" "}
          </Col>
        </Row>
        <Row>
          <BTable striped hover responsive {...getTableProps()}>
            <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header) => (
                      <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                        {header.render("Header")}
                        <span>
                      {" "}
                          {header.isSorted
                              ? header.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                              : ""}{" "}
                    </span>
                        <div>
                          {header.canFilter ? header.render("Filter") : null}
                        </div>
                      </th>
                  ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
              );
            })}
            </tbody>
          </BTable>
          <Pagination
              nextPage={nextPage}
              canNextPage={canNextPage}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              gotoPage={gotoPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageCount={pageCount}
          />
        </Row>
      </Container>
  );
};
export default Table;
