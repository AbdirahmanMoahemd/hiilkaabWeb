import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listSlides } from "../../../actions/slideActions";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Sliders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slideList = useSelector((state) => state.slideList);
  const { loading, error, slides } = slideList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listSlides());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

 

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Sliders"
      />
      {loading ? (
        <ProgressSpinner
          style={{ width: "20px", height: "20px" }}
          strokeWidth="6"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="lg:flex lg:justify-around ">
          {slides.map((slide) => (
            <div className="w-60 mb-2  bg-gray-100 p-2" key={slide.id}>
              <div className="relative  group rounded-sm overflow-hidden">
                <img
                  src={slide.image && slide.image}
                  className="w-full h-36"
                  alt="slider"
                />
              </div>
              <div className="flex mt-4 justify-around lg:text-2xl">
                <Link to={`/updateSlider/${slide._id}`}>
                  <button className="text-primary">
                    <MdModeEdit />
                  </button>
                </Link>
              </div>
            </div>
          ))}
          </div>
      )}
    </div>
  );
};

export default Sliders;
