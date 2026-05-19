import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, getCurrentUser, logout } from '../api/sapApi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const user = getCurrentUser();

  useEffect(() => {
    const check = async () => {
      const session = localStorage.getItem('sessionId');
      if (!session) {
        navigate('/');
        return;
      }
      loadData();
    };
    check();
  }, []);

  const loadData = async () => {
    const result = await getItems(1, '');
    if (result.success && result.items) {
      setItems(result.items);
      const active = result.items.filter(i => i.Frozen === 'tNO').length;
      setStats({
        total: result.items.length,
        active: active,
        inactive: result.items.length - active
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const recentItems = items.slice(0, 5);

  return (
    <div style={styles.app}>
      <Sidebar />
      <div className="main-content" style={styles.main}>
        <Navbar user={user.username} onLogout={handleLogout} />
        
        <div style={styles.content}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.welcomeTitle}>Hello {user.username}!</h1>
            <p style={styles.welcomeText}>
              You have <strong style={styles.taskCount}>{stats.inactive}</strong> inactive items. Let's start!
            </p>
          </div>

          <div className="stats-grid" style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total Items</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.inactive}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3>Recent Items</h3>
              <button onClick={() => navigate('/articulos')} style={styles.viewAllBtn}>
                View All →
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-container">
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentItems.map((item) => (
                      <tr key={item.ItemCode}>
                        <td>{item.ItemCode}</td>
                        <td>{item.ItemName}</td>
                        <td>
                          <span style={item.Frozen === 'tNO' ? styles.activeBadge : styles.inactiveBadge}>
                            {item.Frozen === 'tNO' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: { display: 'flex', minHeight: '100vh', background: '#f5f5f5' },
  main: { flex: 1, marginLeft: '260px' },
  content: { padding: '24px' },
  welcomeSection: { marginBottom: '32px' },
  welcomeTitle: { fontSize: '28px', color: '#333', marginBottom: '8px' },
  welcomeText: { color: '#666', fontSize: '14px' },
  taskCount: { color: '#ff9800' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' },
  statCard: { background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  statValue: { fontSize: '32px', fontWeight: 'bold', color: '#667eea' },
  statLabel: { fontSize: '14px', color: '#666', marginTop: '8px' },
  tableCard: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  viewAllBtn: { background: 'none', border: 'none', color: '#667eea', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  activeBadge: { background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  inactiveBadge: { background: '#f44336', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }
};import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, getCurrentUser, logout } from '../api/sapApi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const user = getCurrentUser();

  useEffect(() => {
    const check = async () => {
      const session = localStorage.getItem('sessionId');
      if (!session) {
        navigate('/');
        return;
      }
      loadData();
    };
    check();
  }, []);

  const loadData = async () => {
    const result = await getItems(1, '');
    if (result.success && result.items) {
      setItems(result.items);
      const active = result.items.filter(i => i.Frozen === 'tNO').length;
      setStats({
        total: result.items.length,
        active: active,
        inactive: result.items.length - active
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const recentItems = items.slice(0, 5);

  return (
    <div style={styles.app}>
      <Sidebar />
      <div className="main-content" style={styles.main}>
        <Navbar user={user.username} onLogout={handleLogout} />
        
        <div style={styles.content}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.welcomeTitle}>Hello {user.username}!</h1>
            <p style={styles.welcomeText}>
              You have <strong style={styles.taskCount}>{stats.inactive}</strong> inactive items. Let's start!
            </p>
          </div>

          <div className="stats-grid" style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total Items</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.inactive}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3>Recent Items</h3>
              <button onClick={() => navigate('/articulos')} style={styles.viewAllBtn}>
                View All →
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-container">
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentItems.map((item) => (
                      <tr key={item.ItemCode}>
                        <td>{item.ItemCode}</td>
                        <td>{item.ItemName}</td>
                        <td>
                          <span style={item.Frozen === 'tNO' ? styles.activeBadge : styles.inactiveBadge}>
                            {item.Frozen === 'tNO' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: { display: 'flex', minHeight: '100vh', background: '#f5f5f5' },
  main: { flex: 1, marginLeft: '260px' },
  content: { padding: '24px' },
  welcomeSection: { marginBottom: '32px' },
  welcomeTitle: { fontSize: '28px', color: '#333', marginBottom: '8px' },
  welcomeText: { color: '#666', fontSize: '14px' },
  taskCount: { color: '#ff9800' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' },
  statCard: { background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  statValue: { fontSize: '32px', fontWeight: 'bold', color: '#667eea' },
  statLabel: { fontSize: '14px', color: '#666', marginTop: '8px' },
  tableCard: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  viewAllBtn: { background: 'none', border: 'none', color: '#667eea', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  activeBadge: { background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  inactiveBadge: { background: '#f44336', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }
};