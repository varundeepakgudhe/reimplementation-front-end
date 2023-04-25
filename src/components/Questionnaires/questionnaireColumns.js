import {Fragment} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditIcon, RemoveQuestionnaireIcon} from "../UI/Icons";

export const QUESTIONNAIRE_COLUMNS = (handleDelete, handleEdit) => [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({row}) => (
      <Link to={`/questionnaires/${row.original.id}`}> {row.original.name}</Link>
    ),
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Updated At",
    accessor: "updated_at",
  },
  {
    Header: "Instructor",
    accessor: (d) => d.instructor.name,
    disableFilters: true,
  },
  {
    Header: "Min Question Score",
    accessor: "min_question_score",
    disableFilters: true,
  },
  {
    Header: "Max Question Score",
    accessor: "max_question_score",
    disableFilters: true,
  },
  {
    Header: "Private",
    accessor: "private",
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
            <RemoveQuestionnaireIcon/>
          </Button>
        </Fragment>
      );
    },
  },
];
