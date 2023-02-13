import { Message } from "primereact/message";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { RemoveCartFun } from "../../actions/userActions";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
} from "../../constants/orderConstants";
import Header from "../components/Header";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const itemsPri = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

 

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  const placeOrderHandler = () => {
    if (success) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch({ type: ORDER_DETAILS_REQUEST });
      dispatch({ type: ORDER_DETAILS_SUCCESS });
    } else {
      dispatch(
        createOrder({
          products: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          shippingPrice: cart.shippingPrice,
          totalPrice: itemsPri,
        })
      );

      dispatch(RemoveCartFun());
    }
  };

  return (
    <>
      <Header />
      {/* <!-- checkout wrapper --> */}
      {/* <!-- breadcrum --> */}
      <div class="py-4 container flex gap-3 items-center">
        <Link to="/" class="text-primary text-base">
          <i class="fa fa-home"></i>
        </Link>
        <span class="text-sm text-gray-400">
          <i class="fa fa-chevron-right"></i>
        </span>
        <p class="text-gray-600 font-medium uppercase">Place Your Order</p>
      </div>
      {/* <!-- breadcrum end --> */}

      <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
        <div class="border lg:col-span-8 border-gray-200 px-4 py-4 rounded">
          <div>
            <h3 class="text-lg font-medium capitalize mb-4">Shipping</h3>
            <p>
              Address: {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city} ,{cart.shippingAddress.phoneNumber},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>
          <div className="py-6">
            <h3 class="text-lg font-medium capitalize mb-4">Payment Method</h3>
            <p>{paymentMethod}</p>
          </div>
          <div className="py-6">
            <h3 class="text-lg font-medium capitalize mb-4">Order Items</h3>
            <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex lg:grid grid-cols-12 gap-6 items-start">
              <p className="text-gray-600  lg:col-span-8">Product</p>
              <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24 lg:col-span-2">
                Quantity
              </p>
              <p className="text-gray-600 text-center lg:col-span-2">Total</p>
            </div>
            {cartItems.map((item) => (
              <div className="space-y-4">
                {/* <!-- single cart --> */}
                <div className="grid grid-cols-12 gap-6 items-start md:gap-6 py-2 rounded">
                  {/* <!-- cart image --> */}
                  <div className="flex-shrink-0 col-span-8">
                    <div className="flex gap-1">
                      <div className="w-32">
                        <img
                          src={item.images && item.images[0]}
                          className="h-24  border"
                        />
                      </div>

                      <div className="">
                        <h2 className="text-gray-800 mb-3 xl:text-xl textl-lg font-medium uppercase">
                          {item.name}
                        </h2>
                        <p className="text-primary font-semibold">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- cart image end --> */}
                  {/* <!-- cart quantity --> */}
                  <h2 className="col-span-2  text-gray-800 mb-3 xl:text-xl textl-lg font-medium uppercase">
                    {item.quantity}
                  </h2>
                  {/* <!-- cart quantity end --> */}
                  <div className="lg:col-span-2 col-span-8 flex gap-2">
                    <p className="lg:hidden text-lg">Total Price</p>
                    <p className="text-primary text-lg font-semibold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
                {/* <!-- single cart end --> */}
              </div>
            ))}
          </div>
        </div>
        {/* <!-- order summary --> */}
        <div class="lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
          <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">
            ORDER SUMMARY
          </h4>
          <div class="space-y-2"></div>
          <div class="flex justify-between border-b border-gray-200 mt-1">
            <h4 class="text-gray-800 font-medium my-3 uppercase">Subtotal</h4>
            <h4 class="text-gray-800 font-medium my-3 uppercase">
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </h4>
          </div>
          <div class="flex justify-between border-b border-gray-200">
            <h4 class="text-gray-800 font-medium my-3 uppercase">Shipping</h4>
            <h4 class="text-gray-800 font-medium my-3 uppercase">Free</h4>
          </div>
          <div class="flex justify-between">
            <h4 class="text-gray-800 font-semibold my-3 uppercase">Total</h4>
            <h4 class="text-gray-800 font-semibold my-3 uppercase">
              ${itemsPri}
            </h4>
          </div>
          {error && <Message severity="error" text={error} />}
          {/* <!-- checkout --> */}
          <button
            onClick={placeOrderHandler}
            className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
             hover:text-primary transition text-sm w-full block text-center"
          >
            Place Order
          </button>
          {/* <!-- checkout end --> */}
        </div>
        {/* <!-- order summary end --></> */}
      </div>
    </>
  );
};

export default PlaceOrderScreen;
