export const initialState = {
  cart: [],
  isAllredyPresentInCart: false,
  products: [],
  checkout: [],
  user: null,
  totalprice: 0,
  shipping : {},
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const result = state.cart.filter((c) => c.id === action.payload.id);
      if (result.length === 0) {
        const cart = {
          ...action.payload,
          quantity: "1",
          total: action.payload.price,
        };
        state.totalprice =
          parseInt(state.totalprice) + parseInt(action.payload.price);
        return {
          ...state,
          cart: [...state.cart, { ...cart }],
          isAllredyPresentInCart: true,
        };
      } else {
        return { ...state };
      }
      break;
    }
    case "REMOVE_FROM_CART":{
      let price = 0;
      const result = state.cart.filter((c) => c.id !== action.payload.id);
      const remove = state.cart.filter((c) => c.id === action.payload.id);
      for (const product of remove) {
         state.totalprice = parseInt(state.totalprice) - parseInt(product.total); 
      }
      return {
        ...state,
        cart : result 
      }
    }
      break;
    case "INCREASE_PRODUCT_QUANTITY":
      {
        state.cart.map((product) => {
          if (product.id === action.payload.id) {
            product.quantity =
              parseInt(product.quantity) + parseInt(action.payload.quantity);
            product.total =
              parseInt(product.total) + parseInt(action.payload.price);
            state.totalprice =
              parseInt(state.totalprice) + parseInt(action.payload.price);
          }
        });
        return { ...state };
      }
      break;
    case "DECREASE_PRODUCT_QUANTITY":
      {
        state.cart.map((product) => {
          if (product.id === action.payload.id) {
            product.quantity =
              parseInt(product.quantity) - parseInt(action.payload.quantity);
            product.total =
              parseInt(product.total) - parseInt(action.payload.price);
            state.totalprice =
              parseInt(state.totalprice) - parseInt(action.payload.price);
          }
        });
        return { ...state };
      }
      break;

    case "ADD_PRODUCTS":
      return {
        ...state,
        products: [action.payload],
      };
      break;
    case "USER_LOGIN":
      {
        return {
          ...state,
          user: { ...action.payload },
        };
      }
      break;
    case "USER_LOGOUT":
      {
        return {
          ...state,
          user: null,
        };
      }
      break;

      case "ADD_SHIPPING_ADDRESS":{
        return{
          ...state,
          shipping : {...action.payload}
        }
      }
      break;
      case "CART_EMPTY" : {
          return {
            ...state,
            cart : {}
          } 
      }
      break;
    default:
      return state;
  }
}

export default reducer;
