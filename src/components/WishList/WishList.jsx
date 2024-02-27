import React, { useContext, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { WishListContext } from '../../Context/wishListContext';
import { CartContext } from '../../Context/cartContext';
import whishList from '../../Assets/Images/wishlist2.jpg';

export default function WishList() {
  let { addToCart, setCartNumber } = useContext(CartContext);
  let {
    getLoggedUserWishList,
    wishListDetails,
    setWishListDetails,
    removeWishListItem
  } = useContext(WishListContext);

  async function getWishListItems() {
    let { data } = await getLoggedUserWishList();
    // console.log(data);
    setWishListDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeWishListItem(id);
    // console.log(data);
    setWishListDetails(data);
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

  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    setCartNumber(data.numOfCartItems);
    // console.log(data.numOfCartItems);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Cart', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      })
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  useEffect(() => {
    getWishListItems();
  }, [])

  if (wishListDetails == null) {
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
    <div className="w-75 mx-auto my-5">
      <h3 className='pt-3'>My Wish List</h3>
      <h4 className="h6 text-main fw-bolder my-3  ">Wish List Items: {wishListDetails?.count} </h4>
      {wishListDetails?.count !== 0 ? (<> {wishListDetails?.data.map((list) => <div key={list._id} className='row align-items-center border-bottom py-2  pt-3 px-3 bg-main-light'>
        <div className="col-md-2 ">
          <Link to={`/productDetails/${list.id}`}>
            <img className="w-100" src={list.imageCover} alt={list.title} />
          </Link>
        </div>
        <div className="col-md-10">
          <div className='d-flex align-items-center justify-content-between'>
            <div>
              <h3 className="h5 fw-bold">{list.title}</h3>
              <h6>{list.price} <span className='text-main ms-1'>EGP</span></h6>
            </div>
            <div>
              <button onClick={() => addProductToCart(list.id)} className='btn bg-main text-white'>Add to Cart</button>
            </div>
          </div>
          <button onClick={() => removeItem(list.id)} className="btn btn-outline-danger p-2"><i className="fas fa-trash-can font-sm"></i> Remove</button>
        </div>
      </div>)}
      </>) : (<>
        <div className="d-flex justify-content-center align-items-center flex-column py-3">
          <img src={whishList} alt="emptyWishListImg" className='w-75' />
          <h4 className="text-main text-center pt-3">Your Wish List is Empty !!</h4>
          <Link to={'/'} className="pt-3">
            <button className="btn btn-outline-success fw-bold">Go Shopping</button>
          </Link>
        </div>
      </>)}
    </div>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Wish List</title>
        <meta name="description" content="Wish List Items" />
      </Helmet>
    </div>
  </>)
}
