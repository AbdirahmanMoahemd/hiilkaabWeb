import { useDispatch, useSelector } from "react-redux";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mylistOrders } from "../../actions/orderActions";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(mylistOrders());
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <>
      <Header />
      {/* <!-- account wrapper --> */}
      <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <HomeSidebar />
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>IMAGE</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERED</td>
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
                        <td>{order._id.substring(0, 10)}</td>
                        {order.products.length !== 0 && (
                          <td>
                            <img
                              src={order.products[0].images[0]}
                              className="w-20 h-20"
                            />
                          </td>
                        )}
                        {order.products.length === 0 && (
                          <td>
                            <img
                              src={order.meals[0].images[0]}
                              className="w-20 h-20"
                            />
                          </td>
                        )}
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${(order.totalPrice).toFixed(2)}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt
                          ) : (
                            <i
                              className="fa fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt
                          ) : (
                            <i
                              className="fa fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>Details</Link>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrdersScreen;
