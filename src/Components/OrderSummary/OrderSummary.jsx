import React, { useContext, useEffect, useState } from 'react'
import style from './OrderSummary.module.css'
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';

export default function OrderSummary() {
  const [loading, setLoading] = useState(false)
  let counter = 0;

  let { cart, getCartProducts, cartTotalPrice } = useContext(CartContext)


  useEffect(() => {
    getCartProducts();
  }, [])


  return <>
    <>

      <div className="bg-gray-100 rounded-lg custom-font w-full items-center flex flex-col justify-center ">

        <div className="relative overflow-auto h-60 shadow-sm sm:rounded-lg flex flex-col bg-gray-100 w-full sm:px-5">

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-1">
                  <span className="sr-only">Image</span>
                </th>
              </tr>
            </thead>


            <tbody>
              {!cart || !cart.data || !cart.data.products ? (
                <Loading />
              ) : (
                cart.data.products.map((item, index) => (
                  <>
                  <span className='hidden'>{counter++}</span>
                  <tr key={index} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 px-0">

                    <div className="flex flex-row items-center justify-start">

                      <td className="sm:px-4 sm:py-2 flex flex-row justify-between items-center">
                        <img src={item.product.imageCover} className="w-12 md:w-16 lg:w-24 max-w-full max-h-full" alt={item.product.title} />
                      </td>

                      {/* Product Name */}
                      <td className="flex flex-col px-3 md:px-6 py-4 font-semibold  text-gray-900 dark:text-white">
                        <span className='pt-4 sm:text-lg'>
                          {item.product.title.split(" ").slice(0, 2).join(" ")}
                        </span>
                        <span className='text-main flex flex-row items-center'>Price: {item.price * item.count} LE <span className='text-[12px] ps-1 text-gray-400'> {item.count == 1 ? '' : <>({item.price} LE)</>}</span></span>
                        <span className='text-main'>{item.count == 1 ? <>{item.count} PC</> : <>{item.count} PCS</>}</span>

                      </td>
                    </div>


                  </tr>
                  
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-b-2 py-2 w-2/3"></div>

        <div className='w-11/12 py-2 flex justify-between items-center'>
          <span className='text-gray-400 font-normal text-sm'>Qty</span>
          <span className='text-gray-400 font-normal text-sm'>{counter == 1 ? <>{counter} PC</> : <>{counter} PCS</>}</span>
        </div>

        <div className='w-11/12 py-2 flex justify-between items-center'>
          <span className='text-gray-500 font-normal text-sm'>Subtotal</span>
          <span className='text-gray-500 font-normal text-sm'>{cartTotalPrice - (cartTotalPrice * 0.05)} LE</span>
        </div>

        <div className='w-11/12 py-2 flex justify-between items-center'>
          <span className='text-gray-500 font-normal text-sm'>Taxes</span>
          <span className='text-gray-500 font-normal text-sm'>{cartTotalPrice * 0.05} LE</span>
        </div>
        <div className="border-b-2 py-2 w-2/3 "></div>

        <div className='w-11/12 pt-4 pb-6 flex justify-between items-center'>
          <span className='text-black font-bold'>Total</span>
          <span className='text-gray-500 font-bold'>{cartTotalPrice} EGP</span>
        </div>

        <div className="border-t-2 py-2 w-2/3 md:hidden"></div>



        {loading && <Loading />}

      </div>


    </>
  </>
}









