import React from 'react'
import style from './Footer.module.css'
import amazonPay from '../../assets/images/paymentMethods/amazon-pay-.svg'
import amex from '../../assets/images/paymentMethods/amex.svg'
import applePay from '../../assets/images/paymentMethods/apple-pay.svg'
import masterCard from '../../assets/images/paymentMethods/mastercard.svg'
import payPal from '../../assets/images/paymentMethods/paypal.svg'
import visa from '../../assets/images/paymentMethods/visa.svg'
import appStore from '../../assets/images/downloadMethods/appStore.svg'
import googlePlay from '../../assets/images/downloadMethods/googlePlay.svg'

export default function Footer() {

  return <>
    <div className="flex flex-col bg-gray-200  bottom-0 md:p-8 md:px-32 p-5 w-full">
      <div className='pb-3 flex flex-col border-b-[1px] border-gray-300'>
        <span className='font-bold md:text-2xl text-lg py-1'>Get the FreshCart app</span>
        <span className='text-gray-500 md:text-base text-sm'>We will send you a link, open it on your phone to download the app</span>
        <div className='py-3 flex md:flex-row flex-col justify-center items-center'>

          <div className="relative md:w-6/6 w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@freshcart.com" />
          </div>
          <button className="btn md:w-1/6 w-full p-2.5 md:text-base text-xs">Share App Link</button>

        </div>

      </div>

      <div className='pt-3 pb-5 flex md:flex-row flex-col justify-start items-center border-b-[1px] border-gray-300'>
        <span className='md:text-base text-sm pe-2'>Payment Partners</span>
        <span className='flex flex-row'>
          <img src={amazonPay} alt="amazonPay" className='w-12 px-1' />
          <img src={amex} alt="amex" className='w-12 px-1' />
          <img src={masterCard} alt="masterCard" className='w-12 px-1' />
          <img src={visa} alt="visa" className='w-12 px-1' />
          <img src={payPal} alt="payPal" className='w-12 px-1' />
          <img src={applePay} alt="applePay" className='w-12 px-1' />
        </span>
      </div>
      <div className='pt-3 flex md:flex-row flex-col justify-between items-center'>
        <span>Get deliveries with FreshCart</span>
        <span className='flex flex-row'>
          <img src={appStore} alt="appStore" className='w-32 p-1' />
          <img src={googlePlay} alt="googlePlay" className='w-32 px-1' />

        </span>

      </div>
    </div>

  </>
}


