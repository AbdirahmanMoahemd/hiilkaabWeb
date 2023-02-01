import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory3 } from "../../actions/filterActions";
import ProductBuild from "./ProductBuild";

const TopRanking3 = ({ id }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList3 = useSelector((state) => state.productList3);
  const { loading, error, products } = productList3;

  useEffect(() => {
    dispatch( getProductsByCategory3({ query: id }))
  }, [dispatch, keyword]);
  return (
    <div>
      {products.map((product) => (
        <ProductBuild product={product} />
      ))}
    </div>
  );
};

export default TopRanking3;
