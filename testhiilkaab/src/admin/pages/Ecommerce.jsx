import React, { useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { FaProductHunt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { listOrdersCount, recentOrders } from "../../actions/orderActions";
import { listProductsCount } from "../../actions/prodcutActions";

const Ecommerce = () => {
  const { currentColor } = useStateContext();
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCount = useSelector((state) => state.productCount);
  const { counter: counterProduct } = productCount;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recentOrderList = useSelector((state) => state.recentOrderList);
  const { loading, error, orders } = recentOrderList;

  const orderCount = useSelector((state) => state.orderCount);
  const { counter: ordercount } = orderCount;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProductsCount());
      dispatch(listOrdersCount());
      dispatch(recentOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);


  const submitHanller = (e) => {
    e.preventDefault();

    dispatch(getOrdersByPhone(phone));
  };

  return (
    <div className="mt-14">
      <div className="flex flex-wrap lg:flex-nowrap justify-between m-10">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Products</p>
              <p className="text-2xl">{counterProduct.counter}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BiCategoryAlt />
            </button>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Orders</p>
              <p className="text-2xl">{ordercount.counter2}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <FaProductHunt />
            </button>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">${ordercount.real2}</p>
              <p className="text-base">${ordercount.real}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
      </div>
      <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="" title="Recent Orders" />
        <div className="flex justify-center w-full pb-5">
        <form className="w-full xl:max-w-xl max-w-lg flex relative" onSubmit={submitHanller}>
          <input
            type="text"
            className="pl-12 w-full border border-r-0 border-primary py-3 px-3 rounded-l-md focus:ring-primary focus:border-primary"
            placeholder="search"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
          type="submit"
            className="bg-primary border border-primary text-primary px-8 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition"
          >
            Search
          </button>
        </form>
      </div>
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
                          <i
                            className="fa fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
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
  );
};

export default Ecommerce;
