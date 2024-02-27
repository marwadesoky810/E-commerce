import { createContext, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

let userToken = localStorage.getItem("userToken");
let headers = {
    token: userToken,
};

function addToCart(id) {
    return axios
        .post(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: id,
            },
            {
                headers,
            }
        )
        .then((response) => response)
        .catch((error) => error);
}

function getLoggedUserCart() {
    return axios
        .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
}

function removeCartItem(productId) {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
}

function updateProductQuantity(productId, count) {
    return axios
        .put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count,
            },
            {
                headers,
            }
        )
        .then((response) => response)
        .catch((error) => error);
}

function clearUserCart() {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
}

function onlinePayment(cartId, url, values) {
    return axios
        .post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: values,
            },
            {
                headers,
            }
        )
        .then((response) => response)
        .catch((error) => error);
}

// function addToWishList(id) {
//     return axios
//         .post(
//             `https://ecommerce.routemisr.com/api/v1/wishlist`,
//             {
//                 productId: id,
//             },
//             {
//                 headers,
//             }
//         )
//         .then((response) => response)
//         .catch((error) => error);
// }

export default function CartContextProvider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartId, setCartId] = useState(null);

    return (
        <CartContext.Provider
            value={{
                addToCart,
                getLoggedUserCart,
                removeCartItem,
                updateProductQuantity,
                clearUserCart,
                onlinePayment,
                cartNumber,
                setCartNumber,
                cartDetails,
                setCartDetails,
                totalCartPrice,
                setTotalCartPrice,
                cartId,
                setCartId,
                isLoading,
                setIsLoading,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
