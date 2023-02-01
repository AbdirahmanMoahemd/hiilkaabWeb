import React from 'react'
import Header from '../components/Header';
import HomeSidebar from '../components/HomeSidebar';

const ManageAddress = () => {
  return (
    <>
    <Header/>
     {/* <!-- account wrapper --> */}
     <div class="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <HomeSidebar/>
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        <div class="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
            <form action="">
                <h3 class="text-lg font-medium capitalize mb-4">
                    Manage Address
                </h3>
                <div class="space-y-4">
                    {/* <!-- Form row --> */}
                    <div class="grid sm:grid-cols-2 gap-4">
                        {/* <!-- Single input --> */}
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Full Name
                            </label>
                            <input type="text" class="input-box" value="John"/>
                        </div>
                        {/* <!-- single input end --> */}
                        {/* <!-- single input --> */}
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Phone Number
                            </label>
                            <input type="text" class="input-box" value="+123 456 789"/>
                        </div>
                        {/* <!-- Single input end --> */}
                    </div>
                    {/* <!-- Form row end --> */}
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Country
                            </label>
                            <select class="input-box">
                                <option>Bangladesh</option>
                                <option>Bidesh</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Region
                            </label>
                            <select class="input-box">
                                <option>Dhaka</option>
                                <option>Noakhali</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                City
                            </label>
                            <select class="input-box">
                                <option>Dhaka-North</option>
                                <option>Dhaka-South</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Area
                            </label>
                            <select class="input-box">
                                <option>Notun Bazar</option>
                                <option>Gulshan</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Address
                        </label>
                        <input type="text" class="input-box" value="Badda Notun Bazar"/>
                    </div>
                </div>
                <div class="mt-6">
                    <button type="submit"
                        class="px-6 py-2 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                        Save change
                    </button>
                </div>
            </form>
        </div>
        {/* <!-- account content end --> */}
    </div>
    {/* <!-- account wrapper end --> */}
    </>
  )
}

export default ManageAddress