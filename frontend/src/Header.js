import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const api = process.env.REACT_APP_BACKEND_URL;

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch(`${api}/users/verify`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        setIsAuth(res.ok && data.success);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuthStatus();
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch(`${api}/users/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      localStorage.removeItem('user');
      setIsAuth(false);
      navigate('/login');
      setIsMobileMenuOpen(false);
    } catch {}
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Code Prev</div>
      
      <button className={styles.menuButton} onClick={toggleMobileMenu}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <nav>
        {isAuth ? (
          <ul className={styles.navLinks}>
            <li><button className={styles.navButton} onClick={() => handleNavLinkClick('/dashboard')}>Dashboard</button></li>
            <li><button className={styles.logoutButton} onClick={handleLogout}>Logout</button></li>
          </ul>
        ) : (
          <ul className={styles.navLinks}>
            <li><button className={styles.navButton} onClick={() => handleNavLinkClick('/login')}>Login</button></li>
            <li><button className={styles.navButton} onClick={() => handleNavLinkClick('/signup')}>Signup</button></li>
          </ul>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          {isAuth ? (
            <>
              <button className={styles.navButton} onClick={() => handleNavLinkClick('/dashboard')}>Dashboard</button>
              <button className={styles.navButton} onClick={() => handleNavLinkClick('/')}>Home</button>
              <button className={styles.navButton} onClick={() => handleNavLinkClick('/profile')}>Add Profile</button>
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className={styles.navButton} onClick={() => handleNavLinkClick('/login')}>Login</button>
              <button className={styles.navButton} onClick={() => handleNavLinkClick('/signup')}>Signup</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
