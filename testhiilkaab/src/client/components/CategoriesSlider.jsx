import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'

const CategoriesSlider = ({categories}) => {
    var slideToShow = 1
 
  if (categories.length == 1) {
    slideToShow = 1
  }
  else if (categories.length == 2) {
    slideToShow = 2
  }
  else if (categories.length == 3) {
    slideToShow = 3
  }
  else if (categories.length == 4) {
    slideToShow = 4
  }
  else if (categories.length == 5) {
    slideToShow = 5
  }
  else{
    slideToShow = 5
  }
 

  const settings_2 = {
    dots: false,
    infinite: true,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        },
        
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 1
        },
      }

    ]
  }
  return (
    <><Slider {...settings_2}>
    {categories.map((category) => {
    return (
      <>
      <Link to={`/shop/${category.id}`}>
    <div className="relative  lg:w-36 w-52 md:w-40  rounded-sm overflow-hidden">
      <div className="">
      <img src={category.icon} className="w-full h-24" />
      </div>
      <a
        to="#"
        className="absolute text-center inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center text-base text-white 
              font-roboto font-medium tracking-wide transition"
      >
        {category.name}
      </a>
    </div>
    </Link>
    </>
    )})}
    </Slider></>
  )
}

export default CategoriesSlider