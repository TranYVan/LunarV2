import { Input } from 'antd';
import React from 'react'

const InputFormComponent = (props) => {

  const { placeholder = "Fill in here",  ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <Input placeholder={placeholder} value={props.value}
      onChange={handleOnChangeInput}
      style={{
        marginBottom: "10px",
      }}
      {...rests}
    />
  );
}

export default InputFormComponent