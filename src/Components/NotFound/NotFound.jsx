import React from 'react'
import style from './NotFound.module.css'
import notFoundImg from '../../assets/images/error.svg'


export default function NotFound() {
  
  return <>
    <div className="container flex justify-center items-center py-12">
        <img src={notFoundImg} alt="Error" className=''/>
    </div>
  
  </>
}
