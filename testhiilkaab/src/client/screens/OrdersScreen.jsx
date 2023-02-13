import axios from "axios";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder2,
} from "../../actions/orderActions";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET2,
} from "../../constants/orderConstants";
import Header from "../components/Header";
import { Toast } from "primereact/toast";

const OrdersScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useRef(null);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderPay2 = useSelector((state) => state.orderPay2);
  const { loading: loadingPay2, success: successPay2 } = orderPay2;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay2 || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET2 });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, successDeliver, order, userInfo, successPay2]);

  const successPaymentHandler = () => {
    dispatch(payOrder2(id));
  };

  const evcpayment = () => {
    var data = JSON.stringify({
      schemaVersion: "1.0",
      requestId: id,
      timestamp: Date.now(),
      channelName: "WEB",
      serviceName: "API_PURCHASE",
      serviceParams: {
        merchantUid: "M0910455",
        apiUserId: "1001052",
        apiKey: "API-14003888AHX",
        paymentMethod: "mwallet_account",
        payerInfo: {
          accountNo: phoneNumber,
        },
        transactionInfo: {
          referenceId: "REF8815718025",
          invoiceId: "INV8815718025",
          amount: order.totalPrice,
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
        if (response.data.responseCode == 5206) {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: "Not sent yet, please try again",
            life: 3000,
          });
        }
        if (response.data.responseCode == 2001) {
          dispatch(payOrder2(id));
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Paid successfully",
            life: 3000,
          });
        }
        console.log(JSON.stringify(response.data.responseCode));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <div class="py-4 container flex gap-3 items-center">
        <Link to="/" class="text-primary text-base">
          <i class="fa fa-home"></i>
        </Link>
        <span class="text-sm text-gray-400">
          <i class="fa fa-chevron-right"></i>
        </span>
        <p class="text-gray-600 font-medium uppercase">Your Order</p>
      </div>
      {loading ? (
        <ProgressSpinner
          style={{ width: "20px", height: "20px" }}
          strokeWidth="6"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      ) : error ? (
        <Message severity="error" className="w-full">
          {error}
        </Message>
      ) : (
        <>
          <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
            <div class="border lg:col-span-8 border-gray-200 px-4 py-4 rounded">
              <div>
                <h3 class="text-lg font-medium capitalize mb-4">Shipping</h3>
                <p>Name: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <p>
                  Address: {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city} ,
                  {order.shippingAddress.phoneNumber},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="py-6">
                <h3 class="text-lg font-medium capitalize mb-4">
                  Payment Method
                </h3>
                <p>{order.paymentMethod}</p>
              </div>
              <div className="py-6">
                <h3 class="text-lg font-medium capitalize mb-4">
                  Order Status:
                </h3>
                <p>
                  {order.isPaid ? (
                    <Message
                      severity="success"
                      text={` Paid on ${order.paidAt.substring(0, 10)}`}
                    />
                  ) : (
                    <Message severity="error" text="Not Paid"></Message>
                  )}
                </p>
                <br />
                <p>
                  {order.isDelivered ? (
                    <Message
                      severity="success"
                      text={` Paid on ${order.deliveredAt.substring(0, 10)}`}
                    />
                  ) : (
                    <Message severity="error" text="Not Delivered"></Message>
                  )}
                </p>
              </div>
              <div className="py-6">
                <h3 class="text-lg font-medium capitalize mb-4">Order Items</h3>
                <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex lg:grid grid-cols-12 gap-6 items-start">
                  <p className="text-gray-600  lg:col-span-8">Product</p>
                  <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24 lg:col-span-2">
                    Quantity
                  </p>
                  <p className="text-gray-600 text-center lg:col-span-2">
                    Total
                  </p>
                </div>
                {order.products.map((item) => (
                  <div className="space-y-4">
                    {/* <!-- single cart --> */}
                    <div className="grid grid-cols-12 gap-6 items-start md:gap-6 py-2 rounded">
                      {/* <!-- cart image --> */}
                      <div className="flex-shrink-0 col-span-8">
                        <div className="flex gap-1">
                          <div className="w-32">
                            <img
                              src={
                                item.product.images && item.product.images[0]
                              }
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

              <div class="flex justify-between">
                <h4 class="text-gray-800 font-semibold my-3 uppercase">
                  Total
                </h4>
                <h4 class="text-gray-800 font-semibold my-3 uppercase">
                  ${order.totalPrice}
                </h4>
              </div>

              {/* <!-- Update Order to Paid --> */}
              {loadingDeliver && (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <button
                  onClick={successPaymentHandler}
                  className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
                   hover:text-primary transition text-sm w-full block text-center"
                >
                  Update Order to Paid
                </button>
              )}

              {/* <!-- Update Order to Delivered --> */}
              {loadingDeliver && (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    onClick={deliverHandler}
                    className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
                   hover:text-primary transition text-sm w-full block text-center"
                  >
                    Update Order to Delivered
                  </button>
                )}

              {userInfo && !userInfo.isAdmin && (
                <Link
                  to="/success"
                  className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
             hover:text-primary transition text-sm w-full block text-center"
                >
                  Complete
                </Link>
              )}

              {/* <!-- checkout end --> */}
            </div>
            {/* <!-- order summary end --></> */}
          </div>
        </>
      )}
    </>
  );
};

export default OrdersScreen;
