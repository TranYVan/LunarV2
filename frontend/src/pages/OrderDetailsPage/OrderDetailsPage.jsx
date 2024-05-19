import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import { convertPrice } from '../../utils'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as OrderService from '../../services/OrderService'
import { useQuery } from 'react-query'
import { orderConstant } from '../../constant'

const OrderDetailsPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  ('id ', id);
  const [ isOrderIdAvailable, setIsOrderIdAvailable] = useState(false);
  
  useEffect(() => {
    if (id) {
        setIsOrderIdAvailable(true);
    }
  }, [id]);
  
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getOrderDetailById(id);
    ('res', res);
    return res;
  }

  const queryOrder = useQuery({queryKey: ['order-details'], queryFn: fetchDetailsOrder, enabled: isOrderIdAvailable});
  
  const {isLoading, data} = queryOrder;
  ('data ', data)
  ('is av', isOrderIdAvailable)
  return (
    <LoadingComponent isLoading={isLoading}>
      <div style={{width: '100%', minHeight: '100vh', background: '#f5f5fa'}}>
        <div style={{ width: '1270px', margin: '0 auto', height: '1270px'}}>
          <h4 style={{fontSize: '20px', paddingTop: '10px'}}>Order Details</h4>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel style={{fontWeight: 'bold', fontSize: '14px'}}>Shipping Address</WrapperLabel>
              <WrapperContentInfo>
                <div className='name-info'>{data?.customerName}</div>
                <div className='address-info'><span>Address: </span>{data?.customerAddress}, {data?.customerCity}</div>
                <div className='phone-info'><span>Phone: </span>{data?.customerPhone}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel style={{fontWeight: 'bold', fontSize: '13px'}}>Delivery Method</WrapperLabel>
              <WrapperContentInfo>
                <div className='delivery-info'><span className='name-delivery'>{orderConstant.delivery[data?.deliveryMethod]}</span></div>
                <div className='delivery-fee'><span>Shipping Charge: </span> {convertPrice(data?.shippingPrice)}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel style={{fontWeight: 'bold', fontSize: '13px'}}>Payment Method</WrapperLabel>
              <WrapperContentInfo>
                <div className='payment-info'>{orderConstant.payment[data?.paymentMethod]}</div>
                <div className='status-payment'>{data?.isPaid ? 'Payment Received' : 'Payment Not Received'}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
              <WrapperItemLabel style={{width: '670px'}}>Products</WrapperItemLabel>
              <WrapperItemLabel>Price</WrapperItemLabel>
              <WrapperItemLabel>Amount</WrapperItemLabel>
              <WrapperItemLabel>Discount</WrapperItemLabel>
            </div>
            
            {data?.orderedItems?.map((order) => {
              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img src={order?.product?.thumbnails} 
                      style={{
                        width: '70px', 
                        height: '70px', 
                        objectFit: 'cover',
                        padding: '2px'
                      }}
                    />
                    <div style={{
                      width: 540,
                      overflow: 'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap',
                      height: '70px',
                      cursor: 'pointer',
                      marginLeft: '13px'
                    }}
                      onClick={() => navigate(`/product-details/${order?.product?.id}`)}
                    >{order?.product?.name}</div>
                  </WrapperNameProduct>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem>{order?.amount}</WrapperItem>
                  <WrapperItem style={{color: 'rgb(80, 200, 120)'}}>- {order?.discount ? convertPrice((order?.price * order?.discount * 0.01).toFixed(2)) : '0 $'}</WrapperItem>
                  
                </WrapperProduct>
              )
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Sub Total</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.itemsPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Shipping Charge</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Final Total</WrapperItemLabel>
              <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </div>
      </div>
    </LoadingComponent>
  )
}

export default OrderDetailsPage