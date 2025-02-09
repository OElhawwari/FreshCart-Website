import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from './../Loading/Loading';
import { CartContext } from './../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';


export default function ProductDetails() {
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


  const [productDetails, setProductDetails] = useState({});
  const [relatedCategoryItems, setRelatedCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  let { addProductToCart } = useContext(CartContext)
  let { addAndRemoveProductToWishlist, getWishlistProducts, isProductInWishlist, wishlist } = useContext(WishlistContext)

  let { id } = useParams();


  async function getProductDetails(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      getRelatedCategoryItems(data.data.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedCategoryItems(categoryId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setRelatedCategoryItems(data.data);
      setPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    setPageLoading(true);
    getProductDetails(id);
    getWishlistProducts();

  }, [id]);

  useEffect(() => {

    getWishlistProducts();

  }, [wishlist]);

  



  const getRandomItems = (arr, num) => {
    let shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, num);
  };

  const filteredItems = relatedCategoryItems.filter(
    product => product.category._id === productDetails.category?._id
  );
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    if (relatedCategoryItems.length > 0) {
      const filteredItems = relatedCategoryItems.filter(
        product => product.category._id === productDetails.category?._id
      );
      setRandomItems(getRandomItems(filteredItems, 5));
    }
  }, [relatedCategoryItems]); 
  
  return <>
    <div className="container py-4">
      {pageLoading ? <Loading /> : <>

        <div className="container ">
          <div key={productDetails._id} className="flex sm:flex-row flex-col items-center sm:px-16 transition-all duration-300">
            <div className="w-1/3">
              <figure className='py-3 w-full'>
                <Slider {...settings}>
                  {productDetails.images?.map((image, index) => (
                    <img key={index} src={image} className='w-full' alt={productDetails.title} />
                  ))}
                </Slider>
              </figure>
            </div>

            <div className="w-2/3 sm:ps-6">
              <div className='flex flex-row justify-center sm:justify-normal'>
                <figcaption className='font-normal text-sm text-green-500 bg-green-200 bg-opacity-90 py-1 px-2 rounded-lg inline'>{productDetails.brand?.name}</figcaption>
              </div>
              <figcaption className='font-bold sm:text-3xl text-2xl pt-3'>{productDetails.title.split(" ").slice(0, 2).join(" ")}</figcaption>
              <figcaption className='font-normal sm:text-md text-xs pt-3 text-gray-500'>{productDetails.description}</figcaption>
              <div className='flex justify-between pt-6'>
                <figcaption className=''>{productDetails.price} EGP</figcaption>
                <figcaption className=''><i className='fa fa-star rating-color'></i> {productDetails.ratingsAverage}</figcaption>
              </div>
              <div className="flex justify-center pt-6">
                <button onClick={async () => {
                  setLoading(true);
                  await addProductToCart(productDetails._id);
                  setLoading(false);
                }} type="submit" className="text-main btn bg-transparent border border-main hover:text-white focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm xl:px-72 lg:px-56 px-16 py-3 text-center dark:focus:ring-main-800 transition-all duration-300">Add+</button>
                <button onClick={async () => {
                  setLoading(true);
                  await addAndRemoveProductToWishlist(productDetails._id);
                  setLoading(false);
                }} type="submit" className="group/heartBtn top-0 right-0 hover:bg-transparent focus:ring-0 transition-all duration-300 text-white bg-transparent border-0  focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:focus:ring-main-800">
                  <i className={`fa fa-heart ${isProductInWishlist(productDetails._id) ? 'text-red-600' : 'text-red-300'} group-hover/heartBtn:text-red-600 duration-300`}></i>
                </button>
                {loading && <Loading />}
              </div>
            </div>
          </div>

          <div className="container flex flex-col items-center sm:p-16">
            <div className='py-10'>
              <h2>Related Products</h2>
            </div>
            <div className='flex flex-row space-x-1 lg:flex-nowrap flex-wrap justify-center'>
              {randomItems.map((product) => (
                <div key={product.id} className="product lg:w-1/5 md:w-1/3 w-10/12 flex flex-col group/card items-center relative border border-gray-300 rounded-md p-8 transition-all duration-300">
                  <Link to={`/productdetails/${product.id}`} className='flex flex-col items-center'>
                    <figure className='py-3'><img src={product.imageCover} alt="image" /></figure>
                    <figcaption className='text-green-500 bg-green-200 bg-opacity-90 py-1 px-2 rounded-lg text-[10px]'>{product.category.name}</figcaption>
                    <figcaption className='font-semibold pt-3'>{product.title.split(" ").slice(0, 2).join(" ")}</figcaption>
                    <div className='flex justify-between w-full pt-6'>
                      <figcaption className=''>{product.price} EGP</figcaption>
                      <figcaption className=''><i className='fa fa-star rating-color'></i> {product.ratingsAverage}</figcaption>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>


      </>}
    </div>

  </>;
}
