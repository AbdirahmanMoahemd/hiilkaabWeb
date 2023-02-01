import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTopCategory } from "../../../actions/topCategoriesActions";
import { Header } from "../../components";
import { Message } from "primereact/message";
import { listCategories } from "../../../actions/categoryActions";

const AddTopCategory = () => {
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [category4, setCategory4] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categoryTopCreate = useSelector((state) => state.categoryTopCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryTopCreate;


  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTopCategory(category1, category2, category3, category4));
  };

  useEffect(() => {
    dispatch(listCategories());
    if (successCreate) {
      navigate("/admin/topcategory");
    }
  }, [dispatch, navigate, successCreate]);

  

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="TopCategory" />
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
            <p>{}</p>
            
          
          <div>
              <label className="text-gray-600 mb-2 block">Category1</label>
              <select
                name="category1"
                type="text"
                class="input-box"
                value={category1}
                required
                onChange={(e) => setCategory1(e.target.value)}
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


            <div>
              <label className="text-gray-600 mb-2 block">Category2</label>
              <select
                name="category2"
                type="text"
                class="input-box"
                value={category2}
                required
                onChange={(e) => setCategory2(e.target.value)}
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

            <div>
              <label className="text-gray-600 mb-2 block">Category3</label>
              <select
                name="category3"
                type="text"
                class="input-box"
                value={category3}
                required
                onChange={(e) => setCategory3(e.target.value)}
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

            <div>
              <label className="text-gray-600 mb-2 block">Category4</label>
              <select
                name="category4"
                type="text"
                class="input-box"
                value={category4}
                required
                onChange={(e) => setCategory4(e.target.value)}
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

export default AddTopCategory;
