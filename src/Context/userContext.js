import axios from "axios";
import { createContext, useState } from "react";

export let UserContext = createContext();

function getUserOrders(userId) {
    return axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((response) => response)
        .catch((error) => error);
}

export default function UserContextProvider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    return (
        <UserContext.Provider
            value={{
                userToken,
                setUserToken,
                name,
                setName,
                userId,
                setUserId,
                getUserOrders,
                userOrders,
                setUserOrders,
                isLoading,
                setIsLoading,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
