import { Image, Row } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 62px;
  width: 62px;
`;

export const WrapperImagesSmallContainer = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

export const WrapperNameProduct = styled.span`
  font-weight: 700;
  font-style: normal;
  font-family: "Open Sans", sans-serif;
  color: #45474b;
  line-height: 35.36px;
  font-size: 27.2px;
  word-break: break-word;
`;

export const WrapperPriceProduct = styled.span`
  font-style: normal;
  font-family: "Open Sans", sans-serif;
  color: #45474b;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  text-wrap: nowrap;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const WrapperAmountSoldText = styled.div`
  font-size: 12px;
  color: #a2b5bb;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #B6BBC4;
  width: 100px;
  padding: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
`;