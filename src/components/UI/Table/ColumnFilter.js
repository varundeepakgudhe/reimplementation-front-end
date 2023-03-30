import React, {useState} from "react";
import {useAsyncDebounce} from "react-table";
import Input from "../Input";

const ColumnFilter = (props) => {
    const [filterValue, setFilterValue] = useState(props.column.filterValue);

    const searchHandler = (event) => {
        setFilterValue(event.target.value);
        onChange(event.target.value);
    };

    const onChange = useAsyncDebounce((value) => {
        props.column.setFilter(value);
    }, 400);

    return (
        <Input
            id="columnFilter"
            className="w-75"
            input={{
                defaultValue: filterValue,
                onChange: searchHandler,
            }}
        />
    );
};

export default ColumnFilter;
