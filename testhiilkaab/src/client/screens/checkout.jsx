import React, { useEffect, useRef, useState } from "react";
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
import { createOrder, createOrderByEvc } from "../../actions/orderActions";
import { Toast } from "primereact/toast";
import axios from "axios";
import { Message } from "primereact/message";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [index, setIndex] = useState();
  const [msg, setMsg] = useState();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const itemqty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();
  const toast = useRef(null);

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
  const { order, success, error: errorCreate } = orderCreate;

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
          setAddress(user.address);
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

 

  const evcpayment = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }));
    dispatch(savePaymentMethod(paymentMethod));

    const shippingAddress ={
      address, city, phoneNumber, country
    }

    if (phoneNumber.startsWith("252")) {
      setMsg(null);

      var data = JSON.stringify({
        schemaVersion: "1.0",
        requestId: 'no: '+phoneNumber,
        timestamp: Date.now(),
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
          merchantUid: "M0910455",
          apiUserId: "1001052",
          apiKey: "API-14003888AHX",
          paymentMethod: "mwallet_account",
          payerInfo: {
            accountNo: phoneNumber
          },
          transactionInfo: {
            referenceId: "REF8815718025",
            invoiceId: "INV8815718025",
            amount: itemsPri,
            currency: "USD",
            description: "test direct purchase",
          },
        },
      });
      var config = {
        method: "post",
        url: "https://api.waafipay.net/asm",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.responseCode === "5206") {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Not sent yet, please try again",
              life: 3000,
            });
          
          }
          if (response.data.responseCode === "2001") {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Paid successfully",
              life: 3000,
            });

            if (successOrderCreateEvc) {
              dispatch({ type: ORDER_DETAILS_RESET });
              dispatch({ type: ORDER_DETAILS_REQUEST });
              dispatch({ type: ORDER_DETAILS_SUCCESS });
            } else {
              dispatch(
                createOrderByEvc({
                  products: cart.cartItems,
                  shippingAddress: shippingAddress,
                  paymentMethod: paymentMethod,
                  shippingPrice: cart.shippingPrice,
                  totalPrice: itemsPri,
                })
              );
              dispatch(RemoveCartFun());
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setMsg("phoneNumber must be start 252XXXXXXX \n Lambarka waa in uu ka bilowdaa 252");
    }
  };
  return (
    <>
      <Toast ref={toast} />
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
          <form onSubmit={index ===1 ? evcpayment :index ===2 ? evcpayment :index ===3 ? evcpayment :  submitHandler}>
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
                    <span className="pl-2">{pay.value}</span>
                  </div>
                ))}
              </div>
              <br />
              <br />
              {errorOrderCreateEvc && (
                <Message severity="error" text={errorOrderCreateEvc} />
              )}
              {error && <Message severity="error" text={errorCreate} />}
              {msg != null && <Message severity="error" text={msg} />}
              <button
                type="submit"
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
