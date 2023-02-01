import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listsettings } from "../../actions/settingsActions";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settingsList = useSelector((state) => state.settingsList);
  const { loading, error, settings } = settingsList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
    dispatch(listsettings());
  }, [dispatch, navigate, userInfo]);


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Settings"
      />
      <div className="">
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
            {settings.map((setting) => (
              <div className="mb-2 bg-gray-100  p-2 lg:flex lg:justify-around">
                <div className="w-36">
                  <img src={setting.aboutImg && setting.aboutImg} className="w-full h-24" />
                </div>
                <div className="w-36">
                  <p className="text-xl font-bold">About Us</p>
                  <p>{setting.about.substring(0,55)}...</p>
                </div>
                <div>
                <p className="text-xl font-bold">PhoneNumber</p>
                  <p>{setting.phoneNumber}</p>
                </div>
                <div>
                <p className="text-xl font-bold">WhatsApp PhoneNumber</p>
                  <p>{setting.whatsAppPhoneNumber}</p>
                </div>
                <div className="flex mt-4 justify-around lg:text-2xl">
                  <Link to={`/updateCategory/${setting.id}`}>
                    <button className="text-primary">
                      <MdModeEdit />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
