import React, { useEffect } from "react";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Message } from "primereact/message";
import { removeFromWish } from "../../actions/wishlistActions";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const dispatch = useDispatch();

  useEffect(() => {
   
  }, [dispatch]);

  const removeFromWishHandler = (id) => {
    dispatch(removeFromWish(id));
  };

  return (
    <>
      <Header />
      {/* <!-- account wrapper --> */}
      <div class="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <HomeSidebar />
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        <div class="col-span-9 mt-6 lg:mt-0 space-y-4">
          {/* <!-- single wishlist --> */}

          {wishlistItems.length === 0 ? (
            <div className="">
              <Message
                severity="info"
                className="w-full"
                text="Your wishlist is empty"
              ></Message>
              <div
                style={{ marginTop: "8px", textDecoration: "underline" }}
                className="flex justify-center"
              >
                <Link to="/">Go Back</Link>
              </div>
            </div>
          ) : (
            <>
              {wishlistItems.map((item) => (
                <div class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
                  {/* <!-- cart image --> */}
                  <div class="w-28 flex-shrink-0">
                    <img src={item.images && item.images[0]} class="w-full" />
                  </div>
                  {/* <!-- cart image end --> */}
                  {/* <!-- cart content --> */}
                  <div class="md:w-1/3 w-full">
                    <h2 class="text-gray-800 mb-1 xl:text-xl textl-lg font-medium uppercase">
                      {item.name}
                    </h2>
                    {item.countInStock < 0 ? (
                      ""
                    ) : (
                      <p class="text-gray-500 text-sm">
                        Availability:{" "}
                        <span class="text-green-600">In Stock</span>
                      </p>
                    )}
                  </div>
                  {/* <!-- cart content end --> */}
                  <div class="">
                    <p class="text-primary text-lg font-semibold">
                      ${item.price}
                    </p>
                  </div>
                  <Link
                    to={`/product/${item.product}`}
                    class="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    Add to cart
                  </Link>
                  <div class="text-gray-600 hover:text-primary cursor-pointer">
                    <button onClick={() =>removeFromWishHandler(item.product)}>
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* <!-- account content end --> */}
      </div>
      {/* <!-- account wrapper end --> */}
    </>
  );
};

export default Wishlist;
