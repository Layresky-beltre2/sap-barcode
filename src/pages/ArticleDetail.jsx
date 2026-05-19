import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, addBarcode, logout, getCurrentUser } from '../api/sapApi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function ArticleDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newBarCode, setNewBarCode] = useState('');
  const [unidad, setUnidad] = useState('1');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = getCurrentUser();

  const unidadesMedida = [
    { code: '1', name: 'Pieza' },
    { code: '2', name: 'Caja' },
    { code: '3', name: 'Pallet' },
    { code: '4', name: 'Kilogramo' },
    { code: '5', name: 'Litro' },
    { code: '6', name: 'Metro' }
  ];

  useEffect(() => {
    const check = async () => {
      const session = localStorage.getItem('sessionId');
      if (!session) {
        navigate('/');
        return;
      }
      loadItem();
    };
    check();
  }, [code]);

  const loadItem = async () => {
    setLoading(true);
    const result = await getItem(code);
    if (result.success && result.item) {
      setItem(result.item);
    } else {
      setError('Artículo no encontrado');
    }
    setLoading(false);
  };

  const handleAddBarcode = async () => {
    if (!newBarCode.trim()) {
      setError('Ingrese un código');
      return;
    }
    setAdding(true);
    setError('');
    setSuccess('');
    
    const result = await addBarcode(code, newBarCode, parseInt(unidad));
    
    if (result.success) {
      setSuccess('Código agregado');
      setNewBarCode('');
      loadItem();
    } else {
      setError(result.error || 'Error');
    }
    setAdding(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getQRImageUrl = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <Sidebar />
        <div style={styles.main}>
          <Navbar user={user.username} onLogout={handleLogout} />
          <div style={styles.loading}>Cargando...</div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div style={styles.app}>
        <Sidebar />
        <div style={styles.main}>
          <Navbar user={user.username} onLogout={handleLogout} />
          <div style={styles.error}>{error || 'No encontrado'}</div>
        </div>
      </div>
    );
  }

  const esActivo = item.Frozen === 'tNO';
  const barcodes = item.BarCodes || [];

  return (
    <div style={styles.app}>
      <Sidebar />
      <div style={styles.main}>
        <Navbar user={user.username} onLogout={handleLogout} />
        
        <div style={styles.content}>
          <div className="detail-header" style={styles.header}>
            <button onClick={() => navigate('/articulos')} style={styles.backBtn}>← Volver</button>
            <h2>{item.ItemName}</h2>
          </div>

          <div className="info-grid" style={styles.infoCard}>
            <div><strong>Código:</strong> {item.ItemCode}</div>
            <div><strong>Estado:</strong> <span style={esActivo ? styles.activeBadge : styles.inactiveBadge}>{esActivo ? 'Activo' : 'Inactivo'}</span></div>
            <div><strong>Precio:</strong> ${item.Price || 'N/A'}</div>
            <div><strong>Stock:</strong> {item.QuantityOnStock || 0}</div>
          </div>

          <div style={styles.qrCard}>
            <h3>Códigos QR ({barcodes.length})</h3>
            {barcodes.length === 0 ? (
              <p>No hay códigos</p>
            ) : (
              <div className="qr-grid" style={styles.qrGrid}>
                {barcodes.map((bc, idx) => (
                  <div key={idx} style={styles.qrItem}>
                    <img src={getQRImageUrl(bc.BarCode)} alt="QR" style={styles.qrImage} />
                    <div><strong>{bc.BarCode}</strong></div>
                    <div>Unidad: {unidadesMedida.find(u => u.code === bc.UoMEntry?.toString())?.name || bc.UoMEntry || 'N/A'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {esActivo ? (
            <div style={styles.formCard}>
              <h3>Agregar código</h3>
              <div className="form-group-responsive" style={styles.formGroup}>
                <select value={unidad} onChange={(e) => setUnidad(e.target.value)} style={styles.select}>
                  {unidadesMedida.map(u => <option key={u.code} value={u.code}>{u.name}</option>)}
                </select>
                <input type="text" placeholder="Código" value={newBarCode} onChange={(e) => setNewBarCode(e.target.value)} style={styles.input} />
                <button onClick={handleAddBarcode} disabled={adding} style={styles.addBtn}>{adding ? 'Agregando...' : 'Agregar'}</button>
              </div>
              {error && <p style={styles.errorMsg}>{error}</p>}
              {success && <p style={styles.successMsg}>{success}</p>}
            </div>
          ) : (
            <div style={styles.warningCard}>⚠️ Artículo inactivo. No se pueden agregar códigos.</div>
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
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' },
  backBtn: { padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '40px', color: '#666' },
  error: { textAlign: 'center', padding: '40px', color: '#f44336' },
  infoCard: { background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  activeBadge: { background: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'inline-block' },
  inactiveBadge: { background: '#f44336', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'inline-block' },
  qrCard: { background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  qrGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '16px' },
  qrItem: { textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '12px' },
  qrImage: { width: '100px', height: '100px', marginBottom: '10px' },
  formCard: { background: '#e8f0fe', padding: '20px', borderRadius: '12px' },
  formGroup: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' },
  select: { padding: '10px', border: '1px solid #ddd', borderRadius: '8px', flex: 1, minWidth: '120px' },
  input: { flex: 2, minWidth: '200px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' },
  addBtn: { padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  warningCard: { background: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '12px', textAlign: 'center' },
  errorMsg: { color: '#f44336', marginTop: '12px' },
  successMsg: { color: '#4caf50', marginTop: '12px' }
};