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

const initialValues = {
  name: "",
  instructor_id: 0,
  private: false,
  min_question_score: 0,
  max_question_score: 10,
  type: "",
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

const CreateQuestionnaire = ({onClose}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const {
    data: createdQuestionnaire,
    error: questionnaireError,
    sendRequest: createQuestionnaire,
  } = useAPI();


  useEffect(() => {
    if (questionnaireError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: questionnaireError
      }));
    }
  }, [questionnaireError, dispatch]);

  useEffect(() => {
    if (createdQuestionnaire.length > 0) {
      setShow(false);
      onClose(createdQuestionnaire[0]);
    }
  }, [questionnaireError, createdQuestionnaire, onClose]);

  const onSubmit = (values, submitProps) => {
    createQuestionnaire({
      url: "/questionnaires",
      method: "post",
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
        <Modal.Title>Create Questionnaire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
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
                    label="Minimum Item Score"
                    name="min_item_score"
                  />
                  <FormInput
                    as={Col}
                    controlId="questionnaire-max-question-score"
                    label="Maximum Item Score"
                    name="max_item_score"
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
                    Create Questionnaire
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

export default CreateQuestionnaire;
