import styled from "styled-components";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  border-bottom: 1px solid #45474B;
  height: 44px;
  font-size: 15px;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    background: #a7d397;
    color: #555843;
    span {
      color: #111;
    }
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`