import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import InfoToolTip from "../InfoToolTip";

const FormRadioGroup = (props) => {
  const {as, md, controlId, label, name, options, disabled, tooltip} = props;

  const displayLabel = tooltip ? (
    <>
      {label + " "}
      <InfoToolTip id={`${controlId}-tooltip`} info={tooltip}/>
    </>
  ) : label;

  return (
    <Field name={name}>
      {({field, form}) => (
        <Form.Group as={as} md={md} controlId={controlId} className="mb-md-2">
          <Form.Label>{displayLabel}</Form.Label>
          <InputGroup>
            {options.map((option) => (
              <Form.Check
                {...field}
                key={option.value}
                type="radio"
                disabled={disabled}
                label={option.label}
                value={option.value}
                checked={field.value === option.value}
                onChange={() => form.setFieldValue(name, option.value)}
              />
            ))}
          </InputGroup>
        </Form.Group>
      )}
    </Field>
  );
};

export default FormRadioGroup;
