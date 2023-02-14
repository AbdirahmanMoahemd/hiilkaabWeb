import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../actions/cartActions";
import Footer from "../components/footer";
import Header from "../components/Header";
import { getUserDetails, RemoveCartFun } from "../../actions/userActions";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
} from "../../constants/orderConstants";
import { createOrderByEvc } from "../../actions/orderActions";
import { Message } from "primereact/message";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [index, setIndex] = useState();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const itemqty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  const orderCreateEvc = useSelector((state) => state.orderCreateEvc);
  const {
    order: ordersCreateEvc,
    success: successOrderCreateEvc,
    error: errorOrderCreateEvc,
  } = orderCreateEvc;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error:errorCreate } = orderCreate;

  const itemsPri = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const paymentList = [
    { value: "EVC-PLUS", indx: 1 },
    { value: "ZAAD SERVICES", indx: 2 },
    { value: "SAHAL", indx: 3 },
    { value: "CASH ON DEVLIVERY", indx: 4 },
  ];
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        if (!shippingAddress.address) {
          setAddress(user.street, user.apartment);
          setPhoneNumber(user.phone);
          setCity(user.city);
          setCountry(user.country);
        }
      }
    }
  }, [dispatch, navigate, userInfo, user]);



  useEffect(() => {
    if (successOrderCreateEvc) {
      navigate(`/order/${ordersCreateEvc._id}`);
    }
  }, [navigate, successOrderCreateEvc, orderCreateEvc]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }));
    dispatch(savePaymentMethod(paymentMethod));
    if (successOrderCreateEvc) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch({ type: ORDER_DETAILS_REQUEST });
      dispatch({ type: ORDER_DETAILS_SUCCESS });
    } else {
      dispatch(
        createOrderByEvc({
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


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }));
    dispatch(savePaymentMethod(paymentMethod));
    if (successOrderCreateEvc) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch({ type: ORDER_DETAILS_REQUEST });
      dispatch({ type: ORDER_DETAILS_SUCCESS });
    } else {
      dispatch(
        createOrderByEvc({
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
      <div className="py-4 container flex gap-3 items-center">
        <Link to="/" className="text-primary text-base">
          <i className="fa fa-home"></i>
        </Link>
        <span className="text-sm text-gray-400">
          <i className="fa fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium uppercase">checkout</p>
      </div>
      {/* <!-- breadcrum end --> */}
      <div className="container  pb-16 pt-4">
        {/* <!-- checkout form --> */}
        <div className="border border-gray-200 px-4 py-4 rounded">
          <form
            onSubmit={index === 1 || 2 || 3 ? placeOrderHandler : submitHandler}
          >
            <h3 className="text-lg font-medium capitalize mb-4">
              Shipping Address
            </h3>

            <div className="space-y-4">
              <div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={address}
                    placeholder="Address"
                    name="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Phone Number<span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  className="input-box"
                  value={phoneNumber}
                  placeholder="Enter Country code + Phone Number"
                  name="phoneNumber"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  City<span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={city}
                  placeholder="City"
                  name="city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">
                  County/Region <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={country}
                  placeholder="Country"
                  name="country"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium capitalize mb-4">
                Choose Your Payment Method
              </h3>
              <div>
                {paymentList.map((pay) => (
                  <div>
                    <input
                      value={pay.value}
                      type="radio"
                      name="payment"
                      required
                      id="defaultUnchecked"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        setIndex(pay.indx);
                      }}
                    />
                    <span className="pl-2">{pay.value}qsdaf</span>
                  </div>
                ))}
              </div>
              <br />
              <br />
              {error && <Message severity="error" text={errorOrderCreateEvc} />}
              {error && <Message severity="error" text={errorCreate} />}
              <button
             
                className="bg-primary border border-primary text-primary px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
             hover:text-primary transition text-sm w-full block text-center"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        {/* <!-- checkout form end --> */}
      </div>
      {/* <!-- checkout wrapper end --> */}

      <Footer />
    </>
  );
};

export default Checkout;
