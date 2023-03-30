import {Field} from "formik";
import React from "react";
import {Form, InputGroup} from "react-bootstrap";

const FormCheckboxGroup = (props) => {
  const {as, md, controlId, label, name, options} = props;
  return (
      <Field name={name}>
        {({field, form}) => (
            <Form.Group as={as} md={md} controlId={controlId}>
              <Form.Label>{label}</Form.Label>
              <InputGroup>
                {options.map((option) => (
                    <Form.Check
                        {...field}
                        key={option.value}
                        type="checkbox"
                        className="mx-md-2"
                        label={option.label}
                        value={option.value}
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
