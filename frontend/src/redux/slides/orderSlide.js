import { createSlice } from "@reduxjs/toolkit";

/**
 * private UUID id;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @JsonView(Views.ExternalView.class)
    private User user;

    @JsonView({Views.ExternalView.class})
    private Double itemsPrice;
    @JsonView({Views.ExternalView.class})
    private Double shippingPrice;
    @JsonView({Views.ExternalView.class})
    private Double totalPrice;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isPaid;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime paidAt;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isDelivered;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime deliveredAt;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isCanceled;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime canceledAt;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerName;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerAddress;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerCity;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerCountry;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerPhone;

    @JsonView(Views.ExternalView.class)
    private String description;
    @JsonView(Views.ExternalView.class)
    private String paymentMethod;
    @JsonView(Views.ExternalView.class)
    private String deliveryMethod;
    @JsonView(Views.ExternalView.class)
    private Float discount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonView({Views.ExternalView.class})
    private Collection<OrderedItems> orderedItems = new ArrayList<>();
 */

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

    increaseAmount: (state, action) => {
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      itemOrder.amount++;

    },
    decreaseAmount: (state, action) => {
      console.log('payload ', action.payload);
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.find((item) => item?.product?.id === productId);
      itemOrder.amount--;
      
    },
    removeOrderProduct: (state, action) => {
      const {productId} = action.payload;
      const itemOrder = state?.orderedItems?.filter((item) => item?.product?.id !== productId);
      console.log('itemorder', {productId, itemOrder});  
      state.orderedItems = itemOrder;
    },
    removeAllOrderProduct: (state, action) => {
      const {listChecked} = action.payload;
      const itemOrders = state?.orderedItems?.filter((item) => !listChecked.includes(item.product.id));
      if (itemOrders) {
        state.orderedItems.splice(0, state.orderedItems.length, ...itemOrders);
      }
      state.orderedItems = itemOrders;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } = orderSlice.actions;

export default orderSlice.reducer;
