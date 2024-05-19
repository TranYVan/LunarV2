import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
  display: flex;

  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const WrapperNavbar = styled(Col)`
  background: #fff;
  margin-right: 10px;
  padding: 7px;
  border-radius: 6px;
  height: fit-content;
  margin-top: 20px;
  width: 200px;
`;

export const WrapperLabelText = styled.h4`
  color: #45474b;
  font-size: 20px;
  font-weight:550;
  margin-bottom: 10px;
`;

export const WrapperContentText = styled.h1`
  color: #45474b;
  font-size: 15px;
  font-weight: 400;
`;

export const WrapperContentContainer = styled.div`
  display: flex;
  align-item: left;
  flex-direction: column;
  gap: 12px;
`