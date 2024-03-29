import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useMatch, Link } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {
  deleteProduct,
  listProductsByAdmin,
} from "../../../actions/prodcutActions";
import { Paginator } from "primereact/paginator";

const Products = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(50);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(listProductsByAdmin(keyword, pageNumber));
  }, [dispatch, navigate, keyword, pageNumber, userInfo, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProductsByAdmin(keyword));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product")) {
      dispatch(deleteProduct(id));
    }
  };

  console.log(count);

  const onClickFn = () => {};
  const { currentColor } = useStateContext();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title={`Products`}
        count={`(${count && count})`}
        currentColor={currentColor}
        onClick={onClickFn}
        linktext="/addproducts"
      />
      <div className="flex justify-center w-full pb-5">
        <form
          className="w-full xl:max-w-xl max-w-lg flex relative"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            className="pl-12 w-full border border-r-0 border-primary py-3 px-3 rounded-l-md focus:ring-primary focus:border-primary"
            placeholder="search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary border border-primary text-primary px-8 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition"
          >
            Search
          </button>
        </form>
      </div>

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
          <Message variant="danger" text={error}></Message>
        ) : (
          <>
            {products.map((product) => (
              <div className="lg:w-36 mb-2 bg-gray-100 p-2">
                <div className="relative group rounded-sm overflow-hidden">
                  {product.images ? (
                    <img src={product.images[0]} className="w-full h-24" />
                  ) : (
                    ""
                  )}
                  <a
                    to="#"
                    className="absolute text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center text-base text-white 
                    font-roboto font-medium tracking-wide transition"
                  >
                    {product.name}
                  </a>
                </div>
                <div className="mt-2">
                  <p>category: {product.category.name}</p>
                  <p>subcategory: {product.subcategory.name}</p>
                  <p>CountInStock: {product.countInStock}</p>
                  <p>price: ${product.price}</p>
                  <p>isDiscounted: {product.isDiscounted ? "yes" : "No"}</p>

                  {product.isDiscounted ? (
                    <p>NewPrice: ${product.newPrice}</p>
                  ) : (
                    ""
                  )}
                  <div>
                    {product.colors && product.colors.length === "" ? (
                      ""
                    ) : (
                      <>
                        {product.colors && (
                          <>
                            Colors:{" "}
                            {product.colors.map((col) => (
                              <span
                                className="ml-2 pl-2 pr-2 w-4 mt-10"
                                style={{ background: `${col}` }}
                              ></span>
                            ))}
                          </>
                        )}
                      </>
                    )}

                    {product.sizes && product.sizes.length === "" ? (
                      ""
                    ) : (
                      <>
                        <div>
                          {product.sizes && (
                            <>
                              {" "}
                              Sizes:{" "}
                              {product.sizes.map((col) => (
                                <span>
                                  <span className="pl-2 w-4 mt-10">{col}</span>
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <p>isFeatured: {product.isFeatured ? "yes" : "No"}</p>
                <div className="flex mt-4 justify-around lg:text-2xl">
                  <Link to={`/updateproduct/${product.id}`}>
                    <button className="text-primary">
                      <MdModeEdit />
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(product.id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={count}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Products;
