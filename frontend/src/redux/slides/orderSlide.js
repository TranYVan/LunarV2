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
      const {orderItem} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === orderItem.product?.id);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else{
        state?.orderedItems.push(orderItem);
      }
    },
    resetOrder: (state, action) => {
      state.id = "",    
      state.user= {},
      state.itemsPrice= 0,
      state.shippingPrice= 0,
      state.totalPrice= 0,
      state.isPaid= false,
      state.paidAt= "",
      state.isDelivered= false,
      state.deliveredAt= "",
      state.isCanceled= false,
      state.canceledAt= "",
      state.customerName= "",
      state.customerAddress= "",
      state.customerCity= "",
      state.customerCountry= "",
      state.customerPhone= "",
      state.description= "",
      state.paymentMethod= "",
      state.deliveryMethod= "",
      state.discount= 0,
      state.orderedItems= [],
      state.selectedOrderedItems= []

    },
    setAmount: (state, action) => {
      const {val, productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      if (itemOrder) {
        if (itemOrder.product.stockQuantity >= val && val >= 1) {
          itemOrder.amount = val;
        }
      }
      const selectedItemOrder = state?.selectedOrderedItems?.find((item) => item?.product?.id === productId);
      if (selectedItemOrder && selectedItemOrder.product.stockQuantity >= val && val >= 1) {
        selectedItemOrder.amount = val;
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

      const newSelectedOrderItems = state?.selectedOrderedItems?.filter((item) => item?.product?.id !== productId);
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
      const orderItemsSelected = [];
      state?.orderedItems.forEach((order) => {
          if (listChecked.includes(order?.product?.id)) {
              orderItemsSelected.push(order);
          }
      });
      if (orderItemsSelected) {
          state.selectedOrderedItems = [...orderItemsSelected]; 
      }
    },
    buyItem: (state, action) => {
      const {product, amount} = action.payload;
      
      const item = {
        product: product,
        amount: amount,
        price: product?.cost,
        discount: product?.discount
      }
      state.selectedOrderedItems = [];
      state.selectedOrderedItems.push(item);
    }
  }
});

// Action creators are generated for each case reducer function
export const { resetOrder, buyItem, addOrderProduct, increaseAmount, decreaseAmount,setAmount, removeOrderProduct, removeAllOrderProduct,selectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
