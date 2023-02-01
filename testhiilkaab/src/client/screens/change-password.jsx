import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../actions/userActions";
import { USER_PASSWORD_UPDATE_RESET } from "../../constants/userConstants";
import Header from "../components/Header";
import HomeSidebar from "../components/HomeSidebar";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isVisible, setVisible] = useState(true);

  const toggle = () => {
    setVisible(!isVisible);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading:loadingUpdate, error:errorUpdate, success } = userUpdatePassword;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || success) {
        dispatch({ type: USER_PASSWORD_UPDATE_RESET });
       
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserPassword({ id: user._id, password }));
    }
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
            <h3 class="text-lg font-medium capitalize mb-4">Change password</h3>
            {message && <Message severity="error">{message}</Message>}
            {error && <Message severity="error">{error}</Message>}
          {errorUpdate}
            {loading && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {success && <Message severity="success">Password Updated</Message>}
            <div class="space-y-4 max-w-sm">
              <div>
                <label class="text-gray-600 mb-2 block">New Password</label>
                <div class="relative">
                  <span class="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                   
                      <i onClick={toggle} class="fa fa-eye-slash"></i>
                   
                  </span>
                  <input
                    type={isVisible ? "password" : "text"}
                    class="input-box"
                    placeholder="enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-gray-600 mb-2 block">Confirm Password</label>
                <div class="relative">
                  <span class="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                    
                      <i onClick={toggle} class="fa fa-eye-slash"></i>
                    
                  </span>
                  <input
                    type={isVisible ? "password" : "text"}
                    class="input-box"
                    placeholder="enter confirm password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
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
    </>
  );
};

export default ChangePassword;
