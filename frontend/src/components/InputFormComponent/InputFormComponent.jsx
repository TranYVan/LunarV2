import { Input } from 'antd';
import React, { useState } from 'react'

const InputFormComponent = (props) => {
  const [valueInput, setValueInput] = useState('')
  const { placeholder = "Fill in here", ...rests } = props;

  return (
    <Input placeholder={placeholder} valueinput={valueInput}
      style={{
        marginBottom: "10px",
      }}
      {...rests}
    />
  );
}

export default InputFormComponent