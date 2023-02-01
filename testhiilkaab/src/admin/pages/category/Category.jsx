import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, listCategories } from "../../../actions/categoryActions";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onClickFn = () => {};
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
    dispatch(listCategories());
  }, [dispatch, userInfo, successDelete]);


  const deleteHandler = (id) => {

    if (window.confirm('Make sure you deleted all products belongs this category.')) {
        if (window.confirm('Are you sure to delete this category')) {
            dispatch(deleteCategory(id))
       }
   } 
}

  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Categories"
        currentColor={currentColor}
        onClick={onClickFn}
        linktext="/addcategory"
      />
      <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-2 gap-2">
        {loadingDelete && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
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
          <Message severity="error" text={error}/> 
        ) : (
          <>
            {categories.map((category) => (
            <div className="w-36 mb-2 bg-gray-100 p-2">
              <div className="relative group rounded-sm overflow-hidden">
                <img src={category.icon} className="w-full h-24" />
                <a
                  to="#"
                  className="absolute text-ellipsis text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                >
                  {category.name}
                </a>
              </div>
              <div className="flex mt-4 justify-around lg:text-2xl">
              <Link to={`/updateCategory/${category.id}`}> 
                    <button className="text-primary"><MdModeEdit/></button>
                    </Link>
                    <button onClick={() => deleteHandler(category.id)}><MdDelete/></button>
              </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
