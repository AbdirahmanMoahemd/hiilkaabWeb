import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCategory } from "../../../actions/categoryActions";
import { Header } from "../../components";
import { Message } from "primereact/message";
import { listProducts } from "../../../actions/prodcutActions";
import { createDiscount } from "../../../actions/discountActions";

const AddDiscount = () => {
  const [keyword, setKeyword] = useState("");
  const [product, setProduct] = useState("");
  const [icon, setIcon] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

 

  const discountCreate = useSelector((state) => state.discountCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = discountCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDiscount(product.id, icon))
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/discount");
    }
  }, [dispatch, navigate, successCreate]);

  const getProducts = () => {
    dispatch(listProducts(keyword));
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

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="Discount" />
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
            {product &&
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
                  }
            <div>
              <label className="text-gray-600 mb-2 block">Category Name</label>
              <div className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  className="input-box col-span-9"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="product Name"
                  required
                />
                <a
                  onClick={getProducts}
                  className="col-span-3 pt-2 text-center text-primary  border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Search
                </a>
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
                  <button onClick={()=> setProduct(product)}>
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
                    </button>
                 
                ))}
                 </div>
              
            )}

            <div className="mt-4 flex justify-center">
              <button
                
                className="py-2 px-10 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
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

export default AddDiscount;
