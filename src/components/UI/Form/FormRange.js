import {Field} from "formik";
import {Form, InputGroup} from "react-bootstrap";

const FormRange = (props) => {
  const {controlId, label, name, min, max, step, as, md, disabled} = props;

  return (
    <Field name={name}>
      {({field, form}) => (
        <Form.Group as={as} md={md} controlId={controlId}>
          <Form.Label>
            {label}: {field.value}{" "}
          </Form.Label>
          <InputGroup>
            <Form.Control
              {...field}
              type="range"
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              isInvalid={form.touched[field.name] && form.errors[field.name]}
            />
            <Form.Control.Feedback type="invalid">
              {form.errors[field.name]}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      )}
    </Field>
  );
};

FormRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default FormRange;
