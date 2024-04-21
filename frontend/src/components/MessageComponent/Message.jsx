
import { message } from 'antd';
const [messageApi, contextHolder] = message.useMessage();

export const success = (mes = 'success') => {
  messageApi.open({
    type: "success",
    content: mes,
  });
};
export const error = (mes = 'error') => {
  messageApi.open({
    type: "error",
    content: mes,
  });
};
export const warning = (mes = 'warning') => {
  messageApi.open({
    type: "warning",
    content: mes,
  });
};