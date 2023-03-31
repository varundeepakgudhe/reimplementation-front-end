import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import InfoToolTip from "../InfoToolTip";

const FormCheckboxGroup = (props) => {
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
        <Form.Group as={as} md={md} controlId={controlId}>
          <Form.Label>{displayLabel}</Form.Label>
          <InputGroup>
            {options.map((option) => (
              <Form.Check
                {...field}
                key={option.value}
                type="checkbox"
                className="mx-md-2"
                label={option.label}
                value={option.value}
                disabled={disabled}
                checked={field.value.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    form.setFieldValue(name, [...field.value, option.value]);
                  } else {
                    form.setFieldValue(
                      name,
                      field.value.filter((value) => value !== option.value)
                    );
                  }
                }}
              />
            ))}
          </InputGroup>
        </Form.Group>
      )}
    </Field>
  );
};

export default FormCheckboxGroup;
