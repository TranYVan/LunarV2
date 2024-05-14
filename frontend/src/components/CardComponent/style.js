import { Card } from "antd";
import styled from "styled-components";

export const WrapperCard = styled(Card)`
  width: 200px;
  & img {
    height: 210px;
    width: 200px;
  };
  background-color: ${props => props.disabled ? '#ccc' : '#fff'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
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
  margin-top: 8px;
`;

export const WrapperPrice = styled.div`
  color: #cc0a2e;
  font-weight: 700;
  font-size: 14.4px;
  margin-top: 5px;
`;

export const WrapperDiscount = styled.span`
  font-weight: 500;
  font-size: 12px;
  margin-left: 15px;
`;