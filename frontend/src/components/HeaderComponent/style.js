import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
  padding: 8px 0;
  background-color: #F4CE14;
  align-items: center;
  width: 1270px;
  gap: 19px;
`;

export const WrapperTextHeader = styled.span`
  font-size: 24px;
  color: #f5f7f8;
  font-weight: bold;
  text-align: left;
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #45474b;
  gap: 10px;
  font-size: 13px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 13px;
`

export const WrapperContentPopUp = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(73, 94, 87);
  }
`