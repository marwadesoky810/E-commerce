import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/userContext';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet';
import { BallTriangle } from "react-loader-spinner";
import noOrders from '../../Assets/Images/empty-cart-2.webp';
import { Link } from 'react-router-dom';

export default function Orders() {
  let {
    userId,
    setUserId,
    getUserOrders,
    userOrders,
    setUserOrders,
    setIsLoading,
    isLoading,
  } = useContext(UserContext);

  async function getOrders(userId) {
    setIsLoading(true);
    let { data } = await getUserOrders(userId);
    setIsLoading(false);
    setUserOrders(data);
  }

  useEffect(() => {
    let { id } = jwtDecode(localStorage.getItem('userToken'));
    setUserId(id);
    getOrders(id);
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
    <div className="mx-auto my-5 pt-5 px-3 ">
      <h3 className='text-center'>My Orders</h3>
      {userOrders.length !==0 ? (<> <div className='row border-bottom p-3 gy-4 justify-content-between align-items-center'>
        {userOrders.map((order, index) => <div key={index} className="col-md-12 p-5 my-3 shadow rounded-2">
          <h6 className='text-main fw-bold'>Order ID: <span className='text-black fw-light'>{order._id}</span></h6>
          <h6 className='text-main fw-bold'>Order Date: <span className='text-black fw-light'>{order.createdAt.slice(0, 10)}</span></h6>
          <div className='row'>
            {order.cartItems?.map((item) => <div key={item._id} className='col-sm-3 gy-3 gx-1 mb-3'>
              <div className='card-group h-100'>
                <div className='card'>
                  <Link to={`/productDetails/${item.product.id}`}>
                    <img src={item.product.imageCover} className="card-img-top border" alt={item.product.title} />
                  </Link>
                  <div className="card-body">
                    <h6 className='text-dark-emphasis fw-bold'>{item.product.title}</h6>
                    <p className='text-main fw-bold'>Count: <span className='text-black fw-light'>{item.count}</span></p>
                    <p className='text-main fw-bold'>Price: <span className='text-black fw-light'>{item.price} EGP</span></p>
                  </div>
                </div>
              </div>
            </div>)}
          </div >
          <p className='text-main fw-bold'>Order sent to user name: <span className='text-black fw-light'>{order.user.name}</span></p>
          <p className='text-main fw-bold'>Order sent to user phone: <span className='text-black fw-light'>{order.shippingAddress.phone}</span></p>
          <p className='text-main fw-bold'>Order sent to user address: <span className='text-black fw-light'>{order.shippingAddress.details} at {order.shippingAddress.city}</span></p>
          <h6 className='text-main fw-bold'>Total order price: <span className='text-black fw-light'>{order.totalOrderPrice} EGP</span></h6>
          <h6 className='text-main fw-bold'>Payment Method: <span className='text-black fw-light'>{order.paymentMethodType}</span></h6>
        </div>)}
      </div>
      </>) : (<>
        <div className="d-flex justify-content-center align-items-center flex-column py-3">
          <img src={noOrders} alt="npOrdersImg" />
          <h4 className="text-center">No Orders !!</h4>
          <Link to={'/'} className="pt-3">
            <button className="btn btn-outline-success fw-bold">Continue Shopping and make some Orders</button>
          </Link>
        </div>
      </>)}
    </div>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Orders</title>
        <meta name="description" content="User Orders" />
      </Helmet>
    </div>
  </>
  )
}
