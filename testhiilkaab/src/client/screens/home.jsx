import React, { useEffect } from "react";
import slide from "../../data/images/HIILKAABCOM.png";
import slide2 from "../../data/images/HIILKAAB4.png";
import slide3 from "../../data/images/HIILKAAB3.png";
import offer from "../../data/images/offer.jpg";
import Header from "../components/Header";
import product1 from "../../data/product4.jpg";
import Footer from "../components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbDiscount } from "react-icons/tb";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import CategoriesSlider from "../components/CategoriesSlider";
import { listDisProducts, listProducts } from "../../actions/prodcutActions";
import SinglProduct from "../components/SinglProduct";
import { listSubCategories } from "../../actions/subCategoryActions";
import TopRanking from "../components/TopRanking";
import { listTopCategories } from "../../actions/topCategoriesActions";
import TopRanking2 from "../components/TopRanking2";
import TopRanking3 from "../components/TopRanking3";
import TopRanking4 from "../components/TopRanking4";
import { listSlides } from "../../actions/slideActions";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingcategory,
    error: errorcategory,
    categories,
  } = categoryList;

  const slideList = useSelector((state) => state.slideList);
  const {
    // loading:loadingSlider, error:errorSlider,
    slides,
  } = slideList;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const producDistList = useSelector((state) => state.producDistList);
  const {
    loading: loadingDis,
    error: errorDis,
    products: productsDis,
  } = producDistList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const {
    loading: loadingSubcategories,
    error: errorSubcategories,
    subcategories,
  } = subcategoryList;

  const categoryTopList = useSelector((state) => state.categoryTopList);
  const { topcategories } = categoryTopList;

  useEffect(() => {
    dispatch(listSlides());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listDisProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(listSubCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listTopCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="lg:flex lg:container lg:gap-1 pb-16">
        <div class="absolute left-0 top-full   lg:relative w-[60%] bg-white shadow-md py-3 lg:visible invisible  group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
          <>
            {loadingcategory ? (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            ) : errorcategory ? (
              <Message variant="danger">{errorcategory}</Message>
            ) : (
              <>
                {categories.map((category) => (
                  <Link
                    to={`/shop/${category.id}`}
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img src={category.icon} class="w-6 h-5 object-contain" />
                    <span class="ml-6 text-gray-600 text-sm">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </>
            )}
          </>
        </div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#E49A38",
            "--swiper-navigation-size": "35px",
          }}
          spaceBetween={100}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  "
        >
          {slides.map((slide) => (
            <SwiperSlide>
              <img
                className="object-fill w-full h-[100%]"
                src={slide.image && slide.image}
                alt="image slide 1"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container pb-16 ">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 uppercase mb-6">
          Top Raking
        </h2>
        {topcategories.map((top) => (
          <div className="lg:flex lg:justify-between">
            <div className="grid grid-cols-2  lg:gap-8 gap-2">
              <div>
                <h2 className="text-base font-medium text-gray-800 uppercase mb-6">
                  {top.category1.name}
                </h2>
                <TopRanking id={top.category1} />
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-800 uppercase mb-6">
                  {top.category2.name}
                </h2>

                <TopRanking2 id={top.category2} />
              </div>
            </div>
            <div className="grid grid-cols-2  lg:gap-8 gap-2">
              <div>
                <h2 className="text-base font-medium text-gray-800 uppercase mb-6">
                  {top.category3.name}
                </h2>
                <TopRanking3 id={top.category3} />
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-800 uppercase mb-6">
                  {top.category4.name}
                </h2>

                <TopRanking4 id={top.category4} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- top new arrival --> */}
      <div className="container pb-16 pt-12">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 uppercase mb-6">
          Discounted Products
        </h2>
        {/* <!-- product wrapper --> */}
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
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <SinglProduct products={productsDis} />
          </>
        )}
        {/* <!-- product wrapper end --> */}
      </div>
      {/* <!-- top new arrival end --> */}

      {/* <!-- ad section --> */}
      <div className="container relative">
        <img src={offer} className="w-full" />

        <button className="btn text-base top-1/4  right-1/3  lg:top-1/2 lg:right-1/2  py-2 lg:px-12 px-1 bg-primary text-white border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
          Shop Now
        </button>
      </div>
      <div className="p-10"></div>
      {/* <!-- ad section end --> */}

      {/* <!-- recomended for you --> */}
      <div className="container pb-16">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 uppercase mb-6">
          recomended for you
        </h2>
        {/* <!-- product wrapper --> */}
        {loadingcategory ? (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        ) : errorcategory ? (
          <Message variant="danger">{errorcategory}</Message>
        ) : (
          <>
            <SinglProduct products={products} />
          </>
        )}
      </div>
      {/* <!-- recomended for you end --> */}

      {/* <!-- footer --> */}
      <Footer categories={categories} subcategories={subcategories} />

      {/* <!-- footer end --> */}
    </>
  );
};

export default Home;

// {/* <!-- banner --> */}
// <div className="bg-cover bg-no-repeat bg-center py-36 relative" style={{backgroundImage: `url(${banner})`}}>
// <div className="container">
//     {/* <!-- banner content --> */}
//     <h1 className="xl:text-6xl md:text-5xl text-4xl text-gray-800 font-medium mb-4">
//         Best Collection For <br className="hidden sm:block"/> Home Decoration
//     </h1>
//     <p className="text-base text-gray-600 leading-6">
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa <br className="hidden sm:block"/>
//         assumenda aliquid inventore nihil laboriosam odio
//     </p>
//     {/* <!-- banner button --> */}
//     <div className="mt-12">
//         <a to="/shop" className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md uppercase hover:bg-transparent
//        hover:text-primary transition">
//             Shop now
//         </a>
//     </div>
//     {/* <!-- banner button end -->
//     <!-- banner content end --> */}

// {/* <!-- features --> */}

// {/* <!-- categories --> */}

// </div>
// </div>
// {/* <!-- banner end --> */}
