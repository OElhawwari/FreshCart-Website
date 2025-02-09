import React, { useContext, useEffect, useState } from 'react';
import style from './AllOrders.module.css';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { AllOrdersContext } from '../../Context/AllOrdersContext';

export default function AllOrders() {
  let { getUserOrders, allOrders } = useContext(AllOrdersContext);

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <div className="container custom-font pt-5 mx-auto px-4 md:px-12 lg:px-24">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col bg-gray-100 sm:px-5">
          <div className="text-center flex flex-col justify-center items-center py-6 pb-10">
            <span className="pt-5 sm:text-4xl text-3xl">Orders</span>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-center text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 rounded-md">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-4 ">Order Number</th>
                <th scope="col" className="px-3 md:px-6 py-4 ">Price</th>
                <th scope="col" className="px-3 md:px-6 py-4">Paid</th>
                <th scope="col" className="px-3 md:px-6 py-4 ">Payment</th>
                <th scope="col" className="px-3 md:px-6 py-4">Delivered</th>
                <th scope="col" className="px-3 md:px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {!allOrders || allOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : (
                allOrders.map(order => (
                  <tr key={order._id} className="odd:bg-gray-200 text-center bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-3 md:px-6 py-4">{order.id}</td>
                    <td className="px-3 md:px-6 py-4">{order.totalOrderPrice} LE</td>
                    <td className="px-3 md:px-6 py-4">
                      {order.isPaid ? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <span className="text-red-500">Not Paid</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-4">{order.paymentMethodType}</td>
                    <td className="px-3 md:px-6 py-4">
                      {order.isDelivered ? (
                        <span className="text-green-500">Delivered</span>
                      ) : (
                        <span className="text-red-500">Not Delivered</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <Link to={`/orderdetails/${order._id}`}>
                        <button className='bg-slate-400 hover:bg-slate-300 hover:text-slate-600 focus:ring-0'>View</button>

                      </Link>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}