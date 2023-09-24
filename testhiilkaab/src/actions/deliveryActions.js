import {
  DELIVERY_CREATE_FAIL,
  DELIVERY_CREATE_REQUEST,
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
  DELIVERY_UPDATE_SUCCESS,
} from "../constants/deliveryConstants";
import axios from "axios";
export const listDeliveryOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DELIVERY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/deliveryOrders", config);

    dispatch({
      type: DELIVERY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDeliveryOrdersDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELIVERY_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/deliveryOrders/${id}`, config);

    dispatch({
      type: DELIVERY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDeliveryOrders =
  (source, name, price) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELIVERY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/deliveryOrders`,
        { source, name, price },
        config
      );

      dispatch({
        type: DELIVERY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELIVERY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateDeliveryOrders =
  (id, status, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELIVERY_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/deliveryOrders/update/${id}`,
        { status, comment },
        config
      );

      dispatch({
        type: DELIVERY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELIVERY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDeliveryOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVERY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/deliveryOrders/${id}`, config);

    dispatch({
      type: DELIVERY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
