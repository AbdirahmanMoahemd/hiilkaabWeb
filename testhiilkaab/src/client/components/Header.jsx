import React, { useEffect, useState } from "react";
import hiilkaab from "../../data/images/hiilkaab.jpg";
import { Link, Route, useNavigate } from "react-router-dom";
import { useStateContext } from "../../admin/contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import SearchBox from "./SearchBox";
import { listCategories } from "../../actions/categoryActions";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const Header = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [navbarState, setNavbarState] = useState(false);
  const [categoryState, setCategory] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };


  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, userInfo]);

  const changeHandler = () => {
    window.scrollTo(0, 0);
    if (searchState == true) {
      setSearchState(false);
      setCategory(false);
    }
    setNavbarState(!navbarState);
  };
  const changeSearchHandler = () => {
    window.scrollTo(0, 0);
    if (categoryState == true) {
      setNavbarState(false);
      setCategory(false);
    }
    setSearchState(!searchState);
  };

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingcategory,
    error: errorcategory,
    categories,
  } = categoryList;

  const changeCategoryHandler = () => {
    window.scrollTo(0, 0);
    if (categoryState == true) {
      setNavbarState(false);
      setSearchState(false);
    }
    setCategory(!searchState);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

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
    if (windowSize.innerWidth > 900) {
      setNavbarState(false);
      setSearchState(false);
    }
  }, [windowSize]);

  const { setMode, currentMode, setCurrentMode } = useStateContext();

  const toChangeLigth = () => {
    if (currentMode === "Dark") {
      setCurrentMode("Light");
      localStorage.setItem("themeMode", currentMode);
    }
  };
  const toChangeDark = () => {
    if (currentMode === "Light") {
      setCurrentMode("Dark");
      localStorage.setItem("themeMode", currentMode);
    }
  };

  return (
    <>
      {/* <!-- header --> */}
      <header className="py-2  shadow-sm bg-pink-100 lg:bg-white">
        <div className="container flex items-center justify-between">
          {/* <!-- logo --> */}
          <a href="/" className="block lg:w-28 w-12">
            <img src={hiilkaab} alt="logo" className="w-full" />
          </a>
          {/* <!-- logo end --> */}

          {/* <!-- searchbar --> */}
          <SearchBox />
          {/* <!-- searchbar end -->

            <!-- navicons --> */}
          <div className="space-x-4 flex items-center">
            <Link to="/wishlist">
              <a className="block text-center text-gray-700 hover:text-primary transition relative">
                <span className="absolute -right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  {wishlistItems.length}
                </span>
                <div className="text-2xl">
                  <i className="fa fa-heart"></i>
                </div>
                <div className="text-xs leading-3">Wish List</div>
              </a>
            </Link>
            <Link
              to="/cart"
              className="lg:block text-center text-gray-700 hover:text-primary transition hidden relative"
            >
              <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cartItems.length}
              </span>
              <div className="text-2xl">
                <i className="fa fa-shopping-bag"></i>
              </div>
              <div className="text-xs leading-3">Cart</div>
            </Link>
            <Link to="/account">
              <a className="block text-center text-gray-700 hover:text-primary transition">
                <div className="text-2xl">
                  <i className="fa fa-user"></i>
                </div>
                <div className="text-xs leading-3">Account</div>
              </a>
            </Link>
          </div>
          {/* <!-- navicons end --> */}
        </div>
      </header>
      {/* <!-- header end --> */}

      <nav className="bg-gray-800  hidden lg:block">
        <div className="container">
          <div className="flex">
            {/* <!-- all category --> */}
            <div className="px-8 py-4 bg-primary flex items-center cursor-pointer group relative">
              <span className="text-white">
                <i className="fa fa-bars"></i>
              </span>
              <span className="capitalize ml-2 text-white">All categories</span>
            </div>
            {/* <!-- all category end --> */}

            {/* <!-- nav menu --> */}
            <div className="flex items-center justify-between flex-grow pl-12">
              <div className="flex items-center space-x-6 text-base capitalize">
                <Link to="/"
                    className="text-gray-200 hover:text-white transition"
                  >
                    Home
                  
                </Link>
                <Link to="/shop"
                    className="text-gray-200 hover:text-white transition"
                  
                    >Shop
                 
                </Link>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-white transition"
                >
                  About us
                </Link>
                {userInfo && userInfo.isAdmin && (
                  <Link
                    to="/dashboard"
                    className="text-gray-200 hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
              <div className="flex items-center">
                {userInfo ? (
                  <Link
                    to="/"
                    className="ml-auto justify-self-end text-gray-200 hover:text-white transition"
                  >
                    {userInfo.name.split(" ")[0]}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="ml-auto justify-self-end text-gray-200 hover:text-white transition"
                  >
                    Login/Register
                  </Link>
                )}

                {currentMode === "Dark" ? (
                  <button
                    className="text-gray-100 pl-2"
                    value="Light"
                    onClick={toChangeLigth}
                  >
                    <MdDarkMode />
                  </button>
                ) : (
                  <button
                    className="text-gray-100 pl-2"
                    value="Dark"
                    onClick={toChangeDark}
                  >
                    <MdLightMode />
                  </button>
                )}
              </div>
            </div>
            {/* <!-- nav menu end --> */}
          </div>
        </div>
      </nav>

      {/* <!-- mobile menubar --> */}
      <div className="fixed w-full border-t   border-gray-200 shadow-sm bg-white py-3 bottom-0 left-0 right-0 flex justify-around items-start px-6 lg:hidden z-40">
        <i
          onClick={changeHandler}
          className="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl" id="menuBar">
            <i  className="fa fa-bars"></i>
          </div>
          <div className="text-xs leading-3">Menu</div>
        </i>
        <i
          
          onClick={changeCategoryHandler} 
          className="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <i className="fa fa-list-ul"></i>
          </div>
          <div className="text-xs leading-3">Category</div>
        </i>
        <i
           onClick={changeSearchHandler}
          className="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <i className="fa fa-search"></i>
          </div>
          <div className="text-xs leading-3">Search</div>
        </i>
        <Link
          to={"/cart"}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {cartItems.length}
          </span>
          <div className="text-2xl">
            <i className="fa fa-shopping-bag"></i>
          </div>
          <div className="text-xs leading-3">Cart</div>
        </Link>
      </div>
      {/* <!-- mobile menu end --> */}

      {/* <!-- mobile sidebar menu --> */}
      {navbarState ? (
        <div
          className={
            "fixed left-0 top-0 pb-30 w-full h-[5%] z-50 bg-black bg-opacity-30 shadow " +
            navbarState
              ? ""
              : "hidden"
          }
          id="mobileMenu"
        >
          <div className="absolute left-0 top-0 w-72 z-50  h-[90%] bg-white shadow">
            <div
              id="closeMenu"
              className="text-gray-400 hover:text-primary text-lg absolute right-3 top-3 cursor-pointer"
            >
              <i onClick={changeHandler} className="fa fa-times"></i>
            </div>
            {/* <!-- navlink --> */}
            <h3 className="text-xl font-semibold text-gray-700 mb-1 font-roboto pl-4 pt-4">
              Menu
            </h3>
            <div className="">
              <Link
                to={"/"}
                className="block px-4 py-2 font-medium transition hover:bg-gray-100"
              >
                Home
              </Link>
              <Link
                to={"/shop"}
                onClick={()=> setNavbarState(false)}
                className="block px-4 py-2 font-medium transition hover:bg-gray-100"
              >
                Shop
              </Link>
              <Link
                to={"/about"}
                onClick={()=> setNavbarState(false)}
                className="block px-4 py-2 font-medium transition hover:bg-gray-100"
              >
                About Us
              </Link>
              {userInfo && userInfo.isAdmin && (
                  <Link
                    to="/dashboard"
                    className="text-gray-200 hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                )}
            </div>
            {/* <!-- navlinks end --> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <!-- mobile sidebar menu end --> */}

      {categoryState ? (
        <div
          className={
            "fixed left-0 top-0 pb-30 w-full h-[5%] z-50 bg-black bg-opacity-30 shadow " +
            categoryState
              ? ""
              : "hidden"
          }
          id="mobileMenu"
        >
          <div className="absolute left-0 top-0 w-72 z-50  h-[90%] bg-white shadow">
            <div
              id="closeMenu"
              className="text-gray-400 hover:text-primary text-lg absolute right-3 top-3 cursor-pointer"
            >
              <i onClick={() => setCategory(false)} className="fa fa-times"></i>
            </div>
            {/* <!-- navlink --> */}
            <h3 className="text-xl font-semibold text-gray-700 mb-1 font-roboto pl-4 pt-4">
              Categories
            </h3>
            <div className="">
              {categories.map((category) =>(
                <Link
                to={`/shop/${category.id}`}
                className="block px-4 py-2 font-medium transition hover:bg-gray-100"
              >
                {category.name}
              </Link>
              ))}
              
            </div>
            {/* <!-- navlinks end --> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {searchState ? (
        <form
          onSubmit={submitHandler}
          className="absolute flex m-auto pl-4 pr-4 top-20 w-full h-[7%] z-50  shadow"
        >
          <input
            type="text"
            className="pl-12 w-full border border-r-0 border-primary py-2 px-2 rounded-l-md focus:ring-primary focus:border-primary"
            placeholder="search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={submitHandler}
            className="bg-primary border border-primary text-white px-3 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition"
          >
            Search
          </button>

          <div
            id="closeMenu"
            className="text-gray-600 hover:text-primary text-lg  right-3  cursor-pointer"
          >
            <i
              onClick={changeSearchHandler}
              className="fa fa-times py-3 pl-2 text-primary"
            ></i>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;

// {/* <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-200 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
//                 {/* <!-- single category --> */}
//                 <a
//                   href="/"
//                   className="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={bed} className="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Bedroom</span>
//                 </a>
//                 {/* <!-- single category end -->
//                         <!-- single category --> */}
//                 <a
//                   href="/"
//                   class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={sofa} class="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Sofa</span>
//                 </a>
//                 {/* <!-- single category end -->
//                         <!-- single category --> */}
//                 <a
//                   href="/"
//                   class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={office} class="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Office</span>
//                 </a>
//                 {/* <!-- single category end -->
//                         <!-- single category --> */}
//                 <a
//                   href="/"
//                   class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={terrace} class="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
//                 </a>
//                 {/* <!-- single category end --> */}
//                 {/* <!-- single category --> */}
//                 <a
//                   href="/"
//                   class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={bed2} class="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Mattress</span>
//                 </a>
//                 {/* <!-- single category end -->
//                         <!-- single category --> */}
//                 <a
//                   href="/"
//                   class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
//                 >
//                   <img src={restaurant} class="w-5 h-5 object-contain" />
//                   <span class="ml-6 text-gray-600 text-sm">Sofa</span>
//                 </a>
//                 {/* <!-- single category end --> */}
//               </div> */}
