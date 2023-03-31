import {Fragment} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditIcon, RemoveUserIcon} from "../UI/Icons";

export const USER_COLUMNS = (handleDelete, handleEdit) => [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Username",
    accessor: "name",
    Cell: ({row}) => (
      <Link to={`/users/${row.original.id}`}> {row.original.name}</Link>
    ),
  },
  {
    Header: "Full Name",
    accessor: "fullname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: (d) => d.role.name,
    disableFilters: true,
  },
  {
    Header: "Parent",
    accessor: (d) => d.parent.name,
    disableFilters: true,
  },
  {
    Header: "Email Preferences",
    columns: [
      {
        Header: "Review",
        accessor: (d) => d.email_on_review.toString(),
        disableFilters: true,
      },
      {
        Header: "Submission",
        accessor: (d) => d.email_on_submission.toString(),
        disableFilters: true,
      },
      {
        Header: "Meta Review",
        accessor: (d) => d.email_on_review_of_review.toString(),
        disableFilters: true,
      },
    ],
  },
  {
    id: "institution",
    Header: "Institution",
    accessor: (d) => d.institution.name,
    disableFilters: true,
  },
  {
    id: "actions",
    Header: "Actions",
    Cell: ({row}) => {
      return (
        <Fragment>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            <EditIcon/>
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-sm-2"
            onClick={() => handleDelete(row)}
          >
            <RemoveUserIcon/>
          </Button>
        </Fragment>
      );
    },
  },
];
