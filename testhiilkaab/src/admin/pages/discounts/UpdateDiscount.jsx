import { Message } from "primereact/message";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_UPDATE_RESET } from "../../../constants/categoryConstants";
import { Header } from "../../components";
import { listProducts } from "../../../actions/prodcutActions";
import {
  listDiscountDetails,
  updateDiscount,
} from "../../../actions/discountActions";
import { DISCOUNT_UPDATE_RESET } from "../../../constants/discountConstants";

const UpdateDiscount = () => {
  const { id } = useParams();
  const [keyword, setKeyword] = useState("");
  const [product, setProduct] = useState("");
  const [icon, setIcon] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discountUpdate = useSelector((state) => state.discountUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = discountUpdate;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const discountDetails = useSelector((state) => state.discountDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    discount: discountDetail,
  } = discountDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DISCOUNT_UPDATE_RESET });
      navigate("/discount");
    } else {
      if (discountDetail.id !== id) {
        dispatch(listDiscountDetails(id));
      } else {
        setProduct(discountDetail.product);
        setIcon(discountDetail.icon);
      }
    }
   
  }, [dispatch, navigate, successUpdate, id, discountDetail]);

  const getProducts = () => {
    if (keyword !== '') {
      dispatch(listProducts(keyword));
    }
    
  };

  const submitHandler = (e) => {
    dispatch(updateDiscount(id, product, icon));
    e.preventDefault();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setIcon(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  console.log(product);

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="Discount" />
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
          {loadingDetails && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorDetails && <Message severity="error" text={errorDetails} />}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-2 block">
                Select image <span className="text-primary">*</span>
              </label>
              <input
                value={icon}
                id="icon"
                type="text"
                className="input-box"
                placeholder="Discount image"
                onChange={(e) => setIcon(e.target.value)}
                required
              />
              <br />

              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={uploadFileHandler}
              />
              {uploading && (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="4"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}
            </div>
            <div className="w-20 flex pl-2">
              <img src={icon} />
            </div>
            {product && (
              <div className="w-36 mb-2 bg-gray-100 p-2">
                <div className="relative group rounded-sm overflow-hidden">
                  <img
                    src={product.images && product.images[0]}
                    className="w-full h-24"
                  />
                  <a
                    to="#"
                    className="absolute text-ellipsis text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {product.name}
                  </a>
                </div>
              </div>
            )}
            <div>
              <label className="text-gray-600 mb-2 block">Product Name</label>
              <div className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  className="input-box col-span-9"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    getProducts();
                  }}
                  placeholder="product Name"
                />
              </div>
            </div>

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
              <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-2 gap-2">
                {products.map((product) => (
                  <a onClick={() => setProduct(product)}>
                    <div className="w-36 mb-2 bg-gray-100 p-2">
                      <div className="relative group rounded-sm overflow-hidden">
                        <img
                          src={product.images && product.images[0]}
                          className="w-full h-24"
                        />
                        <a
                          to="#"
                          className="absolute text-ellipsis text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                        >
                          {product.name}
                        </a>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default UpdateDiscount;
