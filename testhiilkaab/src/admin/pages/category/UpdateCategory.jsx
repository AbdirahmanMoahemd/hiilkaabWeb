import { Message } from "primereact/message";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  listCategoryDetails,
  updateCategory,
} from "../../../actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../../../constants/categoryConstants";
import { Header } from "../../components";

const UpdateCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      navigate("/admin/category");
    } else {
      if (!category.name || category.id !== id) {
        dispatch(listCategoryDetails(id));
      } else {
        setName(category.name);
        setIcon(category.icon);
      }
    }
  }, [dispatch, navigate, successUpdate, id, category]);

  const submitHandler = (e) => {
    dispatch(
      updateCategory({
        _id: id,
        name,
        icon,
      })
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
      <Header category="Update" title="Category" />
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
                <label class="text-gray-600 mb-2 block">Category Name</label>
                <input
                  value={name}
                  type="text"
                  class="input-box"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Category Name"
                  required
                />
              </div>
              <div>
                <label class="text-gray-600 mb-2 block">
                  Select image <span class="text-primary">*</span>
                </label>
                <input
                  value={icon}
                  id="icon"
                  type="text"
                  className="input-box"
                  placeholder="Category image"
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

export default UpdateCategory;
