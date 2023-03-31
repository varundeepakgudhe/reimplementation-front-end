import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDatePicker = (props) => {
  const {controlId, label, name} = props;

  return (
    <Field name={name}>
      {({field, form}) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              <DatePicker
                {...field}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => {
                  form.setFieldValue(field.name, val);
                }}
                dateFormat="MM/dd/yyyy"
                isInvalid={isInvalid}
                className={`form-control ${
                  isInvalid ? "is-invalid" : isValid ? "is-valid" : ""
                }`}
              />
              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    </Field>
  );
};

export default FormDatePicker;
