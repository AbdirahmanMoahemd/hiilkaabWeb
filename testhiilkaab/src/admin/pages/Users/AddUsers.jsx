import React from 'react'
import { Header } from '../../components'

const AddUsers = () => {
    return (
        <div className='container'>
            {/* <!-- checkout form --> */}
            <Header category="Add" title="New User"/>
            <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
                <form action="">
    
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Company Name
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                County/Region <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Street Address <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Town/City <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Zip Code <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Phone Number <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Email Address <span className="text-primary">*</span>
                            </label>
                            <input type="text" className="input-box"/>
                        </div>
                    </div>
                </form>
            </div>
            {/* <!-- checkout form end --> */}
        </div>
      )
}

export default AddUsers