import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📦', label: 'Items', path: '/articulos' },
    { icon: '🏷️', label: 'Bar Codes', path: '/barcodes' },
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)} style={styles.hamburger}>
        ☰
      </button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`} style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🏭</span>
          <span style={styles.logoText}>SAP</span>
        </div>
        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <div
              key={item.path}
              style={styles.navItem}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} style={styles.overlay}></div>
      )}
    </>
  );
}

const styles = {
  hamburger: {
    position: 'fixed',
    top: '15px',
    left: '15px',
    zIndex: 1001,
    background: 'linear-gradient(90deg, rgba(18, 53, 196, 1) 0%, rgba(41, 141, 255, 1) 45%, rgba(69, 139, 214, 1) 100%)',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'none'
  },
  sidebar: {
    width: '260px',
    background: 'linear-gradient(180deg, rgba(18, 53, 196, 1) 0%, rgba(41, 141, 255, 1) 45%, rgba(69, 139, 214, 1) 100%)',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    cursor: 'pointer'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    marginBottom: '32px',
    borderBottom: '1px solid rgba(255,255,255,0.2)'
  },
  logoIcon: { fontSize: '28px' },
  logoText: { fontSize: '20px', fontWeight: 'bold', color: 'white' },
  nav: { flex: 1 },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    margin: '4px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.2s'
  },
  navIcon: { fontSize: '20px' }
};