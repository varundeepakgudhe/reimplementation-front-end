import React from "react";
import {Form, InputGroup} from "react-bootstrap";

const Select = React.forwardRef((props, ref) => {
    const {className, id, label, input, options} = props;

    return (
        <InputGroup className={className}>
            <InputGroup.Text id={id}>{label}</InputGroup.Text>
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
