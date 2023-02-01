import React from 'react'
import { Header } from '../../components'

const AddUsers = () => {
    return (
        <div className='container'>
            {/* <!-- checkout form --> */}
            <Header category="Add" title="New User"/>
            <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
                <form action="">
    
                    <div class="space-y-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Company Name
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                County/Region <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Street Address <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Town/City <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Zip Code <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Phone Number <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Email Address <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                    </div>
                </form>
            </div>
            {/* <!-- checkout form end --> */}
        </div>
      )
}

export default AddUsers