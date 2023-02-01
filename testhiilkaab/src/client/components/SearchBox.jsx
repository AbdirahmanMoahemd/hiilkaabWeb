import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
            
        }
        else {
            navigate('/')
        }
    }
  return (
    <form  className="w-full xl:max-w-xl lg:max-w-lg lg:flex relative hidden" onSubmit={submitHandler}>
    
            <input
              type="text"
              className="pl-12 w-full border border-r-0 border-primary py-3 px-3 rounded-l-md focus:ring-primary focus:border-primary"
              placeholder="search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              onClick={submitHandler}
              className="bg-primary border border-primary text-primary px-8 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition"
            >
              Search
            </button>
          </form>
  )
}

export default SearchBox