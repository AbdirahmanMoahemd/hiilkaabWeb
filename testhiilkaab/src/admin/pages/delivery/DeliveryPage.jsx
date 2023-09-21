import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import {
  addNewDestination,
  createDistrict,
  deleteDestination,
  deleteDistrict,
  listDistricts,
  updateDestination,
  updateDistrict,
} from "../../../actions/districtsActions";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Header from "../../components/Header";
import {
  DESTINATION_UPDATE_RESET,
  DISTRICTS_CREATE_RESET,
  DISTRICTS_UPDATE_RESET,
} from "../../../constants/districtsConstants";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
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
        <Header
          category="Page"
          title="Districts"
          currentColor={currentColor}
          onClick={onClickFn}
        />
      </>

      <div className="flex justify-center w-full pb-5">
        {/* {errorDelete && <Message severity="error" text={errorDelete} />}
        {loading ? (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        ) : error ? (
          <Message severity="error" text={error} />
        ) : ( */}
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
                
                </tbody>
              </table>
            </div>
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default DeliveryPage;
