import {
    TOPCATEGORY_CREATE_FAIL,
    TOPCATEGORY_CREATE_REQUEST,
    TOPCATEGORY_CREATE_RESET,
    TOPCATEGORY_CREATE_SUCCESS,
    TOPCATEGORY_DELETE_FAIL,
    TOPCATEGORY_DELETE_REQUEST,
    TOPCATEGORY_DELETE_SUCCESS,
    TOPCATEGORY_DETAILS_FAIL,
    TOPCATEGORY_DETAILS_REQUEST,
    TOPCATEGORY_DETAILS_SUCCESS,
    TOPCATEGORY_LIST_FAIL,
    TOPCATEGORY_LIST_REQUEST,
    TOPCATEGORY_LIST_SUCCESS,
    TOPCATEGORY_UPDATE_FAIL,
    TOPCATEGORY_UPDATE_REQUEST,
    TOPCATEGORY_UPDATE_RESET,
    TOPCATEGORY_UPDATE_SUCCESS,
} from '../constants/categoryConstants'



export const categoryTopListReducer = (state = { topcategories: [{ category1: [],category2: [],category3: [],category4: [] }] }, action) => {
    switch (action.type) {
        case TOPCATEGORY_LIST_REQUEST:
            return { loading: true, topcategories: [] }
        case TOPCATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                topcategories: action.payload.topcategories,
            }
        case TOPCATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const categoryTopDetailsReducer = (state = { topcategory:{category1: [],category2: [],category3: [],category4: []} }, action) => {
    switch (action.type) {
        case TOPCATEGORY_DETAILS_REQUEST: 
            return { loading: true, ...state}
        case TOPCATEGORY_DETAILS_SUCCESS:
            return { loading: false, topcategory: action.payload }
        case TOPCATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryTopDeleteReducer = (state = {} , action) => {
    switch (action.type) {
        case TOPCATEGORY_DELETE_REQUEST:
            return { loading: true}
        case TOPCATEGORY_DELETE_SUCCESS:
            return { loading: false,  success: true}
        case TOPCATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryTopCreateReducer = (state = {} , action) => {
    switch (action.type) {
        case TOPCATEGORY_CREATE_REQUEST:
            return { loading: true}
        case TOPCATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, topcategory: action.payload }
        case TOPCATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case TOPCATEGORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const categoryTopUpdateReducer = (state = { topcategory: {} } , action) => {
    switch (action.type) {
        case TOPCATEGORY_UPDATE_REQUEST:
            return { loading: true}
        case TOPCATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, topcategory: action.payload}
        case TOPCATEGORY_UPDATE_RESET:
            return { product: {} }
        case TOPCATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
