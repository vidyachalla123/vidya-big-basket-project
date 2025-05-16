import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './MyStyles.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { logOutUser } from './store';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);  // Reference to the nav-links div
  const cartObjects = useSelector(globalState => globalState.cart);
  const totalCartCount = cartObjects.reduce((total, item) => total + item.quantity, 0);

  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);

  const dispatch = useDispatch();

  // Close menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Add event listener for clicks outside the menu
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-left">
            <span className="brand">
              🛒 <strong>RatanBasket</strong>
            </span>
          </div>

          <div className="navbar-right">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>

            <div ref={menuRef} className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
              <Link to="/veg" onClick={() => setMenuOpen(false)}>🥦 VegItems</Link>
              <Link to="/nonveg" onClick={() => setMenuOpen(false)}>🍗 NonvegItems</Link>
              <Link to="/milk" onClick={() => setMenuOpen(false)}>🥛 Milk</Link>
              <Link to="/chocolate" onClick={() => setMenuOpen(false)}>🍫 Chocolate</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart {totalCartCount}</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 Orders</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>ℹ️ About Us</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>📞 Contact Us</Link>
              <div className="auth-section">
                {isAuthenticated ? (
                  <>
                    <span className="welcome-text">Welcome {currentUser.username}</span>
                    <button className="logout-button" onClick={() => dispatch(logOutUser())}>Logout</button>
                  </>
                ) : (
                  <Link className="signin-link" to="/signin" onClick={() => setMenuOpen(false)}>🔐 Sign In</Link>
                )}
              </div>


            </div>
          </div>

        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/veg' element={<Veg />} />
          <Route path='/nonveg' element={<NonVeg />} />
          <Route path='/milk' element={<Milk />} />
          <Route path='/chocolate' element={<Chocolate />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
