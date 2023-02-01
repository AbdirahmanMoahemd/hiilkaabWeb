import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useMatch, Link } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteProduct, listProducts } from "../../../actions/prodcutActions";

const Products = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

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

    dispatch(listProducts(keyword));
  }, [dispatch, keyword, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this product")) {
      dispatch(deleteProduct(id));
    }
  };

  const onClickFn = () => {};
  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Products"
        currentColor={currentColor}
        onClick={onClickFn}
        linktext="/addproducts"
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
          <Message variant="danger">{error}</Message>
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
    </div>
  );
};

export default Products;
