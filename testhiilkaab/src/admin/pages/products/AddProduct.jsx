import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components";
import { SketchPicker } from "react-color";
import { ProgressSpinner } from "primereact/progressspinner";
import { AiFillDelete } from "react-icons/ai";
import { listCategories } from "../../../actions/categoryActions";
import { listSubCategories } from "../../../actions/subCategoryActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../actions/prodcutActions";
import { Message } from "primereact/message";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [isFeatured, setisFeatured] = useState(true);
  const [isDiscounted, setisDiscounted] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [Colors, setColors] = useState([]);
  const [temSizes, setTemSizes] = useState("");
  const [Sizes, setSizes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const {
    loading: loadingSubcategories,
    error: errorSubcategories,
    subcategories,
  } = subcategoryList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listSubCategories());
    if (successCreate) {
      navigate("/adminproducts");
    }
  }, [dispatch, navigate, successCreate]);

  const submitHandler = (e) => {
    dispatch(
      createProduct(
        name,
        category,
        subcategory,
        brand,
        description,
        price,
        countInStock,
        isFeatured,
        isDiscounted,
        newPrice,
        images,
        Colors,
        Sizes
      )
    );

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
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  

  const handleClick = (e) => {
    setColors((current) => [...current, sketchPickerColor]);
    e.preventDefault();
  };
  const sizehandleClick = (e) => {
    setSizes((current) => [...current, temSizes]);
    setTemSizes("");
    e.preventDefault();
  };
  const isFeaturedToggle = () => {
    setisFeatured(!isFeatured);
  };
  const isDiscountedToggle = () => {
    setisDiscounted(!isDiscounted);
  };
  const addimagehandler = (e) => {
    setImages((current) => [...current, image]);
    setImage("");
    e.preventDefault();
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="Products" />
      <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
        <form onSubmit={submitHandler}>
          {loadingCategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCategories && (
            <Message severity="error" text={errorCategories} />
          )}
          {loadingSubcategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSubcategories && (
            <Message severity="error" text={errorSubcategories} />
          )}
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
          <div class="space-y-4">
          <div>
              <label class="text-gray-600 mb-2 block">
                Select image <span class="text-primary">*</span>
              </label>
              <input
                value={image}
                id="icon"
                type="text"
                className="input-box"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Select image"
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

            <div>
              <button onClick={addimagehandler}>Add Image</button>
            </div>
            <div className="w-20 flex pl-2">
              {images.map((img, index) => (
                <>
                  <img src={img} />
                  <button>
                    <AiFillDelete
                      className="text-primary"
                      onClick={() => {
                        setImages(images.splice(index, 1));
                      }}
                    />
                  </button>
                </>
              ))}
              {images.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setImages([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>



            <div>
              <label class="text-gray-600 mb-2 block">
                Product Name <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Category <span class="text-primary">*</span>
              </label>
              <br />
              <select
                name="category"
                value={category}
                required
                type="text"
                class="input-box"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category here</option>
                {categories.map((cat) => (
                  <>
                    <option value={cat.id}>{cat.name}</option>
                  </>
                ))}
              </select>
            </div>

            <div>
              <label class="text-gray-600 mb-2 block">
                Sub Category <span class="text-primary">*</span>
              </label>
              <br />
              <select
                name="subcategory"
                value={subcategory}
                required
                type="text"
                class="input-box"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>Select Sub Category here</option>
                {subcategories.map((subcat) => (
                  <>
                    <option value={subcat.id}>{subcat.name}</option>
                  </>
                ))}
              </select>
            </div>

            <div>
              <label class="text-gray-600 mb-2 block">
                Description <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Brand <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand"
                required
              />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Price <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                isDiscounted <span class="text-primary">*</span>
              </label>

              <input
                type="checkbox"
                value={isDiscounted}
                checked={isDiscounted}
                onChange={isDiscountedToggle}
                placeholder="isDiscounted"
              />
              <span className="pl-2">isDiscounted</span>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                OldPrice <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="OldPrice"
                required
              />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                CountInStock <span class="text-primary">*</span>
              </label>
              <input
                type="text"
                class="input-box"
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="CountInStock"
                required
              />
            </div>

            <div>
              <label class="text-gray-600 mb-2 block">Colors</label>
              <SketchPicker
                onChange={(color) => {
                  setSketchPickerColor(color.hex);
                }}
                color={sketchPickerColor}
              />
            </div>
            <div>
              <button onClick={handleClick}>Add Colors</button>
            </div>
            <div>
              {Colors.map((col) => (
                <span>
                  <span
                    className="pl-2 pr-2 w-4 mt-10"
                    style={{ background: `${col}` }}
                  >
                    {" "}
                  </span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {Colors.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setColors([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">Sizes</label>
              <input
                value={temSizes}
                type="text"
                class="input-box"
                onChange={(e) => setTemSizes(e.target.value)}
                placeholder="Sizes"
              />
            </div>
            <div>
              <button onClick={sizehandleClick}>Add Sizes</button>
            </div>
            <div>
              {Sizes.map((col) => (
                <span>
                  <span className="pl-2 pr-2 w-4 mt-10">{col}</span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {Sizes.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setSizes([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>

            

            
            <div>
              <input
                value={isFeatured}
                type="checkbox"
                checked={isFeatured}
                onChange={isFeaturedToggle}
              />
              <span className="pl-2"> isFeatured</span>
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

export default AddProduct;
