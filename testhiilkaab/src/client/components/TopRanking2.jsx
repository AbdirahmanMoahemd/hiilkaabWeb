import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory2 } from "../../actions/filterActions";
import ProductBuild from "./ProductBuild";

const TopRanking2 = ({id}) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList2 = useSelector((state) => state.productList2);
  const { loading, error, products } = productList2;

  useEffect(() => {
    dispatch( getProductsByCategory2({ query: id }))
  }, [dispatch, keyword]);
  return (
    <div>
      {products.map(product => (
        <ProductBuild product={product}/>
      ))}
        
        
    </div>
  );
};

export default TopRanking2;



