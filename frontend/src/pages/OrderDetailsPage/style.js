import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 13px;
    color: #45474B;
    font-weight: bold;
    text-transform: uppercase;
  }
  .address-info,.phone-info,.delivery-fee,.status-payment {
    color: #45474B;
    font-size: 13px;
    margin-top: 10px;
  }
  .name-delivery,.payment-info {
    color: #F4CE14; 
    font-weight: bold;
    text-transform: uppercase;
    font-size: 13px;
  };
  
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 12px 12px #ccc;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  font-size: 13px;
  padding: 7px;
  background-color: #fff;
  box-shadow: 0 12px 12px #ccc;
  border-radius: 8px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  font-weight: bold;
  
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`