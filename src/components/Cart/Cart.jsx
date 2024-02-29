import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/cartContext";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import emptyCart from '../../Assets/Images/empty-cart.webp';


export default function Cart() {

  let {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    setCartNumber,
    cartNumber,
    clearUserCart,
    cartDetails,
    setCartDetails,
    totalCartPrice,
    setTotalCartPrice,
    setCartId,
    isLoading,
    setIsLoading,
  } = useContext(CartContext);


  async function getCartItems() {
    setIsLoading(true);
    let { data } = await getLoggedUserCart();
    setIsLoading(false)
    setCartDetails(data);
    setCartNumber(data?.numOfCartItems);
    setTotalCartPrice(data?.data.totalCartPrice);
    setCartId(data?.data._id);
  }

 

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
    setCartNumber(data.numOfCartItems);
    setTotalCartPrice(data?.data.totalCartPrice);
    if (data.status === 'success') {
      toast.success('Product Removed Successfully', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      });
    }
    else {
      toast.error('Error occurred');
    }
  }



  async function updateCount(id, count, quantity) {
    let { data } = await updateProductQuantity(id, count, quantity);
    if (count <= quantity || count >= 1) {
      setCartDetails(data);
      setTotalCartPrice(data?.data.totalCartPrice);
    }
    else if(count <=0){
      removeItem(id);
    }
    else
    {
      toast.error('max. quantity')
    }
    if (data.status === 'success') {
      toast.success('Product Updated Successfully', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      });
    }
    else {
      toast.error('Error Occurred');
    }
  }

  async function clearCartItems() {
    setCartDetails([]);
    setCartNumber(0);
    setTotalCartPrice(0);
    let { data } = await clearUserCart();
    if (data.message === 'success') {
      toast.success('Cart Items are Deleted');
    }
    else {
      toast.error('Error Occurred');
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);


  if (isLoading === true) {
    return (
      <section className="d-flex vh-100 justify-content-center align-items-center mt-5 pt-5">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </section>
    )
  }

  return (<>
    <div className="m-5">
    <div className="w-75 mx-auto my-5 ">
      <h3 className="pt-3 text-center">Shopping Cart</h3>
      {cartDetails?.numOfCartItems > 0 ? (<>
        <h4 className="h6 text-muted fw-bolder p-2">Cart Items: {cartNumber}</h4>
        <h4 className="h4 fw-bolder">Total Price: {totalCartPrice} <span className="text-main">EGP</span></h4>
        <div className="text-end">
          <button onClick={() => clearCartItems()} className="btn btn-outline-danger my-2">Clear all Cart</button>
        </div>
        {cartDetails?.data.products.map((product) => <div key={product._id} className="row border-bottom py-3 pt-5 px-3 bg-main-light">
          <div className="col-md-1">
            <Link to={`/productDetails/${product.product.id}`}>
              <img className="w-100" src={product.product.imageCover} alt={product.product.title} />
            </Link>
          </div>
          <div className="col-md-11">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6">{product.product.title}</h3>
                <h6>{product.price}<span className="text-main ms-1">EGP</span> </h6>
              </div>
              <div>
                <button onClick={() => updateCount(product.product.id, product.count + 1, product.product.quantity)} className="btn btn-outline-success border-main p-2">+</button>
                <span className="mx-2">{product.count}</span>
                <button onClick={() => updateCount(product.product.id, product.count - 1, product.product.quantity)} className="btn btn-outline-success border-main p-2">-</button>
              </div>
            </div>
            <button onClick={() => removeItem(product.product.id)} className="btn btn-outline-danger p-2"><i className="fas fa-trash-can font-sm text-danger"></i> Remove</button>
          </div>
          
        </div>
        
        )}

        <div className="d-flex justify-content-center align-items-center p-3">
          <Link to={'/payment'} className="btn bg-main text-white">Online Payment</Link>
          
        </div>
        
      </>) : (<>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5 py-5">
          <img src={emptyCart} alt="emptyCartImg" className="w-75"/>
          <h4 className="text-main text-center">Your Cart is Empty !!</h4>
          <Link to={'/'} className="pt-3">
            <button className="btn btn-outline-success fw-bold">Fill your Cart</button>
          </Link>
        </div>
      </>)}
    </div>
    </div>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <meta name="description" content="CartItems" />
      </Helmet>
    </div>
  </>
  );
}
