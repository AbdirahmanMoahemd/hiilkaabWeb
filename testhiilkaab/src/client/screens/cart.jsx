import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";


const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const itemquantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      {/* <!-- cart wrapper --> */}
      {/* <!-- breadcrum --> */}
    <div class="py-4 container flex gap-3 items-center">
        <Link to="/" class="text-primary text-base">
            <i class="fa fa-home"></i>
        </Link>
        <span class="text-sm text-gray-400"><i class="fa fa-chevron-right"></i></span>
        <p class="text-gray-600 font-medium uppercase">SHOPPING CART</p>
    </div>
    {/* <!-- breadcrum end --> */}
      {cartItems.length === 0 ? (
          <div className="w-full h-96 p-20">
          <Message severity="info" className="w-full" text="Your cart is empty"></Message>
          <div style={{ marginTop: "8px",  textDecoration: "underline" }} className='flex justify-center'>
            <Link to="/">Go Back</Link>
          </div>
        </div>
        ) : (
      <div className="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
            <div className="xl:col-span-9 lg:col-span-8">
              {/* <!-- cart title --> */}
              <div className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
                <p className="text-gray-600 text-center">Product</p>
                <p className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">
                  Quantity
                </p>
                <p className="text-gray-600 text-center">Total</p>
              </div>
              {/* <!-- cart title end --> */}
              {cartItems.map((item) => (
                <div className="space-y-4">
                  {/* <!-- single cart --> */}
                  <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
                    {/* <!-- cart image --> */}
                    <div className="w-32 flex-shrink-0">
                      <img
                        src={item.images && item.images[0]}
                        className="h-24"
                      />
                    </div>
                    {/* <!-- cart image end --> */}
                    {/* <!-- cart content --> */}
                    <div className="md:w-1/3 w-full">
                      <h2 className="text-gray-800 mb-3 xl:text-xl textl-lg font-medium uppercase">
                        {item.name}
                      </h2>
                      <p className="text-primary font-semibold">
                        ${item.price}
                      </p>
                    </div>
                    {/* <!-- cart content end --> */}
                    {/* <!-- cart quantity --> */}
                    <div className="">
                      <InputNumber
                      className="w-20"
                        value={item.quantity}
                        style={{ marginRight: "30px" , width: '6em'}}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-danger"
                        incrementButtonClassName="p-button-success"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        max={item.countInStock}
                        min="1"
                        onValueChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      />
                    </div>
                    {/* <!-- cart quantity end --> */}
                    <div className="ml-auto md:ml-0">
                      <p className="text-primary text-lg font-semibold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                    <div className="text-gray-600 hover:text-primary cursor-pointer">
                      <i
                        className="fa fa-trash"
                        onClick={() => removeFromCartHandler(item.product)}
                      ></i>
                    </div>
                  </div>
                  {/* <!-- single cart end --> */}
                </div>
              ))}
              {/* <!-- shipping carts end --> */}
            </div>
          
        {/* <!-- product cart end --> */}
        {/* <!-- order summary --> */}
        <div className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            ORDER SUMMARY
          </h4>
          <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
          <div className="flex justify-between">
              <p>Items</p>
              <p>{itemquantity}X</p>
            </div>
            <div className="flex justify-between font-medium">
              <p>Subtotal</p>
              <p>${cartItems.reduce((acc, item) =>  (acc + item.quantity * item.price), 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>Free</p>
            </div>
           
          </div>
          <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
            <h4>Total</h4>
            <h4>${cartItems.reduce((acc, item) =>  (acc + item.quantity * item.price), 0).toFixed(2)}</h4>
          </div>

          {/* <!-- checkout --> */}
          <Link to="/checkout">
            <a
              className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
             hover:text-primary transition text-sm w-full block text-center"
            >
              Process to checkout
            </a>
          </Link>
          {/* <!-- checkout end --> */}
        </div>
        
        {/* <!-- order summary end --> */}
      </div>
        )}
      {/* <!-- cart wrapper end --> */}

      <Footer />
    </>
  );
};

export default Cart;
