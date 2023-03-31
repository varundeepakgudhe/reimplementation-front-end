import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import InfoToolTip from "../InfoToolTip";

const FormSelect = (props) => {
  const {as, md, controlId, label, name, disabled, type, inputGroupPrepend, options, tooltip} = props;

  const displayLabel = tooltip ? (
    <>
      {label + " "}
      <InfoToolTip id={`${controlId}-tooltip`} info={tooltip}/>
    </>
  ) : label;

  return (
    <Field name={name}>
      {({field, form}) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId} className="mb-md-2">
            <Form.Label>{displayLabel}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Select
                {...field}
                type={type}
                disabled={disabled}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
              >
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })}
              </Form.Select>
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
  tooltip: null,
  inputGroupPrepend: null,
};

export default FormSelect;
