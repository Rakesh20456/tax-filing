import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import finance from './images/financegrowth.png';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [barShow, setBarShow] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  }

  useEffect (() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth <= 986) {
        setBarShow(true);
      } else {
        setBarShow(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  return (
    <div>
      <div className="head-section">
        <img src={finance} alt='Finance-icon'></img>
        <div className="nav-content">
          <ul className={showMenu ? 'show-menu' : ''}>
            <li><Link to='/' className='line' onClick={closeMenu}>Home</Link></li>
            <li><Link to='/profile' className='line' onClick={closeMenu}>Profile</Link></li>
            <li><Link to='/tax' className='line' onClick={closeMenu}>Tax</Link></li>
            <li>About</li>
          </ul>
          { barShow && <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="burger-icon" /> }
        </div>
      </div>    
    </div>
  )
}

export default Header;