import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  listTopCategories,
  deleteTopCategory,
} from "../../../actions/topCategoriesActions";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const TopCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryTopList = useSelector((state) => state.categoryTopList);
  const { loading, error, topcategories } = categoryTopList;

  const categoryTopDelete = useSelector((state) => state.categoryTopDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryTopDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
    dispatch(listTopCategories());
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this Topcategory")) {
      dispatch(deleteTopCategory(id));
    }
  };

  const onClickFn = () => {};
  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      <Header
        category="Page"
        title="Top categories"
        
      />
      <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-2 gap-2">
        {loadingDelete && (
          <center>
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </center>
        )}
        {errorDelete && <Message severity="error" text={errorDelete} />}
        {loading ? (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {topcategories.map((topcategory) => (
              <div className="w-full mb-2 bg-gray-100 p-2">
                <div className="relative bg-gray-400 group rounded-sm overflow-hidden p-2">
                  <a
                    to="#"
                    className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {topcategory.category1 && topcategory.category1.name}
                  </a>

                  <a
                    to="#"
                    className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {topcategory.category2 && topcategory.category2.name}
                  </a>

                  <a
                    to="#"
                    className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {topcategory.category3 && topcategory.category3.name}
                  </a>

                  <a
                    to="#"
                    className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {topcategory.category4 && topcategory.category4.name}
                  </a>
                </div>
                <div className="flex mt-4 justify-around lg:text-2xl">
                  <Link to={`/updateTopCategory/${topcategory.id}`}>
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

export default TopCategory;
