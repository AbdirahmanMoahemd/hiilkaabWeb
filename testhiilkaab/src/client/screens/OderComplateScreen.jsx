import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import complete from "../../data/complete.png";
import Header from "../components/Header";

const OderComplateScreen = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Header />
      <div class="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
        <div class="mb-8">
          <img src={complete} class="w-16 inline-block" />
        </div>
        <h2 class="text-gray-800 font-medium text-3xl mb-3">
          Hello {userInfo.name}
        </h2>
        <h2 class="text-gray-800 font-medium text-3xl mb-3">
          YOUR ORDER IS COMPLETED!
        </h2>
        <p class="text-gray-600 ">
          Thank you for your order! We’re happy to let you know that we’ve received your order
        </p>
        <p class="text-gray-600 ">
        If you have any questions, contact us here or call us on +252610872270
        </p>
        <p class="text-gray-600 ">
        We are here to help!
        </p>
        <div class="mt-10">
          <Link
            to={'/'}
            class="bg-primary border border-primary text-white px-6 py-3 font-medium rounded-md uppercase hover:bg-transparent
         hover:text-primary transition text-center"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default OderComplateScreen;
