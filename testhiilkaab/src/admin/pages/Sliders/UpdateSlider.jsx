import axios from "axios";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSlide,
  getSlideDetails,
  updateSlide,
} from "../../../actions/slideActions";
import {
  SLIDE_CREATE_RESET,
  SLIDE_UPDATE_RESET,
} from "../../../constants/slideConstants";
import { Header } from "../../components";

const UpdateSlider = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sildeDetails = useSelector((state) => state.sildeDetails);
  const { loading, error, slide } = sildeDetails;

  const slideUpdate = useSelector((state) => state.slideUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = slideUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SLIDE_UPDATE_RESET });
      navigate("/sliders");
    }

    if (!slide.image || slide._id !== id) {
      dispatch(getSlideDetails(id));
    } else {
      setImage(slide.image);
    }
  }, [dispatch, navigate, id, successUpdate]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSlide({
        _id: id,
        image,
      })
    );
  };

  return (
    <>
      <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
        {/* <!-- checkout form --> */}
        <Header category="Update" title="Slider" />
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
            <>
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
            <div className="w-36 h-18 flex pl-2 mt-6">
              <img src={image} />
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Update
              </button>
            </div>
            </>)}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSlider;
