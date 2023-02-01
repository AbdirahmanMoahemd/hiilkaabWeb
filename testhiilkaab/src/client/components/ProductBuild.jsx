import React from "react";
import { Link } from "react-router-dom";
import product1 from "../../data/product4.jpg";

const ProductBuild = ({ product }) => {
  return (
    <div className="lg:flex lg:justify-between mt-8">
      <div className="relative">
        <div className="h-28 w-28">
          <img src={product.images && product.images[0]} className="w-full h-full"/>
        </div>
      </div>
      <div className="lg:ml-4 pt-4 pb-3 px-2">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-roboto font-semibold">$200</p>
          <p className="text-sm text-gray-400 font-roboto line-through">$300</p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <i className="fa fa-star"></i>
            </span>
            <span>
              <i className="fa fa-star"></i>
            </span>
            <span>
              <i className="fa fa-star"></i>
            </span>
            <span>
              <i className="fa fa-star"></i>
            </span>
            <span>
              <i className="fa fa-star"></i>
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
      </div>
    </div>
  );
};

export default ProductBuild;
