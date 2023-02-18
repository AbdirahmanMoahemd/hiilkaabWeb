import axios from "axios";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSettings,
  getSettingsDetails,
  updateSettings,
} from "../../actions/settingsActions";
import {
  SETTINGS_CREATE_RESET,
  SETTINGS_UPDATE_RESET,
} from "../../constants/settingsConstants";
import { Header } from "../components";

const UpdateSettings = () => {
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [whatsAppPhoneNumber, setWhatsAppPhoneNumber] = useState(0);
  const [about, setAbout] = useState("");
  const [aboutImg, setAboutImg] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  const settingsCreat = useSelector((state) => state.settingsCreat);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = settingsCreat;

  const settingsDetails = useSelector((state) => state.settingsDetails);
  const { loading, error, settings } = settingsDetails;

  const settingsUpdate = useSelector((state) => state.settingsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = settingsUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SETTINGS_UPDATE_RESET });
      navigate("/settings");
    } else {
      if (settings._id == id) {
        dispatch(getSettingsDetails(id));
      } else {
        setAbout(settings.about);
        setAboutImg(settings.aboutImg);
        setWhatsAppPhoneNumber(settings.whatsAppPhoneNumber);
        setPhoneNumber(settings.phoneNumber);
      }
    }
  }, [dispatch, navigate, successUpdate]);

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
      setAboutImg(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSettings({_id:id, phoneNumber, whatsAppPhoneNumber, about, aboutImg})
    );
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="Settings" />
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
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-2 block">PhoneNumber</label>
              <input
                type="number"
                value={phoneNumber}
                className="input-box"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="PhoneNumber"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                WhatsAppPhoneNumber
              </label>
              <input
                type="number"
                value={whatsAppPhoneNumber}
                className="input-box"
                onChange={(e) => setWhatsAppPhoneNumber(e.target.value)}
                placeholder="WhatsAppPhoneNumber"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">About text</label>
              <textarea
                type="text"
                rows={5}
                cols={5}
                value={about}
                className="input-box"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Select about image <span className="text-primary">*</span>
              </label>
              <input
                value={aboutImg}
                id="icon"
                type="text"
                className="input-box"
                placeholder="AboutImg"
                onChange={(e) => setAboutImg(e.target.value)}
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
              <img src={aboutImg} />
            </div>
            <div className="mt-4 flex justify-center">
               
              <button type="submit" className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                
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

export default UpdateSettings;
