import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";

const Input = React.forwardRef((props, ref) => {
    return (
        <InputGroup className={props.className}>
            <InputGroup.Text id={props.id}>{props.label}</InputGroup.Text>
            <FormControl aria-label={props.label} ref={ref} {...props.input} />
        </InputGroup>
    );
});

export default Input;
