import { Button, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 16px;
`

export const WrapperAddUserButton = styled(Button)`
  height: 130px;
  width: 130px;
  border-radius: 30%;
  border-style: dashed;
`

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item-info {
    display: none;
  }
  & .ant-upload-list {
    display: none;
  }
`;