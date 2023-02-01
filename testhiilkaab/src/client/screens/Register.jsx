import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import Header from "../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import { register } from "../../actions/userActions";
import { Message } from "primereact/message";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState(null);
  const [isVisible, setVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setVisible(!isVisible);
  };

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    if (password !== confirmpassword) {
      setMessage("Passwords do Not Match");
    } else {
      dispatch(register(name, email, password, phone, street,  city, country));
    }
  };

  return (
    <>
      <Header />

      {/* <!-- form wrapper --> */}
      <div className="container py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">create an acocunt</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register here if you don't have account
          </p>
          {message && <Message severity='error' sticky='true'>{message}</Message>}
          {error && <Message severity="error" text={error} />}
          {loading && (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  className="input-box"
                  placeholder="example@mail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  type={isVisible ? "password" : "text"}
                  className="input-box"
                  placeholder="type password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Confirm Password
                  <span className="text-primary">*</span>
                </label>
                <input
                  type={isVisible ? "password" : "text"}
                  className="input-box"
                  placeholder="confirm your password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="pt-3">
                <input type="checkbox" onChange={toggle}/><span className="pl-2">Show Password</span>
                </div>
                <div></div>
                <div></div>
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Enter your phone
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  className="input-box"
                  placeholder="enter your phone"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Street
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="enter your street"
                  required
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  City
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="enter your city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Country <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Country"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label for="agreement" className="text-gray-600 ml-3 cursor-pointer">
                I have read and agree to the
                <a href="/register" className="text-primary">
                  terms & conditions
                </a>
              </label>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                create account
              </button>
            </div>
          </form>
          {/* <!-- login with social --> */}
          <div className="mt-6 flex justify-center relative">
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
              OR SINGUP IN WITH
            </div>
          </div>

          {/* <!-- login with social end --> */}
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}className="text-primary">
              Login Now
            </Link>
          </p>
        </div>
      </div>
      {/* <!-- form wrapper end --> */}

      <Footer />
    </>
  );
};

export default Register;
