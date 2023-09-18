const initalState = {
  listProducts: [],
  listUsers: [],
  listOrder: [],
  listBrand: [],
  listEvaluate: [],
};

// Reducers: Xử lý các action và trả về trạng thái mới.
export const handleReducers = (
  state = initalState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LIST_PRODUCTS":
      return {
        ...state,
        listProducts: action.payload,
      };
    case "LIST_USERS":
      return {
        ...state,
        listUsers: action.payload,
      };
    case "LIST_ORDER":
      return {
        ...state,
        listOrder: action.payload,
      };
    case "LIST_BRAND":
      return {
        ...state,
        listBrand: action.payload,
      };
    case "LIST_EVALUATE":
      return {
        ...state,
        listEvaluate: action.payload,
      };
    default:
      return state;
  }
};
