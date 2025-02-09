import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { WishlistContext } from '../../Context/WishlistContext'

export default function Wishlist() {
  const [loading, setLoading] = useState(false)

  let { addProductToCart } = useContext(CartContext)
  let { getWishlistProducts, addAndRemoveProductToWishlist, wishlist } = useContext(WishlistContext)


  useEffect(() => {
    getWishlistProducts();
  }, [])

  useEffect(() => {
    setLoading(true)
    getWishlistProducts();
    setLoading(false)
  }, [wishlist])

  return <>
    <>

      <div className="container custom-font pt-5 px-4 md:px-12 lg:px-24">

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col bg-gray-100 sm:px-5">
          <div className="text-center flex flex-col justify-center items-center ">
            <span className='pt-5 sm:text-4xl text-3xl'>Wishlist</span>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
            <thead className=''>
              <tr>
                <th scope="col" className="px-0 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-0 py-0"></th>
              </tr>
            </thead>

            <tbody>
              {!wishlist ? (
                <Loading />
              ) : (
                wishlist.data.map((item, index) => (
                  <tr key={index} className="flex py-4 relative sm:flex-row sm:justify-between flex-col items-center bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                    {/* Image Column */}
                    <div className='flex md:flex-row flex-col justify-center items-center md:justify-normal'>
                      <td className="sm:px-4 sm:py-2">
                        <img src={item.imageCover} className="w-12 md:w-16 lg:w-24 max-w-full max-h-full" alt={item.title} />
                      </td>

                      {/* Product Name */}
                      <td className="flex flex-col px-3 md:px-6 sm:py-4 font-semibold text-gray-900 dark:text-white">
                        <Link className='pt-4 hover:underline text-center' to={`/productdetails/${item._id}`}>
                          {item.title}
                        </Link>
                        <span className='text-main text-center sm:text-left pt-2'>Price: {item.price} LE</span>
                        <span className='sm:pt-3 opacity-0 sm:opacity-100'>
                          <a
                            onClick={async () => {
                              setLoading(true);
                              await addAndRemoveProductToWishlist(item.id);
                              setLoading(false);
                            }}
                            className="text-red-600 dark:text-red-500 hover:underline cursor-pointer sm:text-base text-xs"
                          ><i className='fa fa-trash pe-2'></i>
                            Remove
                          </a>
                        </span>
                        <span className='absolute top-0 right-0 p-2 px-4 sm:opacity-0 opacity-100'>
                          <a
                            onClick={async () => {
                              setLoading(true);
                              await addAndRemoveProductToWishlist(item.id);
                              setLoading(false);
                            }}
                            className="text-red-600 dark:text-red-500 hover:underline cursor-pointer text-sm"
                          ><i className='fa fa-trash'></i>
                            
                          </a>
                        </span>
    
                      </td>
                    </div>

                    {/* Add To Cart */}
                    <td className="sm:px-6 py-2">
                      <div className="flex items-center justify-center">
                        <button onClick={async () => {
                          setLoading(true);
                          await addProductToCart(item._id)
                          await addAndRemoveProductToWishlist(item._id);
                          setLoading(false);
                        }} className="btn px-8 py-2 text-nowrap">
                          Add to cart
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
        {loading && <Loading />}

      </div>


    </>
  </>
}
