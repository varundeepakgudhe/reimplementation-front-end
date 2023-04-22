import {Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {Button, Col, InputGroup, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import FormInput from "../UI/Form/FormInput";
import FormSelect from "../UI/Form/FormSelect";
import FormCheckbox from "../UI/Form/FormCheckbox";

import {questionnaireTypesOptions,transformQuestionnaireRequest} from "./util";

// Get the logged-in user from the session
const loggedInUser = null;
const initialValues = (questionnaire) => {

  return {
    name: questionnaire.name,
    private: questionnaire.private,
    min_question_score: questionnaire.min_question_score,
    max_question_score: questionnaire.max_question_score,
    type: questionnaire.type,
  };
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .max(64, "Questionnaire name must be at most 64 characters"),
  min_question_score: Yup.number()
    .required("Required")
    .moreThan(-1, "Must be 0 or greater.")
    .integer("Must be integer."),
  max_question_score: Yup.number()
    .required("Required")
    .moreThan(-1, "Must be 0 or greater.")
    .moreThan(Yup.ref('min_question_score'), "Must be greater than the Minimum Question Score.")
    .integer("Must be integer.")
});

const UpdateQuestionnaire = ({questionnaireData, onClose}) => {
  const [show, setShow] = useState(true);
  const {
    data: updatedQuestionnaire,
    error: questionnaireError,
    sendRequest: updateQuestionnaire,
  } = useAPI();
  const dispatch = useDispatch();


  // Close the modal if the questionnaire is updated successfully and pass the updated user to the instructor component
  useEffect(() => {
    if (updatedQuestionnaire.length > 0) {
      console.log("questionnaire updated");
      onClose(updatedQuestionnaire[0]);
      setShow(false);
    }
  }, [questionnaireError, updatedQuestionnaire, onClose]);

  useEffect(() => {
    if (questionnaireError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: questionnaireError,
      }));
    }
  }, [questionnaireError, dispatch]);

  const onSubmit = (values, submitProps) => {
    const questionnaireId = questionnaireData.id;
    updateQuestionnaire({
      url: `/questionnaires/${questionnaireId}`,
      method: "patch",
      data: {...values, instructor: loggedInUser},
      transformRequest: transformQuestionnaireRequest,
    });
    submitProps.resetForm();
    submitProps.setSubmitting(false);
  };

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Questionnaire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {questionnaireError && <p className="text-danger">{questionnaireError}</p>}
        <Formik
          initialValues={initialValues(questionnaireData)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form>

                <FormInput
                  controlId="questionnaire-name"
                  label="Name"
                  name="name"
                />

                <FormCheckbox
                  controlId="questionnaire-private"
                  label="Private"
                  name="private"
                />
                
                <Row>
                  <FormInput
                      as={Col}
                      controlId="questionnaire-min-question-score"
                      label="Minimum Question Score"
                      name="min_question_score"
                    />
                    <FormInput
                      as={Col}
                      controlId="questionnaire-max-question-score"
                      label="Maximum Question Score"
                      name="max_question_score"
                    />
                </Row>
                  <FormSelect
                    controlId="questionnaire-type"
                    name="type"
                    options={questionnaireTypesOptions}
                    inputGroupPrepend={<InputGroup.Text id="type">Questionnaire Type</InputGroup.Text>}
                    />               

                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="outline-success"
                    type="submit"
                    disabled={
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                    }
                  >
                    Update Questionnaire
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateQuestionnaire;
