import React, {useState} from "react";
import {useAsyncDebounce} from "react-table";
import Input from "../Input";

const GlobalFilter = (props) => {
  const [value, setValue] = useState(props.filter);

  const searchHandler = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const onChange = useAsyncDebounce((value) => props.setFilter(value), 500);

  return (
    <Input
      id="globalFilter"
      label="Search"
      input={{type: "text", defaultValue: value, onChange: searchHandler}}
    />
  );
};

export default GlobalFilter;
