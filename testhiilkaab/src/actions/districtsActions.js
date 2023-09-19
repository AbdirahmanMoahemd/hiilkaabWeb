import {
  DESTINATION_CREATE_FAIL,
  DESTINATION_CREATE_REQUEST,
  DESTINATION_CREATE_SUCCESS,
  DESTINATION_DELETE_FAIL,
  DESTINATION_DELETE_REQUEST,
  DESTINATION_DELETE_SUCCESS,
  DESTINATION_UPDATE_FAIL,
  DESTINATION_UPDATE_REQUEST,
  DESTINATION_UPDATE_SUCCESS,
  DISTRICTS_CREATE_FAIL,
  DISTRICTS_CREATE_REQUEST,
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
  DISTRICTS_UPDATE_SUCCESS,
} from "../constants/districtsConstants";
import axios from "axios";

export const listDistricts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISTRICTS_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/districts", config);

    dispatch({
      type: DISTRICTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDistrictDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISTRICTS_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/districts/${id}`, config);

    dispatch({
      type: DISTRICTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const createDistrict =
  (source, name, price) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISTRICTS_CREATE_REQUEST,
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
        `/api/districts`,
        { source, name, price },
        config
      );

      dispatch({
        type: DISTRICTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISTRICTS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addNewDestination =
  (id, name, price) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DESTINATION_CREATE_REQUEST,
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
        `/api/districts/add-destination/${id}`,
        { name, price },
        config
      );

      dispatch({
        type: DESTINATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DESTINATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteDistrict = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISTRICTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/districts/${id}`, config);
  
      dispatch({
        type: DISTRICTS_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DISTRICTS_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDestination = (id, index) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DESTINATION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `/api/districts/delete-des/${id}`,
      { index },
      config
    );

    dispatch({
      type: DESTINATION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DESTINATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDistrict = (id,source) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISTRICTS_UPDATE_REQUEST,
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
      `/api/districts/${id}`,
      {source},
      config
    );

    dispatch({
      type: DISTRICTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISTRICTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const updateDestination = (id,index,destination, price) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DESTINATION_UPDATE_REQUEST,
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

    const { data } = await axios.post(
      `/api/districts/${id}`,
      {index,destination, price},
      config
    );

    dispatch({
      type: DESTINATION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DESTINATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
