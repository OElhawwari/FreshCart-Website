import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from './../Loading/Loading';
import SearchBar from '../SearchBar/SearchBar';
import { CartContext } from './../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';


export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  let { addProductToCart } = useContext(CartContext)
  let { addAndRemoveProductToWishlist, wishlist, getWishlistProducts, isProductInWishlist } = useContext(WishlistContext)


  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data)
      setPageLoading(false)
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    getProducts();
    getWishlistProducts();
  }, []);

  useEffect(() => {
    setLoading(true);

    getWishlistProducts();
    setLoading(false);


  }, [wishlist]);




  return <>
    <div className="container py-10">
      <SearchBar />

      {pageLoading ? <Loading /> :
        <div className="container  flex flex-wrap justify-center items-center mt-10 mx-auto gap-8 ">
          {products.map(products => (
            <>
              <div key={products._id} className="product lg:w-1/5 md:w-1/3 w-10/12 flex flex-col group/card items-center relative border border-gray-300 rounded-md p-8 transition-all duration-300">
                <Link to={`/productdetails/${products._id}`} className='flex flex-col items-center'>
                  <figure className='py-3'><img src={products.imageCover} alt="image" /></figure>
                  <figcaption className='text-green-500 bg-green-200 bg-opacity-90 py-1 px-2 rounded-lg text-[10px]'>{products.category.name}</figcaption>
                  <figcaption className='font-semibold pt-3'>{products.title.split(" ").slice(0, 2).join(" ")}</figcaption>
                  <div className='flex justify-between w-full pt-6'>
                    <figcaption className=''>{products.price} EGP</figcaption>
                    <figcaption className=''><i className='fa fa-star rating-color'></i> {products.ratingsAverage}</figcaption>
                  </div>
                </Link>


                <button onClick={async () => {
                  setLoading(true);
                  await addAndRemoveProductToWishlist(products._id)
                  setLoading(false);
                }} type="submit" className="group/heartBtn absolute top-0 right-0 text-black bg-transparent hover:bg-transparent focus:ring-0 transition-all duration-300">
                  <i
                    className={`fa fa-heart ${isProductInWishlist(products._id) ? 'text-red-600' : 'text-red-300'} group-hover/heartBtn:text-red-600 duration-300`}
                  ></i>                </button>


                <button
                  onClick={async () => {
                    setLoading(true);
                    await addProductToCart(products._id);
                    setLoading(false);
                  }}
                  type="submit"
                  className="text-main btn bg-transparent border border-main group-hover/card:bg-main group-hover/card:text-white focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm xl:px-24 px-10 py-3 text-center dark:focus:ring-main-800 transition-all duration-300"
                >
                  Add+
                </button>

              </div >

            </>
          ))}
          {loading && <Loading />}
        </div>
      }


    </div >

  </>
}