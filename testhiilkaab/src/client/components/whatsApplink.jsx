import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listsettings } from "../../actions/settingsActions";

const WhatsApplink = () => {
  const dispatch = useDispatch();

  const settingsList = useSelector((state) => state.settingsList);
  const { settings } = settingsList;

  useEffect(() => {
    dispatch(listsettings());
  }, [dispatch]);
  return (
    <>
      {settings.map((setting) => (
        <a
          href={`https://wa.me/${setting.whatsAppPhoneNumber}`}
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-whatsapp lg:py-3 p-2"></i>
        </a>
      ))}
    </>
  );
};

export default WhatsApplink;
