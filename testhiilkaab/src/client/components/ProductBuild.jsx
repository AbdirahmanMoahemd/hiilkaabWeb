import React from "react";
import { Link } from "react-router-dom";
import product1 from "../../data/product4.jpg";
import Rating from "./Rating";

const ProductBuild = ({ product }) => {
  return (
    <div className="lg:flex lg:justify-between mt-8">
      <div className="relative">
        <div className="w-28 h-28 ">
        <Link to={`/product/${product.id}`}><img
            src={product.images && product.images[0]}
            className="w-full h-full"
          /></Link>
        </div>
      </div>
      <div className="lg:ml-4 pt-4 pb-3 p-2 w-36">
        <Link to={`/product/${product.id}`}>{product.name &&  product.name.substring(0,10)}...</Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-roboto font-semibold">${product.price}</p>
          <p className="text-sm text-gray-400 font-roboto line-through">{product.newPrice > 0 && `$${product.newPrice}`}</p>
        </div>
        <div className="flex items-center">
          <Rating value={product.rating} text={product.numReviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductBuild;
