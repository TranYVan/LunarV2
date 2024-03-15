import { Card } from "antd";
import styled from "styled-components";

export const WrapperCard = styled(Card)`
  width: 200px;
  & img {
    height: 210px;
    width: 200px;
  }
` 

export const StyleNameProduct = styled.div`
  display: inline;
  line-height: 12px;
  font-size: 14px;
  color: #45474b;
  font-weight: 400;
`;

export const WrapperAmountSoldText = styled.div`
  font-size: 10px;
  color: #a2b5bb;
  display: flex;
  align-items: center;
`;

export const WrapperPrice = styled.div`
  color: #45474b;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1;
  font-size: 14.4px;
  margin: 8px 0;
`;