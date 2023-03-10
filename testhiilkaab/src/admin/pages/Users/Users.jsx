import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../../../actions/userActions";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Users = () => {
  const onClickFn = () => {};
  const { currentColor } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this user")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Users"
      />
      <div className="flex justify-center w-full pb-5">
        <form className="w-full xl:max-w-xl max-w-lg flex relative" >
          <input
            type="text"
            className="pl-12 w-full border border-r-0 border-primary py-3 px-3 rounded-l-md focus:ring-primary focus:border-primary"
            placeholder="search"
            // onChange={(e) => setKeyword(e.target.value)}
          />
          <button
          type="submit"
            className="bg-primary border border-primary text-primary px-8 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition"
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <center>
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </center>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
        <div className="table-responsive " style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <td>NAME</td>
                <td>EMAIL</td>
                <td>PHONE</td>
                <td>ADMIN</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.phone}
                  </td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>
                    <Link
                    to={`/edituser/${user._id}`}
                    >
                      <button className="text-primary">
                        <MdModeEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteHandler(user._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
