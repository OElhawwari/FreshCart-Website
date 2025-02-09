import axios from "axios";
import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Components/Loading/Loading";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState(null);
    const [cartTotalItems, setCartTotalItems] = useState('');
    const [cartTotalPrice, setCartTotalPrice] = useState('');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const headers = {
        token: localStorage.getItem('token')
    }

    async function addProductToCart(productId) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId: productId
            }, {
                headers: headers
            })
            setCart(data)
            const productDetails = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={productDetails.data.data.imageCover}
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {productDetails.data.data.title.split(" ").slice(0, 2).join(" ")}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {data.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })

        } catch (error) {
            console.log(error)

        }
    }

    async function getCartProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers : {
                    token: localStorage.getItem('token')
                }
            });

            if (data) {
                setCart(data);
                setCartTotalItems(data.numOfCartItems);
                setCartTotalPrice(data.data.totalCartPrice);
            } else {
                setCart(null);
            }
        } catch (error) {
            console.log(error);
            setCart(null);
        }
    }



    async function removeCartProduct(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            })
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }


    function emptyCart() {
        setModal(true); // Open modal
    }

    async function confirmEmptyCart() {
        try {
            setModal(false);
            setLoading(true);
            const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setCart(null);
            setCartTotalItems(0);
            setCartTotalPrice(0);
            setLoading(false);
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
                                    Your cart is now empty !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })

        } catch (error) {
            console.error(error);
        }
    }


    async function updateQuantity(productId, newCount) {
        try {
            setLoading(true)

            if (newCount < 1) {
                await removeCartProduct(productId);
                setLoading(false)
                return;
            }

            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count: newCount
            }, {
                headers: headers
            });

            setCart(data);
            setLoading(false)
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
                                    Quantity Updated !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 })

        } catch (error) {
            console.log(error);
        }
    }




    return <CartContext.Provider value={{ addProductToCart, cart, getCartProducts, removeCartProduct, cartTotalPrice, cartTotalItems, emptyCart, updateQuantity }}>
        {children}
        {modal && (
            <div
                id="popup-modal"
                className="bg-gray-800 bg-opacity-80 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
            >
                <div className="relative p-4 w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 md:p-5 text-center">
                            <i className="fas fa-exclamation-circle text-red-600 text-5xl py-5 "></i>
                            <h3 className="mb-5 text-lg font-normal text-red-600 px-16">
                                Are you sure you want to empty your cart?
                            </h3>

                            <button
                                onClick={() => setModal(false)}
                                className="py-3 px-6 hover:bg-gray-600 hover:text-white border border-3 border-gray-600 bg-transparent focus:ring-gray-700 text-gray-600 transition-all duration-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmEmptyCart}
                                className="py-3 px-6 bg-red-600 text-white border border-3 border-red-600 hover:bg-transparent focus:ring-red-700 hover:text-red-600 transition-all duration-300 ml-3"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        )}
        {loading && <Loading />}

    </CartContext.Provider>
}
