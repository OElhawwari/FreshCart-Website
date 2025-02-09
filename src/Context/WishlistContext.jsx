import axios from "axios";
import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const [wishlist, setWishlist] = useState(null)
    const headers = {
        token: localStorage.getItem('token')
    }

    async function addAndRemoveProductToWishlist(productId) {
        try {
            if (isProductInWishlist(productId)) {
                const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
                setWishlist(data);
                console.log(data.message)
            } else {
                let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
                    productId: productId
                }, { headers });
                setWishlist(data);
                console.log(data.message)

            }

            const productDetails = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className={`fa ${isProductInWishlist(productId) ? 'fa-trash text-red-600' : 'fa-heart text-red-600'}`}></i>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {productDetails.data.data.title.split(" ").slice(0, 2).join(" ")}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {isProductInWishlist(productId) ? 'Product removed successfully from your wishlist !' : 'Product added successfully to your wishlist !'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 });

        } catch (error) {
            console.log(error);
        }
    }


    async function getWishlistProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers
            })
            setWishlist(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeWishlistProduct(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers
            })
            setWishlist(data)
            const productDetails = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className='fa fa-trash text-red-600 '></i>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {productDetails.data.data.title.split(" ").slice(0, 2).join(" ")}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Product Removed !
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

    function isProductInWishlist(id) {
        if (!wishlist || !wishlist.data) return false;

        return wishlist.data.some(product => product._id === id);
    }






    return <WishlistContext.Provider value={{ addAndRemoveProductToWishlist, wishlist, getWishlistProducts, removeWishlistProduct, isProductInWishlist }}>
        {children}
    </WishlistContext.Provider>
}