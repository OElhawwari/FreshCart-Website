import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AllOrdersContext } from '../../Context/AllOrdersContext';
import Loading from '../Loading/Loading';
import NotFound from './../NotFound/NotFound';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { allOrders, getUserOrders } = useContext(AllOrdersContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders if not available
  useEffect(() => {
    if (!allOrders || allOrders.length === 0) {
      getUserOrders();
      console.log("Order ID:", orderId);


    }
  }, [allOrders, getUserOrders]);


  useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      const foundOrder = allOrders.find((order) => String(order._id) === String(orderId));
      setOrder(foundOrder);
      setLoading(false);
      console.log("All Orders:", allOrders);
    }
  }, [allOrders, orderId]);

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <NotFound />;
  }




  return <>
    <div className="container custom-font pt-5 mx-auto px-4 md:px-12 lg:px-24">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col bg-gray-100 sm:px-5">
        <div className="text-center flex flex-col justify-center items-center">
          <span className="pt-5 md:text-4xl text-3xl font-extrabold">Order Details</span>
        </div>

        <div className="px-5 py-10">
          <div className="flex md:flex-row md:items-start md:justify-between flex-col space-y-8 md:space-y-0">
            <div className='text-sm mt-5 md:mt-0'>
              <h2 className="md:text-2xl text-lg font-semibold mb-4">Order Summary</h2>

              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Order Date:</strong> {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              }).format(new Date(order.createdAt))}</p>
              <p><strong>Total Price:</strong> {order.totalOrderPrice} LE</p>
              <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
              <p>
                <strong>Payment Status:</strong>{' '}
                {order.isPaid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-500">Not Paid</span>
                )}
              </p>
              <p>
                <strong>Delivery Status:</strong>{' '}
                {order.isDelivered ? (
                  <span className="text-green-500">Delivered</span>
                ) : (
                  <span className="text-red-500">Not Delivered</span>
                )}
              </p>
            </div>

            <div className='text-sm'>
              <h3 className="md:text-xl text-lg font-semibold mb-2">Shipping Address</h3>
              {order.shippingAddress ? (
                <>
                  <p><strong>City:</strong> {order.shippingAddress.city}</p>
                  <p><strong>Details:</strong> {order.shippingAddress.details}</p>
                  <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                </>
              ) : (
                <p>No shipping address provided.</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-3">Product</th>
                <th scope="col" className="px-3 md:px-6 py-0">Quantity</th>
                <th scope="col" className="px-3 md:px-6 py-0">Price</th>
                <th scope="col" className="px-3 md:px-6 py-0">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item, index) => (
                <tr key={index} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-3 md:px-6 py-4 flex items-center">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-12 md:w-16 lg:w-24 max-w-full max-h-full mr-4"
                    />
                    <div>
                      <Link
                        to={`/productdetails/${item.product._id}`}
                        className="hover:underline"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-500">{item.product.brand.name}</p>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4">{item.count}</td>
                  <td className="px-3 md:px-6 py-4">{item.price} LE</td>
                  <td className="px-3 md:px-6 py-4">{item.price * item.count} LE</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5">
          <Link to="/allorders" className="text-blue-600 hover:underline">
            &larr; Back to Orders
          </Link>
        </div>
      </div>
    </div>

  </>
}




