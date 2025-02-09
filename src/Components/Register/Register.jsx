import React, { useState, useEffect, useContext } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; 


export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  let loginNavigation = useNavigate();


  useEffect(() => {
    if (showSuccessModal) {
      const id = setTimeout(() => {
        loginNavigation('/login');
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
    loginNavigation('/login');
  };

  async function registerUser(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setLoading(false);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.name);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setApiError(null);
      setShowFailedModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setApiError(error.response.data.message);
      setShowFailedModal(true);
      setLoading(false);

    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required').matches(/^(?=[A-Za-z][A-Za-z0-9]{5,8}$)(?=.*[A-Z]).+/,
      `Password Should:
    * Start with a letter (either uppercase or lowercase).
    * Should contain at least 1 uppercase letter.
    * Be between 6 and 9 characters in total.
    * Can only contain letters (A-Z or a-z) and numbers (0-9).`
    ),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-Password is required'),
    phone: Yup.string().required('Phone is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, onSubmit: registerUser,
    validationSchema
  });

  return <>

    <div className="container mx-auto py-10 ">
      <h1 className="text-3xl text-gray-900 dark:text-slate-200 pb-16 text-center">Register</h1>
      <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
          {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs">{formik.errors.name}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs">{formik.errors.email}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          {formik.touched.password && formik.errors.password && <div className="text-red-500 text-xs" style={{ whiteSpace: "pre-line" }}>{formik.errors.password}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Re-Password
          </label>
          {formik.touched.rePassword && formik.errors.rePassword && <div className="text-red-500 text-xs">{formik.errors.rePassword}</div>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone
          </label>
          {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs">{formik.errors.phone}</div>}
        </div>
        {loading ?
          <button type="submit" className="text-white bg-main-700 hover:bg-main-800 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800"><i className='fas fa-spin fa-spinner'></i></button>
          :
          <button type="submit" className="text-white bg-main-700 hover:bg-main-800 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800">Submit</button>
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
                <h3 className="mb-5 text-lg font-normal text-gray-500">Account Created Successfully</h3>
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
