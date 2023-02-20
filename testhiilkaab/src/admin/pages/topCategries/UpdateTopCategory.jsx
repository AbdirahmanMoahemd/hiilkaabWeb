import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listCategories } from "../../../actions/categoryActions";
import { listTopCategoryDetails, updateTopCategory } from "../../../actions/topCategoriesActions";
import { TOPCATEGORY_UPDATE_RESET } from "../../../constants/categoryConstants";
import { Header } from "../../components";

const UpdateTopCategory = () => {
  const { id } = useParams();
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [category4, setCategory4] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryTopDetails = useSelector((state) => state.categoryTopDetails);
  const { loading, error, topcategory } = categoryTopDetails;

  const categoryTopUpdate = useSelector((state) => state.categoryTopUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryTopUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TOPCATEGORY_UPDATE_RESET });
      navigate("/admin/topCategory");
    } else {
      if (!topcategory.category1 || topcategory.id !== id) {
        dispatch(listTopCategoryDetails(id));
        dispatch(listCategories());
      } else {
        setCategory1(topcategory.category1);
        setCategory2(topcategory.category2);
        setCategory3(topcategory.category3);
        setCategory4(topcategory.category4);
      }
    }
  }, [dispatch, navigate, successUpdate, id, topcategory]);

  const submitHandler = (e) => {
    dispatch(
      updateTopCategory({
        _id: id,
        category1,category2,category3,category4
      })
    );
    e.preventDefault();
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="TopCategory" />
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
              <label className="text-gray-600 mb-2 block">Category1</label>
              <label className="text-gray-600 mb-2 block">{category1 && category1.name}</label>
              <select
                name="category1"
                type="text"
                className="input-box"
                value={category1}
                required
                onChange={(e) => {
                  e.preventDefault()
                  setCategory1(e.target.value)}}
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
              <label className="text-gray-600 mb-2 block">{category2 && category2.name}</label>


              <select
                name="category2"
                type="text"
                className="input-box"
                value={category2}
                required
                onChange={(e) => {
                  e.preventDefault()
                  setCategory2(e.target.value)}}
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
              <label className="text-gray-600 mb-2 block">{category3 && category3.name}</label>


              <select
                name="category3"
                type="text"
                className="input-box"
                value={category3}
                required
                onChange={(e) => {
                  e.preventDefault()
                  setCategory3(e.target.value)}}
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
              <label className="text-gray-600 mb-2 block">{category4 && category4.name}</label>


              <select
                name="category4"
                type="text"
                className="input-box"
                value={category4}
                required
                onChange={(e) => {
                  e.preventDefault()
                  setCategory4(e.target.value)}}
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

export default UpdateTopCategory;
