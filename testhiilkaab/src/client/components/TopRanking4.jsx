import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory4 } from "../../actions/filterActions";
import ProductBuild from "./ProductBuild";

const TopRanking4 = ({ id }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList4 = useSelector((state) => state.productList4);
  const { loading, error, products } = productList4;

  useEffect(() => {
    dispatch( getProductsByCategory4({ query: id }))
  }, [dispatch, keyword]);
  return (
    <div>
      {products.map((product) => (
        <ProductBuild product={product} />
      ))}
    </div>
  );
};

export default TopRanking4;
