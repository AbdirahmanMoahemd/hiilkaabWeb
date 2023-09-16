import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategory,
  listCategories,
} from "../../../actions/categoryActions";
import {
  deleteDiscount,
  listDiscounts,
} from "../../../actions/discountActions";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onClickFn = () => {};
  const discountList = useSelector((state) => state.discountList);
  const { loading, error, discounts } = discountList;

  const discountDelete = useSelector((state) => state.discountDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = discountDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
    dispatch(listDiscounts());
  }, [dispatch, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDiscount(id));
    }
  };

  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Discount"
        currentColor={currentColor}
        onClick={onClickFn}
        linktext="/addproductdiscount"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-2">
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
          <Message severity="error" text={error} />
        ) : (
          <>
            {discounts.map((discount) => (
              <div className="w-full mb-2 bg-gray-100 p-2 h-72">
                <div className="relative group rounded-sm overflow-hidden">
                  <span className="flex gap-3 ">
                  <img src={discount.icon} className="w-[50%] h-52" />
                  <img src={discount.product && discount.product.images[0]} className="w-[50%] h-52" />

                  </span>
                  <a
                    to="#"
                    className="absolute text-ellipsis text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {discount.product && discount.product.name}
                  </a>
                </div>
                <div className="flex mt-4 justify-around lg:text-2xl">
                  <Link to={`/updateDiscountProduct/${discount.id}`}>
                    <button className="text-primary">
                      <MdModeEdit />
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(discount.id)}>
                    <MdDelete />
                  </button>
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
