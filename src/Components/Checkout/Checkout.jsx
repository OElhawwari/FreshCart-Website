import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import applepay_checkout from '../../assets/images/paymentMethods/applepay-checkout.svg'
import OrderSummary from '../OrderSummary/OrderSummary';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




export default function Checkout() {


  const [loading, setLoading] = useState(false)
  let { cart } = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('onlineSession');

  let homeNavigate = useNavigate()


  async function pay() {
    try {
      setLoading(true);

      if (paymentMethod === "onlineSession") {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
          {
            shippingAddress: {
              details: formik.details,
              phone: formik.phone,
              city: formik.city
            }
          },
          {
            headers: { token: localStorage.getItem('token') }
          }
        );
        location.href = data.session.url;
        
      } else if (paymentMethod === "COD") {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
          {
            shippingAddress: {
              details: formik.details,
              phone: formik.phone,
              city: formik.city
            }
          },
          {
            headers: { token: localStorage.getItem('token') }
          }
        );
        console.log(data)
        toast.custom((t) => (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex justify-center items-center">
                  <i className="fa-solid fa-circle-check text-main text-xl"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Notification:
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Order Placed !
                  </p>
                </div>
              </div>
            </div>
          </div>
        ), { duration: 3000 })

        homeNavigate('/home')


      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  let validationSchema = Yup.object().shape({
    details: Yup.string().required('Address details are required').min(3),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125]\d{8}$/, 'Invalid phone number,  (Ex. 015 3294 8201)').max(11,'Invalid phone number,  (Ex. 015 3294 8201)'),
    city: Yup.string().required('City is required').min(3)
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    }, onSubmit: pay,
    validationSchema
  });

  return <>

    <div className="container flex flex-col justify-center items-center py-10 ">
      <h1 className="text-3xl text-gray-900 dark:text-slate-200 pb-16 text-center">Checkout</h1>
      <form onSubmit={formik.handleSubmit} className=" flex md:flex-row flex-col-reverse justify-center items-center w-full">

        <div className='left-side-form md:w-2/5 md:px-8 sm:border-r-2 flex flex-col justify-between items-center w-11/12'>

          <div className="relative z-0 w-full pb-5 group">
            <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              City
            </label>
            {formik.touched.city && formik.errors.city && <div className="text-red-500 text-xs">{formik.errors.city}</div>}

          </div>

          <div className="relative z-0 w-full pb-5 group">
            <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Address
            </label>
            {formik.touched.details && formik.errors.details && <div className="text-red-500 text-xs">{formik.errors.details}</div>}
          </div>

          <div className="relative z-0 w-full pb-5 group">
            <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone
            </label>
            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs">{formik.errors.phone}</div>}

          </div>

          <div className='flex flex-row items-center justify-between w-11/12 py-4'>

            <div className="flex items-center">
              <input id="COD" onChange={(e) => setPaymentMethod(e.target.id)} type="radio" defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash on delivery</label>
            </div>
            <div className="flex items-center">
              <input defaultChecked id="onlineSession" onChange={(e) => setPaymentMethod(e.target.id)} type="radio" defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Visa/Mastercard</label>
            </div>
          </div>

          <button type='submit' className="py-3 px-6 bg-blue-600 text-white border border-3 border-blue-600 hover:bg-transparent focus:ring-blue-700 hover:text-blue-600 transition-all duration-300 w-full"
          >
            Place Order
          </button>

          <div className='flex flex-row justify-center items-center py-6 w-3/4'>
            <div className="border-b-2 w-2/3"></div>
            <span className='px-6 text-gray-400'>or</span>
            <div className="border-b-2 w-2/3 "></div>
          </div>

          <button disabled
            className=" bg-black opacity-50 w-full flex justify-center items-center focus:ring-0 hover:bg-black"
          ><img src={applepay_checkout} alt="applepay_checkout" />
          </button>

        </div>

        <div className="border-t-2 py-5 w-10/12 md:hidden"></div>

        <div className="right-side-form md:w-2/5 md:px-8 flex flex-col justify-center items-center pb-10 w-11/12">
          <OrderSummary />

        </div>

      </form>

      {loading && <Loading />}

    </div >




  </>
}



