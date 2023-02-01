import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import { listSubCategories } from "../../actions/subCategoryActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { listOfBrands, listProducts } from "../../actions/prodcutActions";
import { useParams } from "react-router-dom";
import ShopComponent from "../components/ShopComponent";
import { getProductsByFilter } from "../../actions/filterActions";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const Shop = () => {
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [navbarState, setNavbarState] = useState(true);
  const { keyword } = useParams();
  const { id } = useParams();

  const [categoryIds, setCategoryIds] = useState([]);
  const [subcategoryIds, setSubCategoryIds] = useState([]);
  const [brandIds, setBrandIds] = useState([]);

  let updatedCategoryIds;
  let updatedSubCategoryIds;
  let updatedBrandIds;
 
 

  const changeHandler = () => {
    setNavbarState(!navbarState);
  };

  const brandList = useSelector((state) => state.brandList);
  const {
    loading: loadingBrand,
    error: errorBrand,
    products:brands,
  } = brandList;



  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingcategory,
    error: errorcategory,
    categories,
  } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const {
    loading: loadingSubcategories,
    error: errorSubcategories,
    subcategories,
  } = subcategoryList;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);


  useEffect(() => {
    dispatch(listOfBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id !== undefined ) {

      dispatch( getProductsByFilter({ type: "category", query: id }))
     }else{
      dispatch(listProducts(keyword));
     }
   
  }, [dispatch, keyword]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth < 900) {
      setNavbarState(false);
    } else {
      setNavbarState(true);
    }
  }, [windowSize]);

  const handleCategory = (e) => {
    resetState();

    const currentCategoryChecked = e.target.value;

    const allCategoriesChecked = [...categoryIds];

    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    if (indexFound === -1) {
      // add
      updatedCategoryIds = [...categoryIds, currentCategoryChecked];
      setCategoryIds(updatedCategoryIds);
    } else {
      // remove
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
    }
    dispatch(
      getProductsByFilter({ type: "category", query: updatedCategoryIds })
    );
  };

  const resetState = () => {
    setCategoryIds([]);
  };

  const handleCategory2 = (e) => {
    resetState2();

    const currentSubCategoryChecked = e.target.value;

    const allSubCategoriesChecked = [...subcategoryIds];

    const indexFound2 = allSubCategoriesChecked.indexOf(
      currentSubCategoryChecked
    );

    if (indexFound2 === -1) {
      // add
      updatedSubCategoryIds = [...subcategoryIds, currentSubCategoryChecked];
      setSubCategoryIds(updatedSubCategoryIds);
    } else {
      // remove
      updatedSubCategoryIds = [...subcategoryIds];
      updatedSubCategoryIds.splice(indexFound2, 1);
      setSubCategoryIds(updatedSubCategoryIds);
    }
    dispatch(
      getProductsByFilter({
        type: "subcategory",
        query2: updatedSubCategoryIds,
      })
    );
  };

  const resetState2 = () => {
    setSubCategoryIds([]);
  };


  const handleBrands = (e) => {
    resetState3();

    const currentBrandChecked = e.target.value;

    const allBrandChecked = [...brandIds];

    const indexFound = allBrandChecked.indexOf(currentBrandChecked);

    if (indexFound === -1) {
      // add
      updatedBrandIds = [...brandIds, currentBrandChecked];
      setBrandIds(updatedBrandIds);
    } else {
      // remove
      updatedBrandIds = [...brandIds];
      updatedBrandIds.splice(indexFound, 1);
      setBrandIds(updatedBrandIds);
    }
    dispatch(
      getProductsByFilter({ type: "brand", query3: updatedBrandIds })
    );
  };

  const resetState3 = () => {
    setBrandIds([]);
  };

  return (
    <>
      <Header />
      {/* <!-- shop wrapper --> */}
      <div className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
        {/* <!-- sidebar --> */}
        {navbarState ? (
          <div className="col-span-1 bg-white px-4 pt-4 pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
            <div className="divide-gray-200 divide-y space-y-5 relative">
              {/* <!-- category filter --> */}
              <div className="relative">
                <div className="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer">
                  <i onClick={changeHandler} className="fa fa-times"></i>
                </div>
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  Categories
                </h3>
                <div className="space-y-2">
                  {/* <!-- single category --> */}
                  {loadingcategory ? (
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="6"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  ) : errorcategory ? (
                    <Message severity="error">{errorcategory}</Message>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="category"
                            value={category.id}
                            checked={categoryIds.includes(category.id)}
                            onChange={handleCategory}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                          />
                          <label
                            for="Bedroom"
                            className="text-gray-600 ml-3 cursor-pointer"
                          >
                            {category.name}
                          </label>
                          <div className="ml-auto text-gray-600 text-sm">
                            (15)
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {/* <!-- single category end -->*/}
                </div>
              </div>
              {/* <!-- category filter end -->*/}

              {/* <!-- subcategory filter --> */}
              <div className="relative">
                <div className="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer">
                  <i onClick={changeHandler} className="fa fa-times"></i>
                </div>
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  SubCategories
                </h3>
                <div className="space-y-2">
                  {/* <!-- single category --> */}

                  {loadingSubcategories ? (
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="6"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  ) : errorSubcategories ? (
                    <Message severity="error">{errorSubcategories}</Message>
                  ) : (
                    <>
                      {subcategories.map((subcategory) => (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={subcategory.name}
                            name="subcategory"
                            value={subcategory.id}
                            checked={subcategoryIds.includes(subcategory.id)}
                            onChange={handleCategory2}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                          />
                          <label
                            for="Bedroom"
                            className="text-gray-600 ml-3 cursor-pointer"
                          >
                            {subcategory.name}
                          </label>
                          <div className="ml-auto text-gray-600 text-sm">
                            (15)
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {/* <!-- single category end -->*/}
                </div>
              </div>
              {/* <!-- category filter end -->*/}

              {/* !-- brand filter --> */}
              <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  Brands
                </h3>
                <div className="space-y-2">
                  {/* <!-- single brand name --> */}
                  {loadingBrand ? (
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="6"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  ) : errorBrand ? <>{errorBrand}</> : (
                    <>
                    {brands.map((brand) =>
                    <div className="flex items-center" key={brand.id}>
                    <input 
                      type="checkbox" 
                      id={brand.id}
                      name="brand"
                            value={brand.id}
                            checked={brandIds.includes(brand.id)}
                            onChange={handleBrands}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label
                      for="Dominik"
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      {brand.brand}
                    </label>
                    <div className="ml-auto text-gray-600 text-sm">(15)</div>
                  </div>
                    )}
                  
                  </>)}
                  
                </div>
              </div>
              {/* <!-- brand filter end -->
        <!-- price filter --> */}
              <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  Price
                </h3>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="min"
                  />
                  <span className="mx-3 text-gray-500">-</span>
                  <input
                    type="text"
                    className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="mix"
                  />
                </div>
              </div>
              {/* <!-- price filter end -->*/}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* <!-- sidebar end --> */}

        {/* <!-- products --> */}
        <div className="col-span-3">
          {/* <!-- sorting --> */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={changeHandler}
              className="bg-primary border border-primary text-white px-10 py-3 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition lg:hidden text-sm mr-3 focus:outline-none"
            >
              Filter
            </button>
            <select className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary  focus:border-primary">
              <option>Default sorting</option>
              <option>Price low-high</option>
              <option>Price high-low</option>
              <option>Latest product</option>
            </select>
          </div>
          {/* <!-- sorting end -->
    <!-- product wrapper --> */}
          {loading ? (
            <center>
              {" "}
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            </center>
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : (
            <>
              <ShopComponent products={products} />
            </>
          )}
          {/* // <!-- product wrapper end --> */}
        </div>
        {/* // <!-- products end --> */}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
