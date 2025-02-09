import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  let { userToken, setUserToken } = useContext(UserContext)
  let { userName, setUserName } = useContext(UserContext)

  let loginNavigate = useNavigate()

  function logout() {
    localStorage.removeItem('token');
    setUserToken(null);
    localStorage.removeItem('username');
    setUserName(null);
    loginNavigate('/login')
  }

  let { getCartProducts, cart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, [])



  return <>

    <header className="bg-gray-200 fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-8 py-5 lg:px-12" aria-label="Global">

        <Link to={'home'} className="lg:pe-4">
          <span className="sr-only">FreshCart</span>
          <img className="" src={logo} width={120} alt />
        </Link>

        <div onClick={() => setIsOpen(true)} className=" flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {userToken && <div className="hidden lg:flex lg:gap-x-4 capitalize">

          <NavLink to={'home'} className=" font-medium text-gray-900">home</NavLink>
          <NavLink to={'categories'} className=" font-medium text-gray-900">categories</NavLink>
          <NavLink to={'products'} className=" font-medium text-gray-900">products</NavLink>
          <NavLink to={'brands'} className=" font-medium text-gray-900">brands</NavLink>
          <NavLink to={'wishlist'} className=" font-medium text-gray-900">wishlist</NavLink>
          <NavLink to={'cart'} className=" font-medium text-gray-900">cart</NavLink>
          <NavLink to={'allorders'} className=" font-medium text-gray-900">orders</NavLink>

        </div>
        }


        <div className="hidden lg:flex lg:justify-end space-x-5">
          {userToken ?
            <>
              <span className='relative'>
                <Link to={'cart'}>
                  <i className='fa fa-shopping-cart text-2xl'></i>

                  <div className="absolute bg-main text-green-200 text-[0.6rem] px-2 py-1 rounded-full -top-2 -right-2">
                    {!cart ? 0 : (
                      <>{cart.numOfCartItems}</>
                    )}
                  </div>
                </Link>
              </span>
              <span onClick={() => logout()} className=" font-medium hover:text-red-800 cursor-pointer text-red-600">Logout</span>


            </>
            : <>
              <NavLink to={'/'} className=" font-medium text-gray-900">Register</NavLink>
              <NavLink to={'login'} className=" font-medium text-gray-900">Login</NavLink>
            </>
          }
        </div>
      </nav>




      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={'home'} className="-m-1.5 p-1.5">
              <span className="sr-only">FreshCart</span>
              <img className="" src={logo} width={120} alt />
            </NavLink>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 capitalize">

                {userToken && <div className=" lg:flex lg:gap-x-4 space-y-3 capitalize">

                  <NavLink to={'home'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">home</NavLink>
                  <NavLink to={'cart'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">cart</NavLink>
                  <NavLink to={'brands'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">brands</NavLink>
                  <NavLink to={'categories'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">categories</NavLink>
                  <NavLink to={'products'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">products</NavLink>
                  <NavLink to={'wishlist'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">wishlist</NavLink>
                  <NavLink to={'allorders'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">orders</NavLink>

                </div>
                }

              </div>
              <div className="py-8 space-y-3">

                {userToken ? <>
                  <span onClick={() => logout()} className="block rounded text-base/7 font-medium cursor-pointer text-red-600 hover:bg-gray-100 px-2">Logout</span>

                </>
                  : <>
                    <NavLink to={'/'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">Register</NavLink>
                    <NavLink to={'login'} className="block rounded text-base/7 font-medium text-gray-900 hover:bg-gray-100 px-2">Login <span aria-hidden="true">→</span></NavLink>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  </>
}
