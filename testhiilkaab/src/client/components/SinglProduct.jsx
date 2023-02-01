import React from 'react'
import { Link } from 'react-router-dom'
import hiilkaab from "../../data/images/hiilkaab.jpg";

const SinglProduct = ({products}) => {
  return (
    <>
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
          {/* <!-- single product --> */}

          {products.map((product) => (
          <div className="group rounded bg-white shadow overflow-hidden">
            {/* <!-- product image --> */}
            <div className='flex items-center justify-center'>
            <div className="relative">
              <div className='w-40 h-40 '>
              <img src={product.images ? product.images[0] : hiilkaab} className="w-full h-full" />
              </div>
              <div className="absolute inset-0  h-40 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <Link
                  to="/"
                  className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                >
                  <i className="fa fa-search"></i>
                </Link>
                <Link
                  to="/"
                  className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                >
                  <i className="fa fa-heart"></i>
                </Link>
              </div>
            </div>
            </div>
            {/* <!-- product image end -->
                <!-- product content --> */}
            <div className="pt-4 pb-3 px-4">
              <Link to={`/product/${product.id}`}>
                <h4 className="uppercase font-medium text-base lg:text-lg mb-2 text-gray-800 hover:text-primary transition">
                  {product.name}
                </h4>
              </Link>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-roboto font-semibold">
                 ${product.price}
                </p>
                <p className="text-sm text-gray-400 font-roboto line-through">
                  ${product.newPrice}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150)</div>
              </div>
            </div>
            {/* <!-- product content end -->
                <!-- product button --> */}
            <Link
              to={`/product/${product.id}`}
              className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to Cart
            </Link>
            {/* <!-- product button end --> */}
          </div>
           ))}
        </div>
    </>
  )
}

export default SinglProduct