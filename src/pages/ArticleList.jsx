import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, logout, getCurrentUser } from '../api/sapApi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function ArticleList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const user = getCurrentUser();

  useEffect(() => {
    const check = async () => {
      const session = localStorage.getItem('sessionId');
      if (!session) {
        navigate('/');
        return;
      }
      loadItems();
    };
    check();
  }, [page, search]);

  const loadItems = async () => {
    setLoading(true);
    const result = await getItems(page, search);
    if (result.success) {
      setItems(result.items || []);
      setTotalItems(result.total || result.items?.length || 0);
    } else {
      setError(result.error || 'Error al cargar');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(totalItems / 10);

  return (
    <div style={styles.app}>
      <Sidebar />
      <div className="main-content" style={styles.main}>
        <Navbar user={user.username} onLogout={handleLogout} />
        
        <div style={styles.content}>
          <h2 style={styles.title}>Listado de Artículos</h2>

          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar por código o nombre..."
              value={search}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>

          {loading ? (
            <div style={styles.loading}>Cargando...</div>
          ) : error ? (
            <div style={styles.error}>{error}</div>
          ) : items.length === 0 ? (
            <div style={styles.empty}>No hay artículos</div>
          ) : (
            <>
              <div className="table-container">
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>Código</th>
                      <th style={styles.th}>Nombre</th>
                      <th style={styles.th}>Estado</th>
                      <th style={styles.th}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.ItemCode} style={styles.tr}>
                        <td style={styles.td}>{item.ItemCode}</td>
                        <td style={styles.td}>{item.ItemName}</td>
                        <td style={styles.td}>
                          <span style={item.Frozen === 'tNO' ? styles.activeBadge : styles.inactiveBadge}>
                            {item.Frozen === 'tNO' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => navigate(`/articulo/${item.ItemCode}`)} style={styles.detailBtn}>
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="pagination" style={styles.pagination}>
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={styles.pageBtn}>
                    ← Anterior
                  </button>
                  <span style={styles.pageInfo}>Página {page} de {totalPages}</span>
                  <button onClick={() => setPage(p => p+1)} disabled={page >= totalPages} style={styles.pageBtn}>
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: { display: 'flex', minHeight: '100vh', background: '#f5f5f5' },
  main: { flex: 1, marginLeft: '260px' },
  content: { padding: '24px' },
  title: { fontSize: '24px', color: '#333', marginBottom: '24px' },
  searchContainer: { marginBottom: '24px' },
  searchInput: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' },
  tableHeader: { background: '#f5f5f5' },
  th: { padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' },
  td: { padding: '12px', borderBottom: '1px solid #eee' },
  activeBadge: { background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  inactiveBadge: { background: '#f44336', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  detailBtn: { padding: '6px 12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  pagination: { display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', marginTop: '24px' },
  pageBtn: { padding: '8px 16px', background: 'white', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' },
  pageInfo: { color: '#666' },
  loading: { textAlign: 'center', padding: '40px', color: '#666' },
  error: { textAlign: 'center', padding: '40px', color: '#f44336' },
  empty: { textAlign: 'center', padding: '40px', color: '#666' }
};