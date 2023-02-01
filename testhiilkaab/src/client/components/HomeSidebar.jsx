import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import avatar from '../../data/images/avatar.png';

const HomeSidebar = () => {
    const dispatch = useDispatch() 
    useEffect(()=>{

    },[dispatch])

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout())
         
    }
  return (
    <>
    <div className="col-span-3">
            {/* <!-- account profile --> */}
            <div className="px-4 py-3 shadow flex items-center gap-4">
                <div className="flex-shrink-0">
                    <img src={avatar} className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"/>
                </div>
                <div>
                    <p className="text-gray-600">Hello,</p>
                    <h4 className="text-gray-800 capitalize font-medium">{userInfo.name}</h4>
                </div>
            </div>
            {/* <!-- account profile end --> */}

            {/* <!-- profile links --> */}
            <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                {/* <!-- single link --> */}
                <div className="space-y-1 pl-8">
                    <Link to='/account'
                        className="relative text-base font-medium capitalize hover:text-primary transition block">
                        Manage account
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa fa-address-card"></i>
                        </span>
                    </Link>
                    <Link to="/profile" className="hover:text-primary transition capitalize block">Profile
                        information</Link>
                    {/* <Link to="/manag-address" className="hover:text-primary transition capitalize block">Manage
                        address</Link> */}
                    <Link to="/change-password" className="hover:text-primary transition capitalize block">change
                        password</Link>
                </div>
                {/* <!-- single link end --> */}
                {/* <!-- single link --> */}
                <div className="space-y-1 pl-8 pt-4">
                    <a href="#"
                        className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block">
                        My order history
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa fa-gift"></i>
                        </span>
                    </a>
                    <a href="#" className="hover:text-primary transition block capitalize">order history</a>
                   
                </div>
                {/* <!-- single link end --> */}
                {/* <!-- single link --> */}
                
                {/* <!-- single link end --> */}
                {/* <!-- single link --> */}
                <div className="pl-8 pt-4">
                    <a href="/wishlist"
                        className="relative medium capitalize font-medium hover:text-primary transition block text-primary">
                        my wishlist
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa fa-heart"></i>
                        </span>
                    </a>
                </div>
                {/* <!-- single link end --> */}
                {/* <!-- single link --> */}
                <div className="pl-8 pt-4">
                    <a href="#"
                        className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block">
                       <button onClick={logoutHandler}>logout</button> 
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa fa-sign-out-alt"></i>
                        </span>
                    </a>
                </div>
                {/* <!-- single link end --> */}
            </div>
            {/* <!-- profile links end --> */}
        </div>
    </>
  )
}

export default HomeSidebar