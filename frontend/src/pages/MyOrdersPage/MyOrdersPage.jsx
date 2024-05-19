import React, { useEffect, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import * as OrderService from "../../services/OrderService";
import { useMutation, useQuery } from "react-query";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHook } from "../../hooks/useMutationHook";

const MyOrdersPage = () => {
  const user = useSelector((state) => state?.user);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  const fetchMyOrder = async () => {
    ("fetching orders", user?.id, user?.access_token);
    const res = await OrderService.getOrderByUserId(user?.id);
    ("res in fetch user orders", res);
    return res;
  };
  const queryOrder = useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchMyOrder,
    enabled: isUserDataLoaded,
  });

  useEffect(() => {
    if (user?.id && user?.access_token) {
      setIsUserDataLoaded(true);
    }
  }, [user]);

  const { isLoading, data } = queryOrder;
  ("data", data);
  
  const mutationCancelOrder = useMutationHook((payload) => {
    const res = OrderService.cancelOrderById(payload);
    ('cancel', res);

    return res;
  })

  const handleCancelOrder = (order) => {
    ('order id', order);
    mutationCancelOrder.mutate(order?.id, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const handleDetailsOrder = (id) => {
    navigate(`/order-details/${id}`, {
      state: {
        token: user?.access_token
      }
    })
  }
  const renderProduct = (data) => {
    return data?.map((item) => {
      return (
        <WrapperHeaderItem key={item?.product?.id}>
          <img
            src={item?.product?.thumbnails}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "wrap",
              marginLeft: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            // onClick={() => navigate(`/product-details/${item?.productID}`)}
          >
            {item?.product?.name}
          </div>
          <span
            style={{ fontSize: "16px", color: "#242424", marginLeft: "auto" }}
          >
            {item?.amount} * {convertPrice(item?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <WrapperContainer>
        <div style={{ minHeight: "100vh", width: "1270px", margin: "0 auto" }}>
          <h4 style={{ fontSize: "20px", paddingTop: "10px" }}>My Orders</h4>
          <WrapperListOrder style={{ paddingBottom: "40px" }}>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?.id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Order Status
                    </span>
                    {order?.isCanceled ? (
                      <WrapperStatus>
                        <span
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          Canceled
                        </span>
                      </WrapperStatus>
                    ) : (
                      <WrapperStatus>
                        <div>
                          <span style={{ color: "rgb(255, 66, 78)" }}>
                            Delivery:{" "}
                          </span>
                          <span
                            style={{
                              color: "rgb(90, 32, 193)",
                              fontWeight: "bold",
                            }}
                          >{`${
                            order.isDelivered ? "Delivered" : "Not Delivered"
                          }`}</span>
                        </div>
                        <div>
                          <span style={{ color: "rgb(255, 66, 78)" }}>
                            Payment:{" "}
                          </span>
                          <span
                            style={{
                              color: "rgb(90, 32, 193)",
                              fontWeight: "bold",
                            }}
                          >{`${
                            order.isPaid
                              ? "Payment Received"
                              : "Payment Not Received"
                          }`}</span>
                        </div>
                      </WrapperStatus>
                    )}
                  </WrapperStatus>
                  {renderProduct(order?.orderedItems)}
                  <WrapperFooterItem>
                    <div>
                      <span
                        style={{ color: "rgb(80, 200, 120)", fontSize: "16px" }}
                      >
                        Discount:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          color: "rgb(80, 200, 120)",
                          fontWeight: 700,
                        }}
                      >
                        - {order?.discount? convertPrice(order?.discount) : convertPrice(0)}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{ color: "rgb(255, 66, 78)", fontSize: "16px" }}
                      >
                        Total:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)", fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    {!order?.isCanceled && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!order?.isDelivered && (
                          <ButtonComponent
                            onClick={() => handleCancelOrder(order)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                            }}
                            textbutton={'Cancel Order'}
                            styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                          >
                          </ButtonComponent>
                        )}
                        <ButtonComponent
                          onClick={() => handleDetailsOrder(order?.id)}
                          size={40}
                          styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                          }}
                          textbutton={'Details'}
                          styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                        >
                        </ButtonComponent>
                      </div>
                    )}
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </LoadingComponent>
  );
};

export default MyOrdersPage;
