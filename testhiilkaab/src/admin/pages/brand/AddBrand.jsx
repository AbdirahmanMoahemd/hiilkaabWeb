import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBrands, listBrands } from "../../../actions/brandActions";
import { Header } from "../../components";

const AddBrand = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const brandCreate = useSelector((state) => state.brandCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = brandCreate;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBrands(name));
  };

  useEffect(() => {
    dispatch(listBrands());
    if (successCreate) {
      navigate("/admin/brands/");
    } 
  }, [dispatch, navigate, successCreate]);

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="SubCategory" />
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
              <label className="text-gray-600 mb-2 block">Brand Name</label>
              <input type="text" className="input-box" 
              onChange={(e) => setName(e.target.value)}
              placeholder="Brand Name"
              required/>
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
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default AddBrand;
