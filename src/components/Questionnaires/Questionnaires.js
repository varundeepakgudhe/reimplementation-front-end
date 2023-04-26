import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import {AddQuestionnaireIcon} from "../UI/Icons";
import Table from "../UI/Table/Table";
import CreateQuestionnaire from "./CreateQuestionnaire";
import DeleteQuestionnaire from "./DeleteQuestionnaire";
import UpdateQuestionnaire from "./UpdateQuestionnaire";
import {QUESTIONNAIRE_COLUMNS} from "./questionnaireColumns";


// Employs the use-api hook from src/hooks/use-api.js
// This employs axios tools to make restful calls to api
// This will handle promises, errors, and setting data
const Questionnaires = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: questionnaireData,
    setData: setQuestionnaireData,
    sendRequest: fetchQuestionnaires,
  } = useAPI();

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState({
    visible: false,
    data: {},
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    visible: false,
    data: {},
  });

  // Here we employ the useEffect hook to get questionnaire data from the base axios url + /questionnaire
  useEffect(() => fetchQuestionnaires({url: "/questionnaires", method: "get"}), [fetchQuestionnaires]);

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: error
      }));
    }
  }, [error, dispatch]);

  // Handles the POST method create - invokes CreateQuestionnaire.js
  const onCreateQuestionnaireHandler = useCallback(
    (questionnaire) => {
      if (questionnaire && questionnaire.name) {
        console.log(questionnaire);
        setQuestionnaireData((prevData) => [...prevData, questionnaire]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Questionnaire ${questionnaire.name} created successfully!`
        }));
      }
      setShowCreate(false);
    },
    [setQuestionnaireData, dispatch]
  );

  // Handles the POST method update - invokes UpdateQuestionnaire.js
  const onUpdateQuestionnaireHandler = useCallback(
    (updatedQuestionnaire) => {
      if (updatedQuestionnaire && updatedQuestionnaire.name !== undefined) {
        setQuestionnaireData((prevData) => [
          ...prevData.filter((questionnaire) => questionnaire.id !== updatedQuestionnaire.id),
          updatedQuestionnaire,
        ]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Questionnaire ${updatedQuestionnaire.name} updated successfully!`
        }));
      }
      setShowUpdate({visible: false, data: {}});
    },
    [setQuestionnaireData, dispatch]
  );

  // Handles the DELETE method update - invokes DeleteQuestionnaire.js
  const onDeleteQuestionnaireHandler = useCallback(
    (id, name, status) => {
      if (status) {
        setQuestionnaireData((prevData) => {
          return prevData.filter((questionnaire) => questionnaire.id !== id);
        });
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Questionnaire ${name} deleted successfully!`
        }));
      }
      setShowDeleteConfirmation({visible: false, data: {}});
    },
    [setQuestionnaireData, dispatch]
  );

  const onEditHandle = (row) =>
    setShowUpdate({visible: true, data: row.original});
  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({visible: true, data: row.original});

  const tableColumns = useMemo(
    () => QUESTIONNAIRE_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : questionnaireData),
    [questionnaireData, isLoading]
  );
  const initialState = {hiddenColumns: ["id"]};

  // Describe the render of data on the screen
  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{span: 4, offset: 4}}>
          <h1>Manage Questionnaires</h1>
        </Col>
        <hr/>
      </Row>
      <Row>
        <Col md={{span: 1, offset: 11}}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
          >
            <AddQuestionnaireIcon width="24" height="24"/>
          </Button>
        </Col>
        {showCreate && <CreateQuestionnaire onClose={onCreateQuestionnaireHandler}/>}
        {showUpdate.visible && (
          <UpdateQuestionnaire
          questionnaireData={showUpdate.data}
            onClose={onUpdateQuestionnaireHandler}
          />
        )}
        {showDeleteConfirmation.visible && (
          <DeleteQuestionnaire
          questionnaireData={showDeleteConfirmation.data}
            onClose={onDeleteQuestionnaireHandler.bind(
              null,
              showDeleteConfirmation.data.id,
              showDeleteConfirmation.data.name
            )}
          />
        )}
      </Row>
      <Row>
        <Table
          data={tableData}
          columns={tableColumns}
          initialState={initialState}
        />
      </Row>
    </Container>
  );
};

export default Questionnaires;
