export default function Navbar({ user, onLogout }) {
  return (
    <div className="navbar" style={styles.navbar}>
      <div className="navbar-search" style={styles.searchContainer}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
      </div>
      <div className="navbar-user" style={styles.userSection}>
        <span style={styles.userName}>👋 {user}</span>
        <button onClick={onLogout} style={styles.logoutBtn}>Cerrar sesión</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: 'linear-gradient(90deg, rgba(18, 53, 196, 1) 0%, rgba(41, 141, 255, 1) 45%, rgba(69, 139, 214, 1) 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    flexWrap: 'wrap',
    gap: '10px'
  },
  searchInput: {
    padding: '8px 16px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    width: '250px',
    background: 'rgba(255,255,255,0.9)'
  },
  userSection: { display: 'flex', alignItems: 'center', gap: '16px' },
  userName: { color: 'white' },
  logoutBtn: { 
    padding: '8px 16px', 
    background: 'rgba(255,255,255,0.2)', 
    color: 'white', 
    border: '1px solid rgba(255,255,255,0.5)', 
    borderRadius: '6px', 
    cursor: 'pointer' 
  }
};