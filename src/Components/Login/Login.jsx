import React, { useState, useEffect, useContext } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';


export default function Login() {

  const [apiError, setApiError] = useState(null)
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  let homeNavigation = useNavigate();

  let { setUserToken } = useContext(UserContext)

  useEffect(() => {
    if (showSuccessModal) {
      const id = setTimeout(() => {
        homeNavigation('/home');
      }, 3000);
      setTimeoutId(id);

      return () => clearTimeout(id);
    }
  }, [showSuccessModal]);

  const handleClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowSuccessModal(false);
    homeNavigation('/home');
  };

  async function loginUser(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setLoading(false);
      setApiError(null);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.name);
      setUserToken(data.token);
      setShowFailedModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setApiError(error.response.data.message);
      setShowFailedModal(true);
      setLoading(false);

    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, onSubmit: loginUser,
    validationSchema
  });

  return <>

    <div className="container mx-auto py-10 ">
      <h1 className="text-3xl text-gray-900 dark:text-slate-200 pb-16 text-center">Login</h1>
      <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">

        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs">{formik.errors.email}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group flex flex-col">
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>

          <Link to={'/resetpassword'} className="text-main text-xs absolute -bottom-5 right-0"><div>Reset Password</div></Link>

        </div>

        {loading ?
          <button type="submit" className="text-white bg-main-700 hover:bg-main-800 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800"><i className='fas fa-spin fa-spinner'></i></button>
          :
          <button type="submit" className="text-white bg-main-700 hover:bg-main-800 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800">Login</button>
        }


      </form>


      {apiError && showFailedModal &&
        <div
          id="popup-modal"
          className="bg-gray-800 bg-opacity-80 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">{apiError}</h3>
                <button
                  onClick={() => setShowFailedModal(false)}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {!apiError && showSuccessModal &&
        <div
          id="popup-modal"
          className="bg-gray-800 bg-opacity-80 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">Welcome Back {localStorage.getItem('username')} !</h3>
                <button
                  onClick={handleClose}
                  className="text-white bg-main-600 hover:bg-main-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      }




    </div >




  </>
}