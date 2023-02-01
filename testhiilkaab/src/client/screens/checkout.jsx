import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../actions/cartActions";
import Footer from "../components/footer";
import Header from "../components/Header";
import { getUserDetails } from "../../actions/userActions";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [index, setIndex] = useState();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const itemqty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  const paymentList = [
    { value: "EVC-PLUS", indx: 1 },
    { value: "ZAAD SERVICES", indx: 2 },
    { value: "SAHAL", indx: 3 },
    { value: "CASH ON DEVLIVERY", indx: 4 },
  ];
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        if (!shippingAddress.address) {
          setAddress(user.street, user.apartment);
          setPhoneNumber(user.phone);
          setCity(user.city);
          setCountry(user.country);
        }
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  };

  return (
    <>
      <Header />
      {/* <!-- checkout wrapper --> */}
      {/* <!-- breadcrum --> */}
    <div class="py-4 container flex gap-3 items-center">
        <Link to="/" class="text-primary text-base">
            <i class="fa fa-home"></i>
        </Link>
        <span class="text-sm text-gray-400"><i class="fa fa-chevron-right"></i></span>
        <p class="text-gray-600 font-medium uppercase">checkout</p>
    </div>
    {/* <!-- breadcrum end --> */}
      <div class="container  pb-16 pt-4">
        {/* <!-- checkout form --> */}
        <div class="border border-gray-200 px-4 py-4 rounded">
          <form onSubmit={submitHandler}>
            <h3 class="text-lg font-medium capitalize mb-4">
              Shipping Address
            </h3>

            <div class="space-y-4">
              <div >
                <div>
                  <label class="text-gray-600 mb-2 block">
                    Address <span class="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    class="input-box"
                    value={address}
                    placeholder="Address"
                    name="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-gray-600 mb-2 block">
                  Phone Number<span class="text-primary">*</span>
                </label>
                <input
                  type="number"
                  class="input-box"
                  value={phoneNumber}
                  placeholder="Enter Country code + Phone Number"
                  name="phoneNumber"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label class="text-gray-600 mb-2 block">
                  City<span class="text-primary">*</span>
                </label>
                <input
                  type="text"
                  class="input-box"
                  value={city}
                  placeholder="City"
                  name="city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label class="text-gray-600 mb-2 block">
                  County/Region <span class="text-primary">*</span>
                </label>
                <input
                  type="text"
                  class="input-box"
                  value={country}
                  placeholder="Country"
                  name="country"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div class="space-y-4 pt-6">
              <h3 class="text-lg font-medium capitalize mb-4">
                Choose Your Payment Method
              </h3>
              <div>
                {paymentList.map((pay) => (
                  <div>
                    <input
                      value={pay.value}
                      type="radio"
                      name="payment"
                      required
                      id="defaultUnchecked"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        setIndex(pay.indx);
                      }}
                    />
                    <span className="pl-2">{pay.value}</span>
                  </div>
                ))}
              </div>
              <button className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
             hover:text-primary transition text-sm w-full block text-center">Place Order</button>
            </div>
          </form>
        </div>
        {/* <!-- checkout form end --> */}
      </div>
      {/* <!-- checkout wrapper end --> */}

      <Footer />
    </>
  );
};

export default Checkout;
