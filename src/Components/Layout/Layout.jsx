import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'

export default function Layout() {

	return <>

		<Navbar />

		<div className="container mt-4 py-12 dark:bg-gray-950 flex flex-col min-h-screen flex-1 ">
			<Outlet></Outlet>
		</div>

		<Footer/>

	</>
}
