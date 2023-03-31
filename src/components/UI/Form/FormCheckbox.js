import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import InfoToolTip from "../InfoToolTip";

const FormCheckbox = (props) => {
  const {controlId, label, name, disabled, tooltip} = props;

  const displayLabel = tooltip ? (
    <>
      {label + " "}
      <InfoToolTip id={`${controlId}-tooltip`} info={tooltip}/>
    </>
  ) : label;

  return (
    <Field name={name}>
      {({field, form}) => {
        return (
          <Form.Group controlId={controlId}>
            <InputGroup>
              <Form.Check
                {...field}
                className="mx-md-2"
                type="checkbox"
                disabled={disabled}
                label={displayLabel}
                isInvalid={form.touched[field.name] && form.errors[field.name]}
                feedback={form.errors[field.name]}
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

export default FormCheckbox;
