import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../data/dummy";
import logo from "../data/logo.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { ScrollPanel } from "primereact/scrollpanel";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={logo} alt="logo" className="h-20 lg:h-28" />
              <span></span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10 ">
            <ScrollPanel>
              {links.map((link) => (
                <NavLink
                  to={`/${link.link}`}
                  key={link.link}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {link.icon}
                  <span className="capitalize ">{link.name}</span>
                </NavLink>
              ))}
            </ScrollPanel>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
