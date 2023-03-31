import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import {InfoIcon} from "./Icons";

const Select = React.forwardRef((props, ref) => {
  const {className, id, label, input, options, tooltip} = props;

  const displayLabel = tooltip ? (
    <>
      {label + " "}
      <InfoIcon id={`${id}-tooltip`} info={tooltip}/>
    </>
  ) : label;

  return (
    <InputGroup className={className}>
      <InputGroup.Text id={id}>{displayLabel}</InputGroup.Text>
      <Form.Select aria-label={label} ref={ref} {...input}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
});

export default Select;
