import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { listDeliveryOrders } from "../../../actions/deliveryActions";
import moment from "moment";
import Header2 from "../../components/Header2";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deliveryOrdersList = useSelector((state) => state.deliveryOrdersList);
  const { loading, error, deliveryOrders } = deliveryOrdersList;

  
  const { currentColor } = useStateContext();
  const onClickFn = () => {};

//   const footerContent = (
//     <div>
//       <Button label="Add New" onClick={()=> setAddDestination(true)} />
//     </div>
//   );

 
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
    dispatch(listDeliveryOrders())
  }, [dispatch, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this district")) {
    //   dispatch(deleteDistrict(id));
    }
  };

 
  const submitHandler = (e) => {
    // dispatch(createDistrict(source, destination, price));
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
                    <td>SenderName</td>
                    <td>SenderPhone</td>
                    <td>RecipientName</td>
                    <td>RecipientPhone</td>
                    <td>Price</td>
                    <td>ItemType</td>
                    <td>Date</td>
                    <td>IsDelivered</td>
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
                        <td>{order && moment(order.createdAt).toString().substring(0, 21)}</td>
                        <td>{order.isDelivered ? "YES" : "NO"}</td>
                     </tr>
                ))}
                </tbody>
              </table>
            </div>
          
          </>
         )} 
      </div>
    </div>
  );
};

export default DeliveryPage;
