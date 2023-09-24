import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { MdModeEdit } from "react-icons/md";
import {
  listDeliveryOrders,
  updateDeliveryOrders,
} from "../../../actions/deliveryActions";
import moment from "moment";
import Header2 from "../../components/Header2";
import { Checkbox } from "primereact/checkbox";
import { DELIVERY_UPDATE_RESET } from "../../../constants/deliveryConstants";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deliveryOrdersList = useSelector((state) => state.deliveryOrdersList);
  const { loading, error, deliveryOrders } = deliveryOrdersList;

  const deliveryOrdersUpdate = useSelector(
    (state) => state.deliveryOrdersUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = deliveryOrdersUpdate;

  const { currentColor } = useStateContext();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (success) {
      dispatch({ type: DELIVERY_UPDATE_RESET });
      setVisible(false);
      setComment("");
      setIsDelivered(false);
    }
    dispatch(listDeliveryOrders());
  }, [dispatch, userInfo, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this district")) {
      //   dispatch(deleteDistrict(id));
    }
  };

  const submitHandler = (e) => {
    dispatch(updateDeliveryOrders(id, isDelivered, comment));
    e.preventDefault();
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <>
        <Header2
          category="Page"
          title="Delivery Orders"
          currentColor={currentColor}
        />
      </>

      <div className="flex justify-center w-full pb-5">
        {/* {errorDelete && <Message severity="error" text={errorDelete} />} */}
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
            <div
              className="table-responsive table-wrp block max-h-screen overflow-x-scroll"
              style={{ overflowX: "auto" }}
            >
              <table className="table">
                <thead className="sticky -top-1 z-50 border-b bg-white">
                  <tr>
                    <td>S.Name</td>
                    <td>S.Phone</td>
                    <td>R.Name</td>
                    <td>R.Phone</td>
                    <td>Price</td>
                    <td>ItemType</td>
                    <td>Date</td>
                    <td>IsDelivered</td>
                    <td>Comment</td>
                  </tr>
                </thead>
                <tbody>
                  {deliveryOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.senderName}</td>
                      <td>{order.senderPhone}</td>
                      <td>{order.recipientName}</td>
                      <td>{order.recipientPhone}</td>
                      <td>${order.price}</td>
                      <td>{order.itemType}</td>
                      <td>
                        {order &&
                          moment(order.createdAt).toString().substring(0, 21)}
                      </td>
                      <td
                        
                      >
                        <p className={`${
                          order.isDelivered ? "text-green-500 " : "text-red-500"
                        }`}> {order.isDelivered ? "YES" : "NO"}</p>
                       
                      </td>
                      <td>{order.comment}</td>
                      <td>
                        <button
                          className="lg:text-xl"
                          onClick={() => {
                            setVisible(true);
                            setId(order.id);
                            setComment(order.comment);
                            setIsDelivered(order.isDelivered ? true : false);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <Dialog
        header="Update Order"
        visible={visible}
        onHide={() => {
          setVisible(false);
          setComment("");
          setIsDelivered(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={submitHandler}>
            {loadingUpdate && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {errorUpdate && <Message severity="error" text={errorUpdate} />}
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  IsDelivered <span className="text-primary">*</span>
                </label>
                <Checkbox
                  onChange={(e) => setIsDelivered(e.checked)}
                  checked={isDelivered}
                ></Checkbox>
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Comment <span className="text-primary">*</span>
                </label>
                <input
                  value={comment}
                  type="text"
                  className="input-box"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="comment"
                  required
                />
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default DeliveryPage;
