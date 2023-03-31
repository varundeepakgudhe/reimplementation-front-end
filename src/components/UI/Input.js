import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import {InfoIcon} from "./Icons";

const Input = React.forwardRef((props, ref) => {
  const displayLabel = props.tooltip ? (
    <>
      {props.label + " "}
      <InfoIcon id={`${props.id}-tooltip`} info={props.tooltip}/>
    </>) : props.label;

  return (
    <InputGroup className={props.className}>
      <InputGroup.Text id={props.id}>{displayLabel}</InputGroup.Text>
      <FormControl aria-label={props.label} ref={ref} {...props.input} />
    </InputGroup>
  );
});

export default Input;
