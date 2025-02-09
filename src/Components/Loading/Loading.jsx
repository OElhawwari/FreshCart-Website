import React from 'react'
import style from './Loading.module.css'

export default function Loading() {
  
  return <>
    <div
        id="popup-modal"
        className="bg-gray-800 bg-opacity-80 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      >
        <div className="relative p-4 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 md:p-5 text-center">
              <i className='fas fa-spin fa-spinner'></i>
              <h3 className="mb-5 text-lg font-normal text-gray-500">Loading</h3>

            </div>
          </div>
        </div>
      </div>
  
  </>
}
