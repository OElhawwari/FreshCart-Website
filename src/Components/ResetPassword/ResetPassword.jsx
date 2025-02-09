import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Loading from '../Loading/Loading';

export default function ResetPassword() {
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (showSuccessModal) {
            setLoading(true);
            const id = setTimeout(() => {
                navigate('/login');
            }, 300);
            setLoading(false);
            setTimeoutId(id);
            return () => clearTimeout(id);
        }
    }, [showSuccessModal]);

    let validationSchema = Yup.object().shape({
        newPassword: Yup.string().required('Password is required').matches(/^(?=[A-Za-z][A-Za-z0-9]{5,8}$)(?=.*[A-Z]).+/,
            `Password Should:
              * Start with a letter (either uppercase or lowercase).
              * Should contain at least 1 uppercase letter.
              * Be between 6 and 9 characters in total.
              * Can only contain letters (A-Z or a-z) and numbers (0-9).`
        )
    })

    async function sendOtp() {
        try {
            setLoading(true);
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email: formik.values.email });
            setLoading(false);
            setIsOtpSent(true);
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
                                    OTP sent successfully to your email !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: sendOtp
    });

    const formik2 = useFormik({
        initialValues: {
            newPassword: ''
        },
        onSubmit: resetPassword,
        validationSchema
    });

    async function verifyOTP() {
        try {
            setLoading(true);
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: otp });
            setLoading(false);
            setIsOtpVerified(true);
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
                                    OTP Verified !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })
        } catch (error) {
            setLoading(false);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex justify-center items-center">
                                <i className="fa fa-exclamation-circle text-red-500 text-xl"></i>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Notification:
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Invalid OTP !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })
            console.log(error);


        }
    };

    async function resetPassword() {
        try {
            setLoading(true);
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                email: formik.values.email
                , newPassword: formik2.values.newPassword
            });
            setLoading(false);
            setShowSuccessModal(true);
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
                                    Password changed successfully  !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex justify-center items-center">
                                <i className="fa fa-exclamation-circle text-red-500 text-xl"></i>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Notification:
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Invalid password !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })
        }
    };

    return <>
        <div className="container mx-auto py-10">
            <h1 className="text-3xl text-gray-900 dark:text-slate-200 pb-16 text-center">Reset Password</h1>
            {!isOtpVerified ? <>
                {!isOtpSent ? <div className="md:w-1/2 mx-auto">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" "
                                required
                            />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email
                            </label>
                        </div>
                        <button type="submit" className="text-white bg-main-700 hover:bg-main-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
                            {loading ? <i className="fas fa-spin fa-spinner"></i> : 'Send OTP'}
                        </button>
                    </form>

                </div> : <>{isOtpSent && (
                    <>
                        <div className="md:w-1/2 mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="OTP" id="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" "
                                />
                                <label htmlFor="OTP" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    OTP
                                </label>
                            </div>
                            <button onClick={verifyOTP} className="text-white bg-main-700 hover:bg-main-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
                                {loading ? <i className="fas fa-spin fa-spinner"></i> : 'Verify OTP'}
                            </button></div>
                    </>
                )}</>}
            </> : (
                <form onSubmit={formik2.handleSubmit}>
                    <div className="md:w-1/2 mx-auto">
                        <div className="relative z-0 w-full mb-5 group">

                            <input type="password"
                                name="newPassword" id="newPassword"
                                value={formik2.values.newPassword}
                                onChange={formik2.handleChange}
                                onBlur={formik2.handleBlur}
                                required
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main-600 peer " placeholder=" " required />
                            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-600 peer-focus:dark:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                New Password
                            </label>
                            {formik2.touched.newPassword && formik2.errors.newPassword && <div className="text-red-500 text-xs" style={{ whiteSpace: "pre-line" }}>{formik2.errors.newPassword}</div>}
                        </div>
                        <button type='submit' className="text-white bg-main-700 hover:bg-main-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
                            {loading ? <i className="fas fa-spin fa-spinner"></i> : 'Reset Password'}
                        </button>
                    </div>
                </form>
            )}
        </div>
        {loading && <Loading/>}
    </>
}
