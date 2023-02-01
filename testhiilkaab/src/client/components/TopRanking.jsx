import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory1 } from "../../actions/filterActions";
import ProductBuild from "./ProductBuild";

const TopRanking = ({id}) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList1 = useSelector((state) => state.productList1);
  const { loading, error, products } = productList1;

  useEffect(() => {
    dispatch( getProductsByCategory1({ query: id }))
  }, [dispatch, keyword]);
  return (
    <div className="">
      {products.map(product => (
        <ProductBuild product={product}/>
      ))}
        
        
    </div>
  );
};

export default TopRanking;



