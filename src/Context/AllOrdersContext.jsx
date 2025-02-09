import axios from "axios";
import { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Components/Loading/Loading";
import { jwtDecode } from "jwt-decode";


export let AllOrdersContext = createContext();

export default function AllOrdersContextProvider({ children }) {

    const decoded = jwtDecode(localStorage.getItem('token'));
    const userId = decoded.id;
    const [loading, setLoading] = useState(false)
    const [allOrders, setAllOrders] = useState(null)

    const headers = {
        token: localStorage.getItem('token')
    }

    
    async function getUserOrders() {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                { headers }
            );
            setAllOrders(data);
        } catch (error) {
            console.log(error)
        }
    }




    return <AllOrdersContext.Provider value={{ getUserOrders, allOrders }}>
        {children}


    </AllOrdersContext.Provider>
}
