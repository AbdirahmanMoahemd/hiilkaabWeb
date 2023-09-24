import {
  DELIVERY_CREATE_FAIL,
  DELIVERY_CREATE_REQUEST,
  DELIVERY_CREATE_RESET,
  DELIVERY_CREATE_SUCCESS,
  DELIVERY_DELETE_FAIL,
  DELIVERY_DELETE_REQUEST,
  DELIVERY_DELETE_SUCCESS,
  DELIVERY_DETAILS_FAIL,
  DELIVERY_DETAILS_REQUEST,
  DELIVERY_DETAILS_SUCCESS,
  DELIVERY_LIST_FAIL,
  DELIVERY_LIST_REQUEST,
  DELIVERY_LIST_SUCCESS,
  DELIVERY_UPDATE_FAIL,
  DELIVERY_UPDATE_REQUEST,
  DELIVERY_UPDATE_RESET,
  DELIVERY_UPDATE_SUCCESS,
} from "../constants/deliveryConstants";

export const deliveryOrdersListReducer = (state = { deliveryOrders: [] }, action) => {
  switch (action.type) {
    case DELIVERY_LIST_REQUEST:
      return { loading: true, deliveryOrders: [] };
    case DELIVERY_LIST_SUCCESS:
      return {
        loading: false,
        deliveryOrders: action.payload.deliveryOrders,
      };
    case DELIVERY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deliveryOrdersDetailsReducer = (state = { delivery: {} }, action) => {
  switch (action.type) {
    case DELIVERY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case DELIVERY_DETAILS_SUCCESS:
      return { loading: false, delivery: action.payload };
    case DELIVERY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deliveryOrdersDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVERY_DELETE_REQUEST:
      return { loading: true };
    case DELIVERY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DELIVERY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deliveryOrdersCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVERY_CREATE_REQUEST:
      return { loading: true };
    case DELIVERY_CREATE_SUCCESS:
      return { loading: false, success: true, delivery: action.payload };
    case DELIVERY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DELIVERY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deliveryOrdersUpdateReducer = (state = { order: {} } , action) => {
  switch (action.type) {
      case DELIVERY_UPDATE_REQUEST:
          return { loading: true}
      case DELIVERY_UPDATE_SUCCESS:
          return { loading: false, success: true, order: action.payload}
      case DELIVERY_UPDATE_RESET:
          return { order: {} }
      case DELIVERY_UPDATE_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}
