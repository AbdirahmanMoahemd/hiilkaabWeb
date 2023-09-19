import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
  footerCategoryListReducer,
} from "./reducers/categoryReducers";
import {
  categoryTopCreateReducer,
  categoryTopDeleteReducer,
  categoryTopDetailsReducer,
  categoryTopListReducer,
  categoryTopUpdateReducer,
} from "./reducers/topCategoriesReducers";
import {
  footerSubcategoryListReducer,
  subcategoryCreateReducer,
  subcategoryDeleteReducer,
  subcategoryDetailsReducer,
  subcategoryListReducer,
  subcategoryUpdateReducer,
} from "./reducers/subCategoryReducers";

import {
  brandCreateReducer,
  brandDeleteReducer,
  brandDetailsReducer,
  brandListReducer,
  brandUpdateReducer,
} from "./reducers/brandReducers";


import {
  producDiscounttListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productListReducer2,
  productListReducer3,
  productListReducer4,
  productReviewReducer,
  productUpdateReducer,
  productListReducer1,
  productListReducerCount,
  productTopReducer,
  sameProductListReducer,
} from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userReducerCount,
  userRegisterReducer,
  userUpdateReducer,
  userUpdReducer,
  userUpdatePasswordReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { wishlistReducer } from "./reducers/wishlistReducers";
import {
  slideListReducer,
  slideCreateReducer,
  slideUpdateReducer,
  sildeDetailsReducer,
} from "./reducers/slideReducers";
import {
  settingsListReducer,
  settingsDetailsReducer,
  settingsCreateReducer,
  settingsUpdateReducer,
} from "./reducers/settingsReducers";

import {
  discountCreateReducer,
  discountDeleteReducer,
  discountDetailsReducer,
  discountListReducer,
  discountUpdateReducer,
} from "./reducers/discountReducers";
import {
  orderCreateReducer,
  orderCreateReducerEvc,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer,
  orderPayReducer2,
  orderReducerCount,
  recentOrderListReducer,
} from "./reducers/orderReducers";
import { destinationCreateReducer, destinationDeleteReducer, destinationUpdateReducer, districtCreateReducer, districtDeleteReducer, districtUpdateReducer, districtsListReducer } from "./reducers/districtsReducer";

const reducer = combineReducers({
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,

  categoryTopList: categoryTopListReducer,
  categoryTopDetails: categoryTopDetailsReducer,
  categoryTopCreate: categoryTopCreateReducer,
  categoryTopDelete: categoryTopDeleteReducer,
  categoryTopUpdate: categoryTopUpdateReducer,
  footerCategoryList:footerCategoryListReducer,

  subcategoryList: subcategoryListReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  subcategoryCreate: subcategoryCreateReducer,
  subcategoryDelete: subcategoryDeleteReducer,
  subcategoryUpdate: subcategoryUpdateReducer,
  footerSubcategoryList:footerSubcategoryListReducer,


  brandList: brandListReducer,
  brandDetails: brandDetailsReducer,
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  brandUpdate: brandUpdateReducer,

  productList: productListReducer,
  sameProductList:sameProductListReducer,
  productList1: productListReducer1,
  productList2: productListReducer2,
  productList3: productListReducer3,
  productList4: productListReducer4,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  producDistList: producDiscounttListReducer,
  productCount: productListReducerCount,
  productTop: productTopReducer,

  discountCreate: discountCreateReducer,
  discountDelete: discountDeleteReducer,
  discountDetails: discountDetailsReducer,
  discountList: discountListReducer,
  discountUpdate: discountUpdateReducer,

  cart: cartReducer,
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpd: userUpdReducer,
  userCount: userReducerCount,
  userUpdatePassword: userUpdatePasswordReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderPay2: orderPayReducer2,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  orderCount: orderReducerCount,
  orderCreateEvc: orderCreateReducerEvc,
  recentOrderList: recentOrderListReducer,

  slideList: slideListReducer,
  // slideDelete: slideDeleteReducer,
  sildeDetails: sildeDetailsReducer,
  slideUpdate: slideUpdateReducer,
  slideCreate: slideCreateReducer,
  // packagesList: packagesListReducer,
  // packagesDelete: packagesDeleteReducer,
  // packagesDetails: packagesDetailsReducer,
  // packagesUpdate: packagesUpdateReducer,
  // packagesCreate: packagesCreateReducer,
  settingsList: settingsListReducer,
  settingsDetails: settingsDetailsReducer,
  settingsUpdate: settingsUpdateReducer,
  settingsCreat: settingsCreateReducer,


  districtsList:districtsListReducer,
  districtDelete:districtDeleteReducer,
  districtCreate:districtCreateReducer,
  destinationDelete:destinationDeleteReducer,
  districtUpdate:districtUpdateReducer,
  destinationUpdate:destinationUpdateReducer,
  destinationCreate:destinationCreateReducer
});

const cartItemsFormStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const wishlistItemsFormStorage = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];
const userInfoFormStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : "";
const themeModeFromStorage = localStorage.getItem("themeMode");
const shippinAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFormStorage,
    shippingAddress: shippinAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  wishlist: {
    wishlistItems: wishlistItemsFormStorage,
  },
  userLogin: { userInfo: userInfoFormStorage },
  themeModeFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
