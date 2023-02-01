import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listCategories } from "../../../actions/categoryActions";
import {
  listSubCategoryDetails,
  updateSubCategory,
} from "../../../actions/subCategoryActions";
import { SUBCATEGORY_UPDATE_RESET } from "../../../constants/subCategoryConstants";
import { Header } from "../../components";

const UpdateSubCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subcategoryDetails = useSelector((state) => state.subcategoryDetails);
  const { loading, error, subcategory } = subcategoryDetails;

  const subcategoryUpdate = useSelector((state) => state.subcategoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = subcategoryUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUBCATEGORY_UPDATE_RESET });
      navigate("/admin/subCategory");
    } else {
      if (!subcategory.name || subcategory.id !== id) {
        dispatch(listSubCategoryDetails(id));
        dispatch(listCategories());
      } else {
        setName(subcategory.name);
        setCategory(subcategory.category);
      }
    }
  }, [dispatch, navigate, successUpdate, id, subcategory]);

  const submitHandler = (e) => {
    dispatch(
      updateSubCategory({
        _id: id,
        name,
        category,
      })
    );
    e.preventDefault();
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="SubCategory" />
      <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
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
          <div class="space-y-4">
            
            <div>
              <label class="text-gray-600 mb-2 block">SubCatagory Name</label>
              <input
                value={name}
                type="text"
                class="input-box"
                onChange={(e) => setName(e.target.value)}
                placeholder="SubCategory Name"
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">Category</label>
              <select
                name="category"
                type="text"
                class="input-box"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category here</option>
                {categories.map((cat) => (
                  <>
                    <option value={cat.id}>
                      {cat.id.substring(1, 1)}
                      {cat.name}
                    </option>
                  </>
                ))}
              </select>
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

export default UpdateSubCategory;
