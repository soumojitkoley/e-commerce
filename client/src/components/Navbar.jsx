import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [isMenuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen)
  };

  return (
    <div className="navbar">
       <div className="logo">
        <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" alt="" />
      </div>
      {isMobile ? (
        <div className='hello'>
          <label class="burger" for="burger">
            <input type="checkbox" checked={isMenuOpen} readOnly onClick={handleMenuToggle} id="burger" />
            <span></span>
            <span></span>
            <span></span>
          </label>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div key={isMenuOpen ? 'menu-open' : 'menu-closed'} className={'fullnav-mob'} data-visible="true"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="nav-menu">
                  <ul type="none" className="list">
                    <li>
                      <NavLink onClick={() => { handleMenuToggle() }} to="/" className="link">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <a onClick={() => { handleMenuToggle() }} className="link">
                        About
                      </a>
                    </li>

                    <li>
                      <a onClick={() => { handleMenuToggle() }} className="link">
                        Services
                      </a>
                    </li>

                    <li>
                      <NavLink onClick={handleMenuToggle} to="/" className="link">
                        Doctors
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleMenuToggle} to="/" className="link">
                        Hospitals
                      </NavLink>
                    </li>
                    <li>
                      <a onClick={() => { handleMenuToggle() }} className="link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="nav-menu">
          <ul type="none" className="list">
            <li>
              <NavLink to="/" className="link">
                Home
              </NavLink>
            </li>

            <li>
              <a className="link">
                About
              </a>
            </li>

            <li>
              <a className="link">
                Services
              </a>
            </li>
            <li>
              <NavLink to="/cart" className="link">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="link">
                Hospitals
              </NavLink>
            </li>
            <li>
              <a className="link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;