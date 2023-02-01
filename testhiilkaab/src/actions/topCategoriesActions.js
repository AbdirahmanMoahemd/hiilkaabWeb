import {
    TOPCATEGORY_UPDATE_SUCCESS,
    TOPCATEGORY_UPDATE_RESET,
    TOPCATEGORY_UPDATE_REQUEST,
    TOPCATEGORY_UPDATE_FAIL,
    TOPCATEGORY_LIST_SUCCESS,
    TOPCATEGORY_LIST_REQUEST,
    TOPCATEGORY_LIST_FAIL,
    TOPCATEGORY_DETAILS_SUCCESS,
    TOPCATEGORY_DETAILS_REQUEST,
    TOPCATEGORY_DETAILS_FAIL,
    TOPCATEGORY_DELETE_SUCCESS,
    TOPCATEGORY_DELETE_REQUEST,
    TOPCATEGORY_DELETE_FAIL,
    TOPCATEGORY_CREATE_SUCCESS,
    TOPCATEGORY_CREATE_RESET,
    TOPCATEGORY_CREATE_REQUEST,
    TOPCATEGORY_CREATE_FAIL,
  } from "../constants/categoryConstants";
  import axios from "axios";
  
  export const listTopCategories = () => async (dispatch) => {
    try {
      dispatch({ type: TOPCATEGORY_LIST_REQUEST });
  
      const { data } = await axios.get("/api/topCategories");
  
      dispatch({
        type: TOPCATEGORY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOPCATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listTopCategoryDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: TOPCATEGORY_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/topCategories/${id}`);
  
      dispatch({
        type: TOPCATEGORY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOPCATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deleteTopCategory = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOPCATEGORY_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/topCategories/${id}`, config);
  
      dispatch({
        type: TOPCATEGORY_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TOPCATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const createTopCategory =
    (category1, category2, category3, category4) => async (dispatch, getState) => {
      try {
        dispatch({
          type: TOPCATEGORY_CREATE_REQUEST,
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
          `/api/topCategories`,
          { category1, category2, category3, category4 },
          config
        );
  
        dispatch({
          type: TOPCATEGORY_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: TOPCATEGORY_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
  export const updateTopCategory = (topcategory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOPCATEGORY_UPDATE_REQUEST,
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
        `/api/topCategories/${topcategory._id}`,
        topcategory,
        config
      );
  
      dispatch({
        type: TOPCATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOPCATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  