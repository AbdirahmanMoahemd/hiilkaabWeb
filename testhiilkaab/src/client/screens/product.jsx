import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import hiilkaab from "../../data/images/hiilkaab.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProductReview,
  listProductDetails,
  listSameProducts,
} from "../../actions/prodcutActions";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { addToWish } from "../../actions/wishlistActions";
import Rating from "../components/Rating";
import { InputNumber } from 'primereact/inputnumber';

const Product = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImg, setSelectedImg] = useState(0);

  const [isProDetails, setIsProDetails] = useState(true);
  const [isReviews, setIsReviews] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const productReview = useSelector((state) => state.productReview);
  const { success: successProductReview, error: errorProductReview } =
    productReview;

  const sameProductList = useSelector((state) => state.sameProductList);
  const {
    loading: loadingProductList,
    error: errrorProductList,
    products,
  } = sameProductList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isProDetails, isReviews, id]);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
   
  }, [dispatch, id, successProductReview]);

  useEffect(() => {
    dispatch(listSameProducts(id))
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addToWishHandler = () => {
    dispatch(addToWish(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Header />
      {/* <!-- product view --> */}
      {loading ? (
        <center>
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </center>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
        <>
          <div className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
            {/* <!-- product image --> */}
            <div>
              <div className="flex justify-center">
                <img
                  id="main-img"
                  src={product.images ? product.images[selectedImg] : ""}
                  className="h-72 lg:h-96"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images &&
                  product.images.map((img, index) => (
                    <div id={index} className="">
                      <img
                        onClick={() => {
                          setSelectedImg(index);
                          
                        }}
                        src={img}
                        className={
                          "single-img w-full h-24 lg:h-36 cursor-pointer border border-primary"
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* <!-- product image end --> */}
            {/* <!-- product content --> */}
            <div>
              <h2 className="md:text-2xl text-xl font-medium uppercase mb-2">
                {product.name}
              </h2>
              <div className="flex items-center mb-4">
                <Rating value={product.rating} text={product.numReviews} />
                <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-semibold space-x-2">
                  <span>Availability: </span>
                  {product.countInStock < 1 ? (
                    <span className="text-green-600">Out Of Stock</span>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </p>
                <p className="space-x-2">
                  <span className="text-gray-800 font-semibold">Brand: </span>
                  <span className="text-gray-600">{product.brand && product.brand.name}</span>
                </p>
                <p className="space-x-2">
                  <span className="text-gray-800 font-semibold">
                    Category:{" "}
                  </span>
                  <span className="text-gray-600">{product.category && product.category.name}</span>
                </p>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-primary font-semibold text-xl">
                  ${product.price}
                </span>
                {product.newPrice > 0 && (
                  <span className="text-gray-500 text-base line-through">
                    ${product.newPrice}
                  </span>
                )}
              </div>
              <p className="mt-4 text-gray-600">{product.description}</p>
              {/* <!-- size --> */}
              {product.sizes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-base text-gray-800 mb-1">Size</h3>
                  <div className="flex items-center gap-2">
                    {/* <!-- single size --> */}
                    {product.sizes &&
                      product.sizes.map((size) => (
                        <div className="size-selector">
                          <input
                            type="radio"
                            name="size"
                            className="hidden"
                            id="size-xs"
                          />
                          <label
                            for="size-xs"
                            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* <!-- size end --> */}
              {/* <!-- color --> */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-base text-gray-800 mb-1">Color</h3>
                  <div className="flex items-center gap-2">
                    {/* <!-- single color --> */}
                    {product.colors &&
                      product.colors.map((color) => (
                        <div className="color-selector">
                          <input
                            type="radio"
                            name="color"
                            className="hidden"
                            id="color-red"
                            checked
                          />
                          <label
                            for="color-red"
                            style={{ background: `${color}` }}
                            className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                          ></label>
                        </div>
                      ))}
                    {/* <!-- single color end --> */}
                  </div>
                </div>
              )}
              {/* <!-- color end --> */}
              <br/>
              <span className="">Qty:</span>{'      '}<InputNumber value={qty}  inputClassName='w-10 h-10' showButtons buttonLayout="horizontal"
                                                             decrementButtonClassName="p-button-danger"
                                                incrementButtonClassName="p-button-success"
                                                 decrementButtonIcon="pi pi-minus"
                                                            incrementButtonIcon="pi pi-plus"
                                                            max={product.countInStock}
                                                            min="0"
                                                            onValueChange={(e) => setQty(e.target.value)} />

              {/* <!-- color end --> */}
              {/* <!-- add to cart button --> */}
              
              <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
             
                <button
                  onClick={product.countInStock < 1 ? '' : addToCartHandler}
                  className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase 
                    hover:bg-transparent hover:text-primary transition text-sm flex items-center"
                >
                  <span className="mr-2">
                    <i className="fa fa-shopping-bag"></i>
                  </span>{" "}
                  Add to cart 
                </button>
                <button
                  className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase 
                    hover:bg-transparent hover:text-primary transition text-sm"
                >
                  <span className="mr-2">
                    <i className="fa fa-heart"></i>
                  </span>{" "}
                  <button onClick={addToWishHandler}>Wishlist</button>
                </button>
              </div>
              {/* <!-- add to cart button end --> */}
              {/* <!-- product share icons --> */}
              <div className="flex space-x-3 mt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
              {/* <!-- product share icons end --> */}
            </div>
            {/* <!-- product content end --> */}
          </div>
          {/* <!-- product view end --> */}

          {/* <!-- product details and review --> */}
          <div className="container pb-16">
            {/* <!-- detail buttons --> */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsProDetails(true);
                  setIsReviews(false);
                }}
              >
                <div
                  className={`border-t border-r border-l  pt-2 w-36 rounded rounded-b-none ${
                    isProDetails ? "border-primary" : "border-gray-600"
                  }`}
                >
                  <h3 className="font-roboto text-center text-gray-800 pb-3 font-medium">
                    Product Details
                  </h3>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsReviews(true);
                  setIsProDetails(false);
                }}
              >
                <div
                  className={`border-t border-r border-l  pt-2 w-36 rounded rounded-b-none ${
                    isReviews ? "border-primary" : "border-gray-600"
                  }`}
                >
                  <h3 className="font-roboto text-center text-gray-800 pb-3 font-medium">
                    Reviews
                  </h3>
                </div>
              </button>
            </div>
            {isReviews ? (
              <div className="pt-10">
                <p className="text-primary">{errorProductReview}</p>
                <form onSubmit={submitHandler}>
                  <h3 className="text-lg font-medium capitalize mb-4">
                    Write a Customer Review
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <select
                        name="cars"
                        id="cars"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair </option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        type="textArea"
                        style={{ rows: "4", cols: "50" }}
                        placeholder="write your comment here..."
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button
                      className="border border-primary text-primary px-8 py-2 font-medium rounded uppercase 
                    hover:bg-transparent hover:text-primary transition text-sm flex items-center"
                    >
                      submit
                    </button>
                  </div>
                </form>
                <div className="pt-10 grid grid-cols-1 lg:grid-cols-1 gap-4">
                  {product.reviews.map((review) => (
                    <div>
                      <p>{review.name}</p>
                      <div className="flex gap-1 text-sm text-yellow-400">
                        <Rating value={review.rating} />
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className=" text-gray-600">{product.mainDescription}</p>
            )}

            {/* <!-- details button end --> */}
          </div>
          {/* <!-- product details and review end --> */}
        </>
      )}
      {/* <!-- related products --> */}
      <div className="container pb-16">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">
          related products
        </h2>
        {/* <!-- product wrapper --> */}
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
          {/* <!-- single product --> */}
          {loadingProductList ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errrorProductList ? (
            <Message severity="error" text={errrorProductList}></Message>
          ) : (
            <>
              {products.map((filteredproduct) => (
                  <div className="group rounded bg-white shadow overflow-hidden">
                    {/* <!-- product image --> */}
                    <Link to={`/product/${filteredproduct.id}`}>
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-40 h-40 ">
                            <img
                              src={
                                filteredproduct.images
                                  ? filteredproduct.images[0]
                                  : hiilkaab
                              }
                              className="w-full h-full"
                            />
                          </div>
                          <div className="absolute inset-0  h-40 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <Link
                              to={`/product/${filteredproduct.id}`}
                              className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                            >
                              <i className="fa fa-heart"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {/* <!-- pro image end -->
                   <!-- pro content --> */}
                    <div className="pt-4 pb-3 px-4">
                      <Link to={`/product/${filteredproduct.id}`}>
                        <h4 className="uppercase font-medium text-base lg:text-lg mb-2 text-gray-800 hover:text-primary transition truncate ...">
                          {filteredproduct.name}
                        </h4>
                      </Link>
                      <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-xl text-primary font-roboto font-semibold">
                          ${filteredproduct.price}
                        </p>
                        <p className="text-sm text-gray-400 font-roboto line-through">
                        {filteredproduct.newPrice > 0 && `$${filteredproduct.newPrice}`}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Rating
                          value={filteredproduct.rating}
                          text={filteredproduct.numReviews}
                        />
                      </div>
                    </div>
                    {/* <!-- pro content end -->
                   <!-- pro button --> */}
                    <Link
                      to={`/product/${filteredproduct.id}`}
                      className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    >
                      Add to Cart
                    </Link>
                    {/* <!-- product button end --> */}
                  </div>
                ))}
            </>
          )}
          {/* <!-- single product end --> */}
        </div>
        {/* // <!-- product wrapper end --> */}
      </div>
      {/* // <!-- related products end --> */}
    </>
  );
};

export default Product;
