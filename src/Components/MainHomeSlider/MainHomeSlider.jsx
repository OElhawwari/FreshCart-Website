import React from 'react'
import style from './MainHomeSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import main1 from '../../assets/images/main1.jpg'
import main2 from '../../assets/images/main2.jpg'
import Slider from 'react-slick'


export default function MainHomeSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return <>
    <div className="container flex flex-row gap-0 pt-5">
      <div className="w-3/4">
        <Slider {...settings}>
          <div className="slide1">
            <img className=' object-cover object-right h-[500px] w-full' src={slide1} alt="slide1" />
          </div>
          <div className="slide2">
            <img className=' object-cover object-right h-[500px] w-full' src={slide2} alt="slide2" />
          </div>
          <div className="slide3">
            <img className=' object-cover object-right h-[500px] w-full' src={slide3} alt="slide3" />
          </div>


        </Slider>
      </div>
      <div className="w-1/4">
        <div className='flex flex-col'>
          <div className="main1">
            <img className='w-full object-cover object-center h-[250px]' src={main1} alt="main1" />
          </div>
          <div className="main2">
            <img className='w-full object-cover object-center h-[250px]' src={main2} alt="main2" />
          </div>
        </div>
      </div>
    </div>


  </>
}
