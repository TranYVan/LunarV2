import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  user: {},
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isCanceled: false,
  canceledAt: "",
  customerName: "",
  customerAddress: "",
  customerCity: "",
  customerCountry: "",
  customerPhone: "",
  description: "",
  paymentMethod: "",
  deliveryMethod: "",
  discount: 0,
  orderedItems: [],
  selectedOrderedItems: []
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      console.log({state, action})
      const {orderItem} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === orderItem.product?.id);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else{
        state?.orderedItems.push(orderItem);
      }
    },
    setAmount: (state, action) => {
      const {val, productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      if (itemOrder) {
        if (itemOrder.product.stockQuantity >= val && val >= 1) {
          itemOrder.amount = val;
        }
      }
      
    },
    increaseAmount: (state, action) => {
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      if (itemOrder.product.stockQuantity > itemOrder.amount) {
        itemOrder.amount++;
      }
      const selectedItemOrder = state?.selectedOrderedItems?.find((item) => item?.product?.id === productId);
      if (selectedItemOrder && selectedItemOrder.amount < selectedItemOrder.product.stockQuantity) {
        selectedItemOrder.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      console.log('payload ', action.payload);
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      if (itemOrder.amount > 1) {
        itemOrder.amount--;
      }

      const selectedItemOrder = state?.selectedOrderedItems?.find((item) => item?.product?.id === productId);
      if (selectedItemOrder && selectedItemOrder.amount > 1) {
        selectedItemOrder.amount--;
      }
      
    },
    removeOrderProduct: (state, action) => {
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.filter((item) => item?.product?.id !== productId);
      
      state.orderedItems = itemOrder;

      const newSelectedOrderItems = state?.selectedOrderItems?.filter((item) => item?.product?.id !== productId);
      if (newSelectedOrderItems) {
        state.selectedOrderedItems.splice(0, state.selectedOrderedItems.length, ...newSelectedOrderItems);
      }
    },
    removeAllOrderProduct: (state, action) => {
      const {listChecked} = action.payload;
      const itemOrders = state?.orderedItems?.filter((item) => !listChecked.includes(item.product.id));
      if (itemOrders) {
        state.orderedItems.splice(0, state.orderedItems.length, ...itemOrders);
      }
      const selectedRemoveItemOrders = state?.selectedOrderedItems?.filter((item) => !listChecked.includes(item.product.id));
      if (selectedRemoveItemOrders) {
        state.selectedOrderedItems.splice(0, state.selectedOrderedItems.length, ...selectedRemoveItemOrders);
      }
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      console.log('list checked', listChecked);
      const orderItemsSelected = [];
      state?.orderedItems.forEach((order) => {
          if (listChecked.includes(order?.product?.id)) {
              orderItemsSelected.push(order);
          }
      });
      if (orderItemsSelected) {
          state.selectedOrderedItems = [...orderItemsSelected]; 
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount,setAmount, removeOrderProduct, removeAllOrderProduct,selectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
