import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Images/freshcart-logo.svg';
import { UserContext } from '../../Context/userContext';
import { CartContext } from '../../Context/cartContext';

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let { cartNumber } = useContext(CartContext);
  let navigate = useNavigate();
  function LogOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Fresh Cart logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="wishlist">Wish-List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">Brands</Link>
                </li>
                
              </> : ''}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className='fab fa-facebook mx-2'></i>
                <i className='fab fa-instagram mx-2'></i>
                <i className='fab fa-twitter mx-2'></i>
                <i className='fab fa-google mx-2'></i>
                
              </li>
             
              {userToken !== null ? <>
                <Link to='/cart'>
                  <i className="fa-solid fa-cart-shopping mx-3 fs-5 position-relative">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartNumber}
                    </span>
                  </i>
                </Link>
                <li className="nav-item">
                <Link className="nav-link" to="profile"><i className="fa-solid fa-user"></i> Profile</Link>
              </li>
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={() => LogOut()}>LogOut</span>
                </li>
              </> : <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">LogIn</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">Register</Link>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
