import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../../../actions/orderActions";
import { Header } from "../../components";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <div className="table-responsive " style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <td>Order No.</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Date</td>
              <td>PAYMENT METHOD</td>
              <td>TOTAL</td>
              <td>IsPaid</td>
              <td>IsDelivered</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            ) : error ? (
              <Message severity="error" text={error} />
            ) : (
              <>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id.substring(0, 15)}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.user && order.user.phone}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className='fa fa-times' style={{ color: 'red' }}></i>
                                                )}
                                                </td>
                                                <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <i className='fa fa-times' style={{ color: 'red' }}></i>
                                                )}
                                                </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Orders;
