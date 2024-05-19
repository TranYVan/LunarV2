import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { convertPrice } from "../../utils";
import {EditOutlined, SearchOutlined } from "@ant-design/icons";
import { InputComponent } from "../InputComponent/InputComponent";
import { Button, Checkbox, Form, Space, message } from "antd";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import { orderConstant } from "../../constant";

const AdminOrder = () => {

  const initial = () => ({
    id: 0,
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerCity: '',
    customerPhone: '',
    paymentMethod: '',
    deliveryMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    discount: 0,
    finalTotal: 0,
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isCanceled: false,
    canceledAt: '',
    orderedItems: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [stateOrderDetails, setStateOrderDetails] = useState(initial());
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [rowSelected, setRowSelected] = useState('');
  const [formUpdate] = Form.useForm();

  console.log('row', rowSelected)
  const getAllOrders = async () => {
    const res = await OrderService.getAllOrders();
    return res;
  }
  const mutationUpdate = useMutationHook(
    ({ id, data }) => {
      const {
        isPaid,
        isDelivered,
        isCanceled
      } = data

      const res = OrderService.updateOrder(id, {
        isPaid,
        isDelivered,
        isCanceled
      })
      return res
    }
  )
  const fetchOrderDetails = async (rowSelected) => {
    const res = await OrderService.getOrderDetailById(rowSelected);
    console.log('data ', res);
    if (res) {
        setStateOrderDetails({
            id: res?.id,
            customerName: res?.customerName,
            customerEmail: res?.customerEmail,
            customerAddress: res?.customerAddress,
            customerCity: res?.customerCity,
            customerPhone: res?.customerPhone,
            paymentMethod: res?.paymentMethod,
            deliveryMethod: res?.deliveryMethod,
            itemsPrice: res?.itemsPrice,
            shippingPrice: res?.shippingPrice,
            discount: res?.discount,
            totalPrice: res?.totalPrice,
            isPaid: res?.isPaid,
            paidAt: res?.paidAt,
            isDelivered: res?.isDelivered,
            deliveredAt: res?.deliveredAt,
            isCanceled: res?.isCanceled,
            canceledAt: res?.canceledAt,
            orderedItems: res?.orderedItems,
        })
    }

    return res;
};
  const handleOnChangeDetails = (prop, value) => {
    setStateOrderDetails({
        ...stateOrderDetails,
        [prop]: value
    });
    console.log('prop - value', prop, value);
  };

  const queryOrders = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  });

  const onUpdateOrder = () => {
    console.log('updating');
    mutationUpdate.mutate({ id: rowSelected, data: stateOrderDetails }, {
        onSettled: () => {
            queryOrders.refetch();
        }
    });
  }
  
  const handleDetailsOrder = async () => {
    if (rowSelected) {
        const res = await fetchOrderDetails(rowSelected);
    }
    setIsOpenDrawer(true);
  };
  

  const { data: orders, isPending: isPendingOrders } = queryOrders;
  const { data: dataUpdated, isLoading: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;

  console.log('orders ', mutationUpdate);
  
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateOrderDetails(initial());
    formUpdate.resetFields();
  }
  
  useEffect(() => {
    if (rowSelected) {
        fetchOrderDetails(rowSelected);
    }
  }, [rowSelected]);
  
  useEffect(() => {
    if (isSuccessUpdated) {
        messageApi.success("Update Order Successfully")
        handleCloseDrawer();
    }
    else if (isErrorUpdated) {
        message.error("Update Order Failed");
    }
}, [isSuccessUpdated]);

  useEffect(() => {
    formUpdate.setFieldsValue(stateOrderDetails);
  }, [formUpdate, stateOrderDetails]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <InputComponent
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                    marginBottom: 8,
                    display: 'block',
                }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Reset
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
            style={{
                color: filtered ? '#1890ff' : undefined,
            }}
        />
    ),
    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
});
  const renderAction = () => {
    return (
      <div>
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} 
        onClick={handleDetailsOrder} 
        />
      </div>
    )
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Phone",
      dataIndex: "customerPhone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "customerAddress",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Status",
      render: (_, record) => {
        if (record.isCanceled) {
          return "Canceled";
        } else {
          let status = "";
          status += record.isPaid ? "Paid" : "Not Paid";
          status += " - ";
          status += record.isDelivered ? "Delivered" : "Not Delivered";
          return status;
        }
      },
      filters: [
        {
          text: "Paid",
          value: "paid",
        },
        {
          text: "Unpaid",
          value: "unpaid",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Not Delivered",
          value: "notdelivered",
        },
        {
          text: "Canceled",
          value: "canceled",
        },
        {
          text: "Active",
          value: "active",
        },
      ],
      onFilter: (value, record) => {
        if (value === "paid") {
          return record.isPaid === true;
        } else if (value === "unpaid") {
          return record.isPaid === false;
        } else if (value === "delivered") {
          return record.isDelivered === true;
        } else if (value === "notDelivered") {
          return record.isDelivered === false;
        } else if (value === "canceled") {
          return record.isCanceled === true;
        }

        return record.isCanceled === false;
      },
    },
    // {
    //   title: "Last Updated",
    //   dataIndex: "updatedAt",
    //   render: (text) => {
    //     const date = new Date(text);
    //     return `${date.getDate()}-${
    //       date.getMonth() + 1
    //     }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //   },
    // },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      render: (_, record) => orderConstant.payment[record?.paymentMethod],
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (_, record) => convertPrice(record.totalPrice),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  return (
    <div>
      {contextHolder}
      <WrapperHeader>Manage Orders</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          data={orders}
          isLoading={isPendingOrders}
          // data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record.id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent title="Order Details" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
        <LoadingComponent isLoading={isPendingUpdated}>
          <div style={{ marginBottom: '20px' }}>
              <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Order ID: {stateOrderDetails.id}</h2>
              <p><strong>Customer Name:</strong> {stateOrderDetails.customerName}</p>
              <p><strong>Customer Phone:</strong> {stateOrderDetails.customerPhone}</p>
              <p><strong>Customer Address:</strong> {stateOrderDetails.customerAddress + ', ' + stateOrderDetails.customerCity}</p>
              <p><strong>Payment Method:</strong> {stateOrderDetails.paymentMethod}</p>
              <p><strong>Discount:</strong> -{convertPrice(stateOrderDetails.discount)}</p>
              <p><strong>Total Price:</strong> {convertPrice(stateOrderDetails.totalPrice)}</p>
          </div>

          <h4>Order Items:</h4>
          {stateOrderDetails.orderedItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                  <h3>{item.product.name}</h3>
                  <p><strong>Amount:</strong> {item.amount}</p>
                  <p><strong>Price:</strong> {convertPrice(item.price)}</p>
                  <p><strong>Discount:</strong> {item.discount}</p>
              </div>
          ))}

          <Form
              name="formUpdateOrder"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              onFinish={onUpdateOrder}
              autoComplete="on"
              form={formUpdate}
          >
              <Form.Item
                  label="Is Paid"
                  name="isPaid"
              >
                  <Checkbox checked={stateOrderDetails.isPaid} onChange={(e) => handleOnChangeDetails('isPaid', e.target.checked)} name="isPaid" />
              </Form.Item>

              <Form.Item
                  label="Is Delivered"
                  name="isDelivered"
              >
                  <Checkbox checked={stateOrderDetails.isDelivered} onChange={(e) => handleOnChangeDetails('isDelivered', e.target.checked)} name="isDelivered" />
              </Form.Item>

              <Form.Item
                  label="Is Canceled"
                  name="isCanceled"
              >
                  <Checkbox checked={stateOrderDetails.isCanceled} onChange={(e) => handleOnChangeDetails('isCanceled', e.target.checked)} name="isCanceled" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                      Apply
                  </Button>
              </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
    </div>
  );
};

export default AdminOrder;
