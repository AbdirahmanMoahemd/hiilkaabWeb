import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../../../actions/categoryActions";
import { createSubCategory } from "../../../actions/subCategoryActions";
import { Header } from "../../components";

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const subcategoryCreate = useSelector((state) => state.subcategoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = subcategoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
  };

  useEffect(() => {
    dispatch(listCategories());
    if (successCreate) {
      navigate("/admin/subcategory/");
    } 
  }, [dispatch, navigate, successCreate]);

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="SubCategory" />
      <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
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
          <div class="space-y-4">
            <div>
              <label class="text-gray-600 mb-2 block">SubCatagory Name</label>
              <input type="text" class="input-box" 
              onChange={(e) => setName(e.target.value)}
              placeholder="SubCategory Name"
              required/>
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

export default AddSubcategory;
