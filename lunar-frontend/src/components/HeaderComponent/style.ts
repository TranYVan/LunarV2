import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
  padding: 10px 0;
  background-color: #F4CE14;
  align-items: center;
  width: 1270px;
  gap: 10px;
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
  color: #fff;
  white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;