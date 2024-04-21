import { DatePicker } from 'antd'
import React from 'react'
const dateFormat = 'YYYY-MM-DD';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const DatePickerComponent = () => {
  return (
    <DatePicker
      defaultValue={dayjs('2019-09-03', dateFormat)}
      minDate={dayjs('2019-06-01', dateFormat)}
      maxDate={dayjs('2020-06-30', dateFormat)}
      style={{
        marginBottom: "10px",
      }}
    />
  )
}

export default DatePickerComponent