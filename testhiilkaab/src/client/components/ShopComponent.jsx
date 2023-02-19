import React from "react";
import { Link } from "react-router-dom";
import hiilkaab from "../../data/images/hiilkaab.jpg";
import Rating from "./Rating";

const ShopComponent = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-2 gap-6 mt-8">
      {/* <!-- single product --> */}
      {products.map((product) => (
        <div className="group rounded bg-white shadow overflow-hidden">
          {/* <!-- product image --> */}
          <Link to={`/product/${product.id}`}>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-40 h-40 ">
                <img
                  src={product.images ? product.images[0] : hiilkaab}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0  h-40 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
               
                <Link
                  to="/"
                  className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                >
                  <i className="fa fa-heart"></i>
                </Link>
              </div>
            </div>
          </div>
          </Link>
          {/* <!-- product image end -->
                <!-- product content --> */}
          <div className="pt-4 pb-3 px-4">
            <Link to="/">
              <h4 className="uppercase font-medium text-base lg:text-lg mb-2 text-gray-800 hover:text-primary transition truncate ...">
                {product.name}
              </h4>
            </Link>
            <div className="flex items-baseline mb-1 space-x-2">
              <p className="text-xl text-primary font-roboto font-semibold">
                ${product.price}
              </p>
              <p className="text-sm text-gray-400 font-roboto line-through">
                {product.newPrice >0 && `$${product.newPrice}`}
              </p>
            </div>
            <div className="flex items-center">
              <Rating value={product.rating} text={product.numReviews} />
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          {/* <!-- product content end -->
                <!-- product button --> */}
          <Link
            to={`/product/${product.id}`}
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to Cart
          </Link>
          {/* <!-- product button end --> */}
        </div>
      ))}
      {/* // <!-- single product end --> */}
    </div>
  );
};

export default ShopComponent;
