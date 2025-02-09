
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import Wishlist from './Components/Wishlist/Wishlist';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/WishlistContext.jsx'
import Checkout from './Components/checkout/checkout.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import OrderDetails from './Components/OrderDetails/OrderDetails.jsx'
import AllOrdersContextProvider from './Context/AllOrdersContext.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ErrorBoundary from './Components/ErrorBoundary'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'



let routers = createBrowserRouter([{
  path: '', element: <Layout />, children: [
    { index: true, element: <Register /> },
    { path: 'login', element: <Login /> },
    { path: 'resetpassword', element: <ResetPassword /> },
    { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
    { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
    { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
    { path: 'orderdetails/:orderId', element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
    { path: '*', element: <NotFound /> },
  ]
}])
function App() {

  return <>

<ErrorBoundary>
    <AllOrdersContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </AllOrdersContextProvider></ErrorBoundary>

  </>
}

export default App
