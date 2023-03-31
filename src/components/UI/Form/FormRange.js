import {Field} from "formik";
import {Form, InputGroup} from "react-bootstrap";
import InfoToolTip from "../InfoToolTip";

const FormRange = (props) => {
  const {controlId, label, name, min, max, step, as, md, disabled, tooltip} = props;

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
          <Form.Label>
            {displayLabel}: {field.value}{" "}
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
  tooltip: null,
};

export default FormRange;
