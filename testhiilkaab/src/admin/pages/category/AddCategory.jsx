import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../actions/categoryActions";
import { Header } from "../../components";
import { Message } from "primereact/message";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, icon));
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/admin/category");
    }
  }, [dispatch, navigate, successCreate]);

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
      <Header category="Add" title="Category" />
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
              <label class="text-gray-600 mb-2 block">Category Name</label>
              <input
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

export default AddCategory;
