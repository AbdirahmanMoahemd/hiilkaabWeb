import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_LIST_DISCOUNT_FAIL,
  PRODUCT_LIST_DISCOUNT_REQUEST,
  PRODUCT_LIST_DISCOUNT_SUCCESS,
  BRAND_LIST_REQUEST,
  BRAND_LIST_FAIL,
  BRAND_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST2,
  PRODUCT_LIST_SUCCESS2,
  PRODUCT_LIST_FAIL2,
  PRODUCT_LIST_REQUEST3,
  PRODUCT_LIST_FAIL3,
  PRODUCT_LIST_REQUEST4,
  PRODUCT_LIST_FAIL4,
  PRODUCT_LIST_SUCCESS4,
  PRODUCT_LIST_SUCCESS3,
  PRODUCT_LIST_REQUEST1,
  PRODUCT_LIST_SUCCESS1,
  PRODUCT_LIST_FAIL1,
  CPRODUCT_LIST_REQUEST,
  CPRODUCT_LIST_SUCCESS,
  CPRODUCT_LIST_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const productListReducer = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productListReducer1 = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST1:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS1:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL1:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer2 = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST2:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS2:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL2:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer3 = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST3:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS3:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL3:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer4 = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST4:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS4:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL4:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true, products: [] };
    case BRAND_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const producDiscounttListReducer = (
  state = { products: [{ category: [], subcategory: [] }] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_DISCOUNT_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_DISCOUNT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_DISCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = {
    product: {
      reviews: [],
      category: [],
      subcategory: [],
      images: [],
      colors: [],
      sizes: [],
    },
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


export const productListReducerCount = (state = { counter: {} }, action) => {
  switch (action.type) {
      case CPRODUCT_LIST_REQUEST:
          return { loading: true, counter: {} }
      case CPRODUCT_LIST_SUCCESS:
          return {
              loading: false,
              counter: action.payload,
          }
      case CPRODUCT_LIST_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}



export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productTopReducer = (state = { products: [{ category: [], subcategory: [] }] } , action) => {
  switch (action.type) {
      case PRODUCT_TOP_REQUEST:
          return { loading: true, products: []}
      case PRODUCT_TOP_SUCCESS:
          return { loading: false, products: action.payload.products }
      case PRODUCT_TOP_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}
