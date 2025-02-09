import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [loading, setLoading] = useState(false);
  let { cart, getCartProducts, removeCartProduct, cartTotalItems, cartTotalPrice, emptyCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    getCartProducts();
  }, [cart]);

  return (
    <>
      <div className="container custom-font pt-5 mx-auto px-4 md:px-12 lg:px-24">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col bg-gray-100 sm:px-5">
          <div className="text-center flex flex-col justify-center items-center">
            <span className='pt-5 sm:text-4xl text-3xl'>Shop Cart</span>
          </div>
          <div className="flex sm:flex-row flex-col-reverse pt-3 pb-5 justify-between items-center sm:text-base text-xs text-main">
            <span>Total Items: {cartTotalItems}</span>
            <span>Total Cart Price: {cartTotalPrice} LE</span>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-3 md:px-6 py-0"></th>
              </tr>
            </thead>
            <tbody>
              {!cart || !cart.data || !cart.data.products ? (
                <Loading />
              ) : (
                cart.data.products.map((item, index) => (
                  <tr key={index} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 px-0">
                    <div className="flex flex-row">
                      <td className="sm:px-4 sm:py-2 flex flex-row justify-center items-center">
                        <img src={item.product.imageCover} className="w-12 md:w-16 lg:w-24 max-w-full max-h-full" alt={item.product.title} />
                      </td>
                      <td className="flex flex-col px-3 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link className='pt-4 hover:underline' to={`/productdetails/${item.product._id}`}>
                          {item.product.title}
                        </Link>
                        <span className='text-main'>Price: {item.price * item.count} LE</span>
                        <span className='pt-3'>
                          <a
                            onClick={async () => {
                              setLoading(true);
                              await removeCartProduct(item.product._id);
                              setLoading(false);
                            }}
                            className="text-red-600 dark:text-red-500 hover:underline cursor-pointer sm:text-base text-xs"
                          >
                            <i className='fa fa-trash pe-2'></i>
                            Remove
                          </a>
                        </span>
                      </td>
                    </div>
                    <td className="sm:px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => updateQuantity(item.product._id, parseInt(item.count) - 1)}
                          className="flex items-center justify-center h-8 w-8 md:h-6 md:w-6 p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <span className="bg-gray-50 w-6 sm:w-8 py-1 text-gray-900 text-sm rounded-lg text-center">{item.count}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, parseInt(item.count) + 1)}
                          className="flex items-center justify-center h-8 w-8 md:h-6 md:w-6 p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="py-6 flex md:flex-row-reverse flex-col md:justify-between ">
          {cartTotalItems > 0 ? (
            <Link to="/checkout">
              <button className="btn py-3 px-6 w-full">Check out</button>
            </Link>
          ) : (
            <span>
              <button className="btn py-3 px-6 w-full hover:bg-gray-400 bg-gray-400 focus:ring-0" disabled>
                Check out
              </button>
            </span>
          )}
          <button
            onClick={() => emptyCart()}
            className="py-3 px-6 w-full md:w-fit bg-transparent text-red-600 border border-3 border-red-600 hover:bg-red-600 focus:ring-red-700 hover:text-white transition-all duration-300"
          >
            Empty Cart
          </button>
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
}