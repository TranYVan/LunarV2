import { Steps } from "antd";
import React from "react";

const Step = ({current = 0, items = [], ...rests}) => {
  return (
    <Steps
      size="small"
      current={current}
      items={items}
      {...rests}
    />
  );
};

export default Step;
