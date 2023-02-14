import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategories } from "../../actions/categoryActions";
import { listsettings } from "../../actions/settingsActions";
import { listSubCategories } from "../../actions/subCategoryActions";
import hiilkaab from "../../data/images/hiilkaab.jpg";

const Footer = () => {
  const dispatch = useDispatch();

  const settingsList = useSelector((state) => state.settingsList);
  const {
    loading: loadingsettings,
    error: errorsettings,
    settings,
  } = settingsList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { loading, error, subcategories } = subcategoryList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingcategory,
    error: errorcategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listSubCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listsettings());
  }, [dispatch]);

  return (
    <>
      <footer className="bg-primary pt-16 pb-12 border-t border-gray-100">
        <div className="container">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* <!-- footer text --> */}
            <div className="space-y-8 xl:col-span-1">
              <img
                className="lg:w-20 w-12 bg-white"
                src={hiilkaab}
                alt="HIILKAAB"
              />
              {settings.map(setting => (
              <p className="text-white text-base">
                {setting.about}
              </p>))}
              <div className="flex space-x-6">
                <a
                  target="_blank"
                  href="https://www.facebook.com/Hiilkaab.RetailCompany"
                  className="text-white hover:text-white"
                >
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a
                  target="_blank"
                  href="#"
                  className="text-white hover:text-white"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            {/* <!-- footer text end -->
                <!-- footer links --> */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                    Categories
                  </h3>
                  {loadingcategory ? (
                    <div className="mt-4 space-y-4">
                      <a href="#" className="text-base text-white  block">
                        Office Shirt
                      </a>
                      <a href="#" className="text-base text-white  block">
                        Mobiles
                      </a>
                      <a href="#" className="text-base text-white  block">
                        Camera
                      </a>
                      <a href="#" className="text-base text-white  block">
                        Computers
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 space-y-4">
                        {categories.map((category) => (
                          <Link
                            to={`/shop/${category.id}`}
                            className="text-base text-white hover:text-white block"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                    SubCategories
                  </h3>
                  <div className="mt-4 space-y-4">
                    {loading ? (
                      <div className="mt-4 space-y-4">
                        <a
                          href="#"
                          className="text-base text-white hover:text-gray-900 block"
                        >
                          Office Shirt
                        </a>
                        <a
                          href="#"
                          className="text-base text-white hover:text-gray-900 block"
                        >
                          Mobiles
                        </a>
                        <a
                          href="#"
                          className="text-base text-white hover:text-gray-900 block"
                        >
                          Camera
                        </a>
                        <a
                          href="#"
                          className="text-base text-white hover:text-gray-900 block"
                        >
                          Computers
                        </a>
                      </div>
                    ) : (
                      <>
                        {subcategories.map((subcategory) => (
                          <a
                            href="#"
                            className="text-base text-white hover:text-white block"
                          >
                            {subcategory.name}
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                    Contact Us
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Link
                      to={'/about'}
                      className="text-base text-white hover:text-white block"
                    >
                      About
                    </Link>
                    <a
                      href="#"
                      className="text-base text-white hover:text-white block"
                    >
                      Call us: {" "}
                      {settings.map((setting) => (
                        <>{setting.phoneNumber}</>
                      ))}
                    </a>
                    <a
                      href="#"
                      className="text-base text-white hover:text-white block"
                    >
                      info.hiilkaab@gmail.com
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- footer links end --> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
