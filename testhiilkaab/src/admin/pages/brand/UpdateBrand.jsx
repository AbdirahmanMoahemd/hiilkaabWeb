import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listBrandsDetails, updateBrands } from "../../../actions/brandActions";
import { BRAND_UPDATE_RESET } from "../../../constants/brandConstants";
import { Header } from "../../components";

const UpdateBrand = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const brandDetails = useSelector((state) => state.brandDetails);
  const { loading, error, brand } = brandDetails;

  const brandUpdate = useSelector((state) => state.brandUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = brandUpdate;


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BRAND_UPDATE_RESET });
      navigate("/admin/brands");
    } else {
      if (!brand.name || brand.id !== id) {
        dispatch(listBrandsDetails(id));
      } else {
        setName(brand.name);
      }
    }
  }, [dispatch, navigate, successUpdate, id, brand]);

  const submitHandler = (e) => {
    dispatch(
      updateBrands({
        _id: id,
        name,
        
      })
    );
    e.preventDefault();
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="SubCategory" />
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
          <div className="space-y-4">
            
            <div>
              <label className="text-gray-600 mb-2 block">Brand Name</label>
              <input
                value={name}
                type="text"
                className="input-box"
                onChange={(e) => setName(e.target.value)}
                placeholder="Brand Name"
                required
              />
            </div>
            <div className="mt-4 flex justify-center">
            <button
                  type="submit"
                  className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                Update
              </button>
            </div>
          </div>
          )}
        </form>
      </div>
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default UpdateBrand;
