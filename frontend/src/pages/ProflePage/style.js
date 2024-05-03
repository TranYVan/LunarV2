import styled from "styled-components";
import {
  EditFilled
} from "@ant-design/icons";
import { Upload } from "antd";

export const WrapperHeader = styled.h1`
  color: rgb(69, 71, 75);
	font-size: 18px;
	margin: 4px 0;
  font-weight: 800;
  text-align: center;
`;

export const WrapperContentProfle = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	width: 700px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
`

export const WrapperLabel = styled.label`
  color: rgb(51, 72, 98);
  font-size: 15px;
  font-weight: 550;
  line-height: 47px;
  width: 110px;
`

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  justify-content: flex-start;
  width: 100%;
`

export const WrapperEditIcon = styled(EditFilled)`
  font-size: 16px;
  color: rgb(73, 94, 87);
  &:hover {
    background-color: #ccc;
  }
`

export const WrapperUploadImage = styled.label`
  font-size: 16px;
  color: rgb(51, 72, 98);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  border-radius: 40%;
  text-align: center;
  gap: 5px;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.03);
  border: 1px dashed #ccc;

`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list {
        display: none;
    }
`