import { Image, Row, InputNumber } from "antd";
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
  padding: 10px;
  margin-top: 25px;
  margin-bottom: 5px;
`;

export const WrapperAmountSoldText = styled.span`
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
  width: 99px;
  padding: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

export const WrapperAddress = styled.div`
  color: #45474b;
  font-size: 15px;
  font-weight: 550;
  line-height: 20px;
  text-wrap: nowrap;
  padding: 10px;
  display: flex;
  gap: 12px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const WrapperInputNumber = styled(InputNumber)`
  width: 50px;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(51, 51, 51);
  font-size: 14px;
  border: 0;
  .ant-input-number-handler-wrap {
    display: none !important
  }
`