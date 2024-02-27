import { createContext, useState } from "react";
import axios from "axios";

export let WishListContext = createContext();

let userToken = localStorage.getItem("userToken");
let headers = {
    token: userToken,
};

function addToWishList(id) {
    return axios
        .post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

function getLoggedUserWishList() {
    return axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
}

function removeWishListItem(productId) {
    return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers,
        })
        .then((response) => response)
        .catch((error) => error);
}

export default function WishListContextProvider(props) {
    const [wishListDetails, setWishListDetails] = useState(null);

    return (
        <WishListContext.Provider
            value={{
                addToWishList,
                getLoggedUserWishList,
                wishListDetails,
                setWishListDetails,
                removeWishListItem,
            }}
        >
            {props.children}
        </WishListContext.Provider>
    );
}
