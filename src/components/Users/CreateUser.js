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
import {emailOptions, transformInstitutionsResponse, transformRolesResponse, transformUserRequest,} from "./util";

// Get the logged-in user from the session
const loggedInUser = null;

const initialValues = {
  name: "",
  email: "",
  firstName: "",
  lastName: "",
  emailPreferences: [],
  institution: "",
  role: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .lowercase("Username must be lowercase")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: Yup.string().required("Required").email("Invalid email format"),
  firstName: Yup.string().required("Required").nonNullable(),
  lastName: Yup.string().required("Required").nonNullable(),
  role: Yup.string().required("Required").nonNullable(),
  institution: Yup.string().required("Required").nonNullable(),
});

const CreateUser = ({onClose}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const {data: roles, sendRequest: fetchRoles} = useAPI();
  const {data: institutions, sendRequest: fetchInstitutions} = useAPI();
  const {
    data: createdUser,
    error: userError,
    sendRequest: createUser,
  } = useAPI();

  useEffect(() => {
    fetchRoles({url: "/roles", transformResponse: transformRolesResponse});
    fetchInstitutions({
      url: "/institutions",
      transformResponse: transformInstitutionsResponse,
    });
  }, [fetchRoles, fetchInstitutions]);

  useEffect(() => {
    if (userError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: userError
      }));
    }
  }, [userError, dispatch]);

  useEffect(() => {
    if (createdUser.length > 0) {
      setShow(false);
      onClose(createdUser[0]);
    }
  }, [userError, createdUser, onClose]);

  const onSubmit = (values, submitProps) => {
    createUser({
      url: "/users",
      method: "post",
      data: {...values, parent: loggedInUser},
      transformRequest: transformUserRequest,
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
        <Modal.Title>Create User</Modal.Title>
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
                <FormSelect
                  controlId="user-role"
                  name="role"
                  options={roles}
                  inputGroupPrepend={
                    <InputGroup.Text id="role-prepend">Role</InputGroup.Text>
                  }
                />
                <FormInput
                  controlId="user-name"
                  label="Username"
                  name="name"
                  inputGroupPrepend={
                    <InputGroup.Text id="user-name-prep">@</InputGroup.Text>
                  }
                />
                <Row>
                  <FormInput
                    as={Col}
                    controlId="user-first-name"
                    label="First name"
                    name="firstName"
                  />
                  <FormInput
                    as={Col}
                    controlId="user-last-name"
                    label="Last name"
                    name="lastName"
                  />
                </Row>
                <FormInput controlId="user-email" label="Email" name="email"/>

                <FormCheckboxGroup
                  controlId="email-pref"
                  label="Email Preferences"
                  name="emailPreferences"
                  options={emailOptions}
                />
                <FormSelect
                  controlId="user-institution"
                  name="institution"
                  options={institutions}
                  inputGroupPrepend={
                    <InputGroup.Text id="user-inst-prep">
                      Institution
                    </InputGroup.Text>
                  }
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
                    Create User
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

export default CreateUser;
