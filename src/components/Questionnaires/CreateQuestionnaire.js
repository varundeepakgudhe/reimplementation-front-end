import {Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {Button, Col, InputGroup, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import FormCheckboxGroup from "../UI/Form/FormCheckboxGroup";
import FormInput from "../UI/Form/FormInput";
import FormSelect from "../UI/Form/FormSelect";
import { transformQuestionnaireRequest} from "./util";
// import {FormCheckbox} from "react-bootstrap";


// Get the logged-in user from the session
const loggedInUser = null;

const initialValues = {
  name: "",
  instructor_id: "",
  private: false,
  min_question_score: 0,
  max_question_score: null,
  created_at: null,
  updated_at: null,
  type: "",
  display_type: "",
  instruction_loc: ""
};


const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .lowercase("Username must be lowercase")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

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
      data: {...values, parent: loggedInUser},
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
                {/* <FormSelect
                  controlId="questionnaire-instructor-id"
                  label="Instructor ID"
                  name="instructor_id"
                  // options={instructors}
                /> */}
                <FormCheckboxGroup
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
                  {/* <FormSelect
                   controlId="questionnaire-type"
                   label="Type"
                    name="type"
                    // options={types}
                />
                  <FormSelect
                    controlId="questionnaire-display-type"
                    label="Display Type"
                    name="display_type"
                    // options={displayTypes}
                  /> */}
                  <FormInput
                    controlId="questionnaire-instruction-loc"
                    label="Instruction Location"
                    name="instruction_loc"
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
