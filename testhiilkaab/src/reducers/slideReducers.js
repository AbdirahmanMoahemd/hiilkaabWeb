import {
  SLIDE_DELETE_FAIL,
  SLIDE_DELETE_REQUEST,
  SLIDE_DELETE_SUCCESS,
  SLIDE_LIST_FAIL,
  SLIDE_LIST_REQUEST,
  SLIDE_LIST_SUCCESS,
  SLIDE_UPDATE_FAIL,
  SLIDE_UPDATE_RESET,
  SLIDE_UPDATE_SUCCESS,
  SLIDE_UPDATE_REQUEST,
  SLIDE_DETAILS_FAIL,
  SLIDE_DETAILS_SUCCESS,
  SLIDE_DETAILS_REQUEST,
  SLIDE_DETAILS_RESET,
  SLIDE_CREATE_REQUEST,
  SLIDE_CREATE_SUCCESS,
  SLIDE_CREATE_FAIL,
  SLIDE_CREATE_RESET,
} from "../constants/slideConstants";

export const slideListReducer = (state = { slides: [] }, action) => {
  switch (action.type) {
    case SLIDE_LIST_REQUEST:
      return { loading: true, slides: [] };
    case SLIDE_LIST_SUCCESS:
      return {
        loading: false,
        slides: action.payload,
      };
    case SLIDE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const slideDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_DELETE_REQUEST:
      return { loading: true };
    case SLIDE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SLIDE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sildeDetailsReducer = (state = { slide: {} }, action) => {
  switch (action.type) {
    case SLIDE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SLIDE_DETAILS_SUCCESS:
      return { loading: false, slide: action.payload };
    case SLIDE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SLIDE_DETAILS_RESET:
      return { slide: {} };
    default:
      return state;
  }
};

export const slideUpdateReducer = (state = { slide: {} }, action) => {
  switch (action.type) {
    case SLIDE_UPDATE_REQUEST:
      return { loading: true };
    case SLIDE_UPDATE_SUCCESS:
      return { loading: false, success: true, slide: action.payload };
    case SLIDE_UPDATE_RESET:
      return { slide: {} };
    case SLIDE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const slideCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_CREATE_REQUEST:
      return { loading: true };
    case SLIDE_CREATE_SUCCESS:
      return { loading: false, success: true, slide: action.payload };
    case SLIDE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SLIDE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
