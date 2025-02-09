import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading';
import Slider from 'react-slick';

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10,
    cssEase: 'linear',
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }]
  }







  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getCategories() }, [])

  return <>
    <div className="container py-10">

      <Slider {...settings}>
        {categories.map(categories => (
          <>

            <div className="w-fullmax-w-sm flex flex-col items-center bg-white border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="w-52 h-52 object-cover pb-1 rounded-t-lg"
                  src={categories.image}
                  alt="Categories image"
                />
              </a>
              <div className="pb-2">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">{categories.name}</h5>
                </a>
              </div>
            </div>

          </>

        ))}
      </Slider>




    </div >


  </>
}

