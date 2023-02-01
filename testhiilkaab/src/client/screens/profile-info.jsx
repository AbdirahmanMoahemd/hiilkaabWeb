import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import Footer from "../components/footer";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";

const ProfileInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setStreet(user.street);
        setCity(user.city);
        setCountry(user.country);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        phone,
        street,
        city,
        country,
      })
    );
  };

  return (
    <>
      <Header />
      {/* <!-- account wrapper --> */}
      <div class="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <HomeSidebar />
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        <div class="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
          <form onSubmit={submitHandler}>
            <h3 class="text-lg font-medium capitalize mb-4">
              Profile Information
            </h3>
            {loading && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {error && <Message severity="error">{error}</Message>}
            {success && <Message severity="success">Profile Updated</Message>}
            <div class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 mb-2 block">Name</label>
                  <input
                    value={name}
                    type="text"
                    class="input-box"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block">Email Address</label>
                  <input
                    value={email}
                    type="text"
                    class="input-box"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 mb-2 block">Street</label>
                  <input
                    type="text"
                    class="input-box"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block">City</label>
                  <input
                    type="text"
                    class="input-box"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 mb-2 block">Country</label>
                  <input
                    type="text"
                    class="input-box"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block">Phone Number</label>
                  <input
                    type="number"
                    class="input-box"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="px-6 py-2 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Save change
              </button>
            </div>
          </form>
        </div>
        {/* <!-- account content end --> */}
      </div>
      {/* <!-- account wrapper end --> */}

      <Footer />
    </>
  );
};

export default ProfileInfo;
