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

const DistrictsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [index, setIndex] = useState("");

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addDestination, setAddDestination] = useState(false);
  const [editDestination, setEditDestination] = useState(false);
  const [show, setShow] = useState(false);
  const [sourceName, setSourceName] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const districtsList = useSelector((state) => state.districtsList);
  const { loading, error, districts } = districtsList;

  const districtCreate = useSelector((state) => state.districtCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = districtCreate;


  const destinationCreate = useSelector((state) => state.destinationCreate);
  const {
    loading: loadingDestinationCreate,
    error: errorDestinationCreate,
    success: successDestinationCreate,
  } = destinationCreate;

  const districtUpdate = useSelector((state) => state.districtUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = districtUpdate;



  const destinationUpdate = useSelector((state) => state.destinationUpdate);
  const {
    loading: loadingDestination,
    error: errorDestination,
    success: successDestination,
  } = destinationUpdate;


  const districtDelete = useSelector((state) => state.districtDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = districtDelete;

  const destinationDelete = useSelector((state) => state.destinationDelete);
  const {
    loading: loadingDestinationDelete,
    error: errorDestinationDelete,
    success: successDestinationDelete,
  } = destinationDelete;

  const { currentColor } = useStateContext();
  const onClickFn = () => setVisible(true);

  const footerContent = (
    <div>
      <Button label="Add New" onClick={()=> setAddDestination(true)} />
    </div>
  );

  useEffect(() => {}, [destinations]);
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      setShow(false);
      dispatch({ type: DISTRICTS_CREATE_RESET });
      setSource("");
      setDestination("");
      setPrice("");
    }

    if (successUpdate) {
      setEdit(false);
      dispatch({ type: DISTRICTS_UPDATE_RESET });
      dispatch({ type: DESTINATION_UPDATE_RESET });
      setSource("");
      setDestination("");
      setPrice("");
      setEditDestination(false);
      setShow(false)
    }

    if (successDestination) {
      setEditDestination(false);
      setEdit(false);
      setShow(false)
      dispatch({ type: DESTINATION_UPDATE_RESET });
      setSource("");
      setDestination("");
      setPrice("");
      
    }

    if (successDestinationCreate) {
      setAddDestination(false)
      setEditDestination(false);
      setEdit(false);
      setShow(false)
      dispatch({ type: DESTINATION_UPDATE_RESET });
      setSource("");
      setDestination("");
      setPrice("");
      
    }
    if (successDestinationDelete) {
      setShow(false);
      
    }
    dispatch(listDistricts());
  }, [dispatch, userInfo, successDelete, successCreate, successUpdate, successDestination, successDestinationCreate, successDestinationDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this district")) {
      dispatch(deleteDistrict(id));
    }
  };

  const deleteDestinationHandler = (id, index) => {
    if (window.confirm("Are you sure to delete this destination")) {
      dispatch(deleteDestination(id, index));
     
    }
  };

  const submitHandler = (e) => {
    dispatch(createDistrict(source, destination, price));
    e.preventDefault();
  };

  const submitDestinationHandler = (e) => {
    dispatch(addNewDestination(id, destination, price))
    e.preventDefault();
  };

  const updateHandler = (e) => {
    dispatch(updateDistrict(id, source));
    e.preventDefault();
  };

  const updateDestinationHandler = (e) => {
    dispatch(updateDestination(id,index, destination, price));
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
        {errorDelete && <Message severity="error" text={errorDelete} />}
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
                    <td>Source</td>
                    <td>Distinations</td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {districts.map((dis) => (
                    <tr key={dis.id}>
                      <td>{dis.source}</td>
                      <td>
                        <Button
                          className="h-10"
                          label="Show"
                          icon="pi pi-external-link"
                          onClick={() => {
                            setDestinations(dis.destinations);
                            setSourceName(dis.source);
                            setId(dis.id)
                            setShow(true);
                          }}
                        />
                      </td>

                      <td>
                        <button
                          className="lg:text-xl"
                          onClick={() => {
                            setSource("");
                            setId(dis.id);
                            setSource(dis.source);
                            setEdit(true);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                      </td>
                      <td>
                        <button
                          className="lg:text-xl"
                          onClick={() => deleteHandler(dis.id)}
                        >
                          <MdDelete />
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
        header="New Districts"
        visible={visible}
        onHide={() => {
          setVisible(false);
          setSource("");
          setDestination("");
          setPrice("");
          setId("")
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={submitHandler}>
            {loadingCreate && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {errorCreate && <Message severity="error" text={errorCreate} />}
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  Source <span className="text-primary">*</span>
                </label>
                <input
                  value={source}
                  type="text"
                  className="input-box"
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="source"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  destination <span className="text-primary">*</span>
                </label>
                <input
                  value={destination}
                  id="icon"
                  type="text"
                  className="input-box"
                  placeholder="destination"
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">
                  Price <span className="text-primary">*</span>
                </label>
                <input
                  value={price}
                  id="price"
                  type="number"
                  className="input-box"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
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

      <Dialog
        header={`Destinations List For ${sourceName}`}
        visible={show}
        onHide={() => setShow(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerContent}
      >
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <td>Destination</td>
                <td>Price</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {destinations.map((des, indx) => (
                <tr key={des.name}>
                  <td>{des.name}</td>
                  <td>${des.price}</td>
                  <td>
                    <button className="lg:text-xl"
                    onClick={()=> {
                      setIndex(indx)
                      setDestination(des.name)
                      setPrice(des.price)
                      setEditDestination(true)
                      }}>
                      <MdModeEdit />
                    </button>
                  </td>
                  <td>
                    <button className="lg:text-xl"
                    onClick={()=>{
                      setIndex(indx)
                      
                      deleteDestinationHandler(id,indx)
                    }}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>

      <Dialog
        header={`Update District`}
        visible={edit}
        onHide={() => {
          setEdit(false);
          setSource("");
          setDestination("");
          setPrice("");
          setId("")
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={updateHandler}>
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
                  Source <span className="text-primary">*</span>
                </label>
                <input
                  value={source}
                  type="text"
                  className="input-box"
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="source"
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


      <Dialog
        header="Update Destination"
        visible={editDestination}
        onHide={() => {
          setEditDestination(false)
          setSource("");
          setDestination("");
          setPrice("");
          setId("")
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={updateDestinationHandler}>
            {loadingDestination && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {errorDestination && <Message severity="error" text={errorDestination} />}
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  destination <span className="text-primary">*</span>
                </label>
                <input
                  value={destination}
                  id="icon"
                  type="text"
                  className="input-box"
                  placeholder="destination"
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">
                  Price <span className="text-primary">*</span>
                </label>
                <input
                  value={price}
                  id="price"
                  type="number"
                  className="input-box"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
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


      <Dialog
        header="Add New Destination"
        visible={addDestination}
        onHide={() => {
          setAddDestination(false)
          setSource("");
          setDestination("");
          setPrice("");
          setId("")
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={submitDestinationHandler}>
            {loadingDestinationDelete && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {errorDestinationDelete && <Message severity="error" text={errorDestinationDelete} />}
            <div className="space-y-4">
              <div> 
                <label className="text-gray-600 mb-2 block">
                  destination <span className="text-primary">*</span>
                </label>
                <input
                  value={destination}
                  id="icon"
                  type="text"
                  className="input-box"
                  placeholder="destination"
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">
                  Price <span className="text-primary">*</span>
                </label>
                <input
                  value={price}
                  id="price"
                  type="number"
                  className="input-box"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
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

export default DistrictsPage;
