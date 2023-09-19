import {
  DESTINATION_CREATE_FAIL,
  DESTINATION_CREATE_REQUEST,
  DESTINATION_CREATE_RESET,
  DESTINATION_CREATE_SUCCESS,
  DESTINATION_DELETE_FAIL,
  DESTINATION_DELETE_REQUEST,
  DESTINATION_DELETE_SUCCESS,
  DESTINATION_UPDATE_FAIL,
  DESTINATION_UPDATE_REQUEST,
  DESTINATION_UPDATE_RESET,
  DESTINATION_UPDATE_SUCCESS,
  DISTRICTS_CREATE_FAIL,
  DISTRICTS_CREATE_REQUEST,
  DISTRICTS_CREATE_RESET,
  DISTRICTS_CREATE_SUCCESS,
  DISTRICTS_DELETE_FAIL,
  DISTRICTS_DELETE_REQUEST,
  DISTRICTS_DELETE_SUCCESS,
  DISTRICTS_DETAILS_FAIL,
  DISTRICTS_DETAILS_REQUEST,
  DISTRICTS_DETAILS_SUCCESS,
  DISTRICTS_LIST_FAIL,
  DISTRICTS_LIST_REQUEST,
  DISTRICTS_LIST_SUCCESS,
  DISTRICTS_UPDATE_FAIL,
  DISTRICTS_UPDATE_REQUEST,
  DISTRICTS_UPDATE_RESET,
  DISTRICTS_UPDATE_SUCCESS,
} from "../constants/districtsConstants";

export const districtsListReducer = (state = { districts: [] }, action) => {
  switch (action.type) {
    case DISTRICTS_LIST_REQUEST:
      return { loading: true, districts: [] };
    case DISTRICTS_LIST_SUCCESS:
      return {
        loading: false,
        districts: action.payload.districts,
      };
    case DISTRICTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const districtDetailsReducer = (state = { district: {} }, action) => {
  switch (action.type) {
    case DISTRICTS_DETAILS_REQUEST:
      return { loading: true, ...state };
    case DISTRICTS_DETAILS_SUCCESS:
      return { loading: false, district: action.payload };
    case DISTRICTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const districtDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISTRICTS_DELETE_REQUEST:
      return { loading: true };
    case DISTRICTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DISTRICTS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const destinationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DESTINATION_DELETE_REQUEST:
      return { loading: true };
    case DESTINATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DESTINATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const districtCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISTRICTS_CREATE_REQUEST:
      return { loading: true };
    case DISTRICTS_CREATE_SUCCESS:
      return { loading: false, success: true, district: action.payload };
    case DISTRICTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DISTRICTS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const districtUpdateReducer = (state = { district: {} }, action) => {
  switch (action.type) {
    case DISTRICTS_UPDATE_REQUEST:
      return { loading: true };
    case DISTRICTS_UPDATE_SUCCESS:
      return { loading: false, success: true, district: action.payload };
    case DISTRICTS_UPDATE_RESET:
      return { district: {} };
    case DISTRICTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const destinationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DESTINATION_CREATE_REQUEST:
      return { loading: true };
    case DESTINATION_CREATE_SUCCESS:
      return { loading: false, success: true, district: action.payload };
    case DESTINATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DESTINATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const destinationUpdateReducer = (
  state = { distination: {} },
  action
) => {
  switch (action.type) {
    case DESTINATION_UPDATE_REQUEST:
      return { loading: true };
    case DESTINATION_UPDATE_SUCCESS:
      return { loading: false, success: true, distination: action.payload };
    case DESTINATION_UPDATE_RESET:
      return { distination: {} };
    case DESTINATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
