import {
    DISCOUNT_UPDATE_SUCCESS,
    DISCOUNT_UPDATE_REQUEST,
    DISCOUNT_UPDATE_FAIL,
    DISCOUNT_LIST_SUCCESS,
    DISCOUNT_LIST_REQUEST,
    DISCOUNT_LIST_FAIL,
    DISCOUNT_DETAILS_SUCCESS,
    DISCOUNT_DETAILS_REQUEST,
    DISCOUNT_DETAILS_FAIL,
    DISCOUNT_DELETE_SUCCESS,
    DISCOUNT_DELETE_REQUEST,
    DISCOUNT_DELETE_FAIL,
    DISCOUNT_CREATE_SUCCESS,
    DISCOUNT_CREATE_REQUEST,
    DISCOUNT_CREATE_FAIL,
  } from "../constants/discountConstants";
  import axios from "axios";
  
  export const listDiscounts = () => async (dispatch) => {
    try {
      dispatch({ type: DISCOUNT_LIST_REQUEST });
  
      const { data } = await axios.get("/api/discount");
  
      dispatch({
        type: DISCOUNT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listDiscountDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: DISCOUNT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/discount/${id}`);
  
      dispatch({
        type: DISCOUNT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deleteDiscount = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISCOUNT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/discount/${id}`, config);
  
      dispatch({
        type: DISCOUNT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const createDiscount =
    (product, icon) => async (dispatch, getState) => {
      try {
        dispatch({
          type: DISCOUNT_CREATE_REQUEST,
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
          `/api/discount`,
          { product, icon},
          config
        );
  
        dispatch({
          type: DISCOUNT_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DISCOUNT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
  export const updateDiscount = (discount) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISCOUNT_UPDATE_REQUEST,
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
        `/api/discount/${discount._id}`,
        discount,
        config
      );
  
      dispatch({
        type: DISCOUNT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  