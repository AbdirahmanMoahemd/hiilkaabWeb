import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { FaProductHunt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";


const Ecommerce = () => {
  const { currentColor } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };
  

  return (
    <div className="mt-14">
      <div className="flex flex-wrap lg:flex-nowrap justify-between m-10">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Categories</p>
              <p className="text-2xl">4</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            > 
              <BiCategoryAlt />
            </button>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Products</p>
              <p className="text-2xl">38</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <FaProductHunt />
            </button>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
      </div>
      <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Recent Orders" />
      <div className="table-responsive " style={{overflowX:"auto"}}>
                                        <table className="table" >
                                    <thead>
                                        <tr>
                                            <td>NAME</td>
                                            <td>CATEGORY</td>
                                            <td>SUB CATEGORY</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>isDISCOUNTED</td>
                                            <td>NEW PRICE</td>
                                            <td>isFEATURED</td>
                                            <td>STOCK</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>NAME</td>
                                            <td>CATEGORY</td>
                                            <td>SUB CATEGORY</td>
                                            <td>IMAGE</td>
                                            <td>PRICE</td>
                                            <td>isDISCOUNTED</td>
                                            <td>NEW PRICE</td>
                                            <td>isFEATURED</td>
                                            <td>STOCK</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
      </div>
    </div>
  );
};

export default Ecommerce;
