import React from 'react'
import hiilkaab from "../../data/images/hiilkaab.jpg";

const Footer = ({categories, subcategories}) => {
  return (
    <>
    <footer className="bg-primary pt-16 pb-12 border-t border-gray-100">
        <div className="container">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                {/* <!-- footer text --> */}
                <div className="space-y-8 xl:col-span-1">
                    <img className="lg:w-20 w-12 bg-white" src={hiilkaab} alt="HIILKAAB"/>
                    <p className="text-white text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio facere rem
                    </p>
                    <div className="flex space-x-6">
                        <a target="_blank" href="https://www.facebook.com/Hiilkaab.RetailCompany" className="text-white hover:text-white">
                            <i className="fa fa-facebook-f"></i>
                        </a>
                        <a target="_blank" href="#" className="text-white hover:text-white">
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
                            <div className="mt-4 space-y-4">
                                {/* {categories.map(category =>(
                                     <a href="#" className="text-base text-white hover:text-white block">
                                     {category.name}
                                 </a>
                                ))} */}
                               
                            </div>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                            SubCategories
                            </h3>
                            <div className="mt-4 space-y-4">
                            {/* {subcategories.map(subcategory =>(
                                     <a href="#" className="text-base text-white hover:text-white block">
                                     {subcategory.name}
                                 </a>
                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                                Contact Us
                            </h3>
                            <div className="mt-4 space-y-4">
                                <a href="#" className="text-base text-white hover:text-white block">
                                    About
                                </a>
                                <a href="#" className="text-base text-white hover:text-white block">
                                    Blog
                                </a>
                                <a href="#" className="text-base text-white hover:text-white block">
                                    Jobs
                                </a>
                                <a href="#" className="text-base text-white hover:text-white block">
                                    Press
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
  )
}

export default Footer