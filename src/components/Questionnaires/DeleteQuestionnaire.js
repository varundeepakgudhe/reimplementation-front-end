import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";

const DeleteQuestionnaire = ({questionnaireData, onClose}) => {
  const dispatch = useDispatch();
  const {
    data: deletedQuestionnaire,
    error: questionnaireError,
    sendRequest: deleteQuestionnaire,
  } = useAPI();
  const [show, setShow] = useState(true);

  // methods to delete the questionnaire record using HTTP method and URI
  const deleteHandler = () =>
    deleteQuestionnaire({url: `/questionnaires/${questionnaireData.id}`, method: "DELETE"});

  useEffect(() => {
    if (questionnaireError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: questionnaireError,
      }));
    }
  }, [questionnaireError, dispatch]);

  useEffect(() => {
    if (deletedQuestionnaire.length > 0) {
      setShow(false);
      onClose(deletedQuestionnaire[0]);
    }
  }, [deletedQuestionnaire, onClose]);

  const closeHandler = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Questionnaire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete questionnaire <b>{questionnaireData.name}?</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeHandler}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteQuestionnaire;
