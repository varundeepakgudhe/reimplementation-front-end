import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";

const FormSelect = (props) => {
  const {as, md, controlId, label, name, disabled, type, inputGroupPrepend, options} =
    props;
  return (
    <Field name={name}>
      {({field, form}) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId} className="mb-md-2">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                disabled={disabled}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                as="select"
              >
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Form.Control>
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

FormSelect.defaultProps = {
  type: "select",
  inputGroupPrepend: null,
};

export default FormSelect;
