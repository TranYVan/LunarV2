import React from 'react'
import { Lable, WrapperContainer, WrapperInfo, WrapperItemOrder, WrapperItemOrderInfo, WrapperValue } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { orderConstant } from '../../constant';
import { convertPrice } from '../../utils';

const OrderSuccess = () => {

  const order = useSelector((state) => state?.order);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const {state} = location;

  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '15px', marginLeft: '15px', paddingTop: '12px' }}>Order Placed Successfully</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                  <Lable>Delivery Method</Lable>
                  <WrapperValue>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderConstant.delivery[state?.delivery]}</span>
                      {/* <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio> */}
                  </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                  <Lable>Payment Method</Lable>
                  <WrapperValue>{orderConstant.payment[state?.payment]}</WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state?.orderItems.map((item) => {
                return (
                  <WrapperItemOrder key={item?.product?.id}>
                    <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src={item?.product?.thumbnails} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                      }}>{item?.product?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <span>
                          <span style={{ fontSize: '15px', color: '#242424' }}>Amount: {item?.amount}</span>
                      </span>
                      <span>
                          <span style={{ fontSize: '15px', color: '#242424' }}>Price: <strong>{convertPrice(item.price)}</strong></span>
                      </span>
                    </div>
                  </WrapperItemOrder> 
                )
              })}
            </WrapperItemOrderInfo>
            <div style={{textAlign: 'right', marginRight: '34px'}}>
              <span style={{ fontSize: '16px', color: 'rgb(80, 200, 120)' }}>Discount: <strong>- {state?.discount? state?.discount: 0}</strong></span>
            </div>

            <div style={{textAlign: 'right', marginRight: '34px'}}>
              <span style={{ fontSize: '16px', color: 'red' }}>Total: <strong>{convertPrice(state?.finalTotal)}</strong></span>
            </div>
          </WrapperContainer>
        </div>
      </div>

    </div>
  )
}

export default OrderSuccess