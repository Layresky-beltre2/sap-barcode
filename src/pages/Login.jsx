import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/sapApi';

export default function Login() {
  const navigate = useNavigate();
  const [companyDB, setCompanyDB] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(companyDB, username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Credenciales incorrectas');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Fondo con gradiente AZUL */}
      <div style={styles.bgGradient}></div>
      <div style={styles.bgCircles}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.cardInner}>
          <div style={styles.logoSection}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoIcon}>🖨️</div>
            </div>
            <h1 style={styles.title}>SAP Business One</h1>
            <p style={styles.subtitle}>Gestión de inventario y códigos QR</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Compañía</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🏢</span>
                <input
                  type="text"
                  placeholder="CompanyDB"
                  style={styles.input}
                  value={companyDB}
                  onChange={(e) => setCompanyDB(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Usuario</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Usuario"
                  style={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Contraseña</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  style={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? (
                <span style={styles.spinner}></span>
              ) : (
                'Iniciar sesión →'
              )}
            </button>

            {error && (
              <div style={styles.errorCard}>
                <span style={styles.errorIcon}>⚠️</span>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>Sistema de gestión de códigos de barra</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    overflow: 'hidden'
  },
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1a237e 0%, #283593 30%, #3f51b5 60%, #5c6bc0 100%)',
    zIndex: 0
  },
  bgCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflow: 'hidden'
  },
  circle1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(92, 107, 192, 0.2) 0%, transparent 70%)',
    borderRadius: '50%'
  },
  circle2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(63, 81, 181, 0.15) 0%, transparent 70%)',
    borderRadius: '50%'
  },
  circle3: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(48, 63, 159, 0.12) 0%, transparent 70%)',
    borderRadius: '50%'
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    margin: '20px',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeInUp 0.6s ease-out'
  },
  cardInner: {
    background: '#ffffff',
    borderRadius: '32px',
    padding: '44px 40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '36px'
  },
  logoWrapper: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #283593 0%, #3f51b5 100%)',
    borderRadius: '60px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 10px 25px -5px rgba(40, 53, 147, 0.3)'
  },
  logoIcon: {
    fontSize: '48px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3f51b5 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6c757d',
    margin: 0
  },
  form: {
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: '0.3px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '16px',
    color: '#94a3b8'
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#1e293b',
    background: '#ffffff',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #283593 0%, #3f51b5 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(40, 53, 147, 0.3)'
  },
  spinner: {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  errorCard: {
    marginTop: '20px',
    padding: '14px 16px',
    background: '#fef2f2',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #fecaca'
  },
  errorIcon: {
    fontSize: '16px'
  },
  errorText: {
    color: '#dc2626',
    fontSize: '13px',
    flex: 1
  },
  footer: {
    textAlign: 'center',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0'
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: 0
  }
};

// Agregar animaciones
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  input:focus {
    border-color: #3f51b5 !important;
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
  }
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(40, 53, 147, 0.4);
  }
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);