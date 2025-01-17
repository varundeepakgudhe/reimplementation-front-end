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
const loggedInUser = 1; // set to 1 as logged-in user not implemented

const currDate = new Date().toLocaleDateString(); // current time

const initialValues = (questionnaire) => {

  return {
    name: questionnaire.name,
    is_private: questionnaire.is_private,
    updated_at: currDate,
    instructor_id: loggedInUser,
    min_item_score: questionnaire.min_item_score,
    max_item_score: questionnaire.max_item_score,
    type: questionnaire.type,
  };
};

// Name, Minimum Item Score, and Maximum Item Score are Required.
// Minimum Item Score must be >= 0 and Maximum Item Score must be > Minimimum Item Score.
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .max(64, "Questionnaire name must be at most 64 characters"),
  min_item_score: Yup.number()
    .required("Required")
    .moreThan(-1, "Must be 0 or greater.")
    .integer("Must be integer."),
  max_item_score: Yup.number()
    .required("Required")
    .moreThan(-1, "Must be 0 or greater.")
    .moreThan(Yup.ref('min_item_score'), "Must be greater than the Minimum Item Score.")
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
    console.log(updateQuestionnaire)
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

  // method to update the questionnaire record using HTTP method and URI on submit
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

                {/* render default value of this checkbox based on the is_private value on existing record */}
                <FormCheckbox
                  defaultChecked={initialValues(questionnaireData).is_private}
                  controlId="questionnaire-is-private"
                  label="Private"
                  name="is_private"
                /><br></br>
                <Row>
                  <FormInput
                      as={Col}
                      controlId="questionnaire-min-item-score"
                      label="Minimum Item Score"
                      name="min_item_score"
                      md="1" 
                    />
                    <FormInput
                      as={Col}
                      controlId="questionnaire-max-item-score"
                      label="Maximum Item Score"
                      name="max_item_score"
                      md="1" 
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
