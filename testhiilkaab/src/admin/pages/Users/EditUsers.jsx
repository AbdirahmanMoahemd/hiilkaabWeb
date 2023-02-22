import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, UpdUser } from "../../../actions/userActions";
import { USER_UPD_RESET } from "../../../constants/userConstants";
import { Header } from "../../components";

const EditUsers = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpd = useSelector((state) => state.userUpd);
  const { loading: loadingUpd, error: errorUpd, success: successUpd } = userUpd;

  useEffect(() => {
    if (successUpd) {
      dispatch({ type: USER_UPD_RESET });
      navigate("/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, id, user, successUpd]);

  const submitHandler = (e) => {
    e.preventDefault();
    // // DISPACTH REGISTER
    console.log(isAdmin);

    dispatch(UpdUser({ _id: id, name, email, isAdmin }));

  };

  const isAdminToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="container">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="New User" />
      <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
        {loadingUpd && <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />}
        {errorUpd && <Message severity="error" text={errorUpd} />}
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
              <label className="text-gray-600 mb-2 block">Full Name</label>
              <label className="text-gray-600 mb-2 block">{name}</label>
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Email Address</label>

              <label className="text-gray-600 mb-2 block">{email}</label>
            </div>

            <br/>
            <br/>
            <div>
              <input
                value={isAdmin}
                type="checkbox"
                checked={isAdmin}
                onChange={isAdminToggle}
              />
              <span className="pl-2"> isAmin</span>
              <span className="pl-2"> {isAdmin ? 'yes' : 'no'}</span>
            </div>
           
          </div>

          <div className="mt-4 flex justify-center">
            <button
            type="submit"
            className="block  py-2 px-4 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
              Update
            </button>
          </div>
          
        </form>
      </div>
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default EditUsers;
