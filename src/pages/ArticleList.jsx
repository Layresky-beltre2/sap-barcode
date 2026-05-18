import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getArticulosMock } from "../data/mockData"

export default function ArticulosLista() {
  const navigate = useNavigate()
  const [articulos, setArticulos] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const session = localStorage.getItem("sap_session")
    if (!session) {
      navigate("/")
      return
    }
    
    const loadArticulos = async () => {
      setTimeout(() => {
        setArticulos(getArticulosMock())
        setLoading(false)
      }, 500)
    }
    
    loadArticulos()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("sap_session")
    navigate("/")
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const filteredArticulos = articulos.filter(art =>
    art.codigo.toLowerCase().includes(search.toLowerCase()) ||
    art.nombre.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredArticulos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedArticulos = filteredArticulos.slice(startIndex, startIndex + itemsPerPage)

  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1))
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1))

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} />
      <MainContent
        title="Listado de Artículos"
        search={search}
        onSearch={handleSearch}
        loading={loading}
        articulos={paginatedArticulos}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
        onViewDetail={(codigo) => navigate(`/article/${codigo}`)}
        onLogout={handleLogout}
      />
    </div>
  )
}

// Componente Sidebar
const Sidebar = ({ onLogout }) => (
  <div style={styles.sidebar}>
    <div style={styles.logo}>🏭 SAP</div>
    <nav style={styles.nav}>
      <NavItem active>📦 Artículos</NavItem>
      <NavItem>📊 Inventario</NavItem>
      <NavItem>🏷️ Códigos QR</NavItem>
    </nav>
    <button onClick={onLogout} style={styles.logoutBtn}>🚪 Cerrar Sesión</button>
  </div>
)

const NavItem = ({ children, active = false }) => (
  <div style={active ? styles.navItemActive : styles.navItem}>
    {children}
  </div>
)

// Componente MainContent
const MainContent = ({ 
  title, search, onSearch, loading, articulos, 
  currentPage, totalPages, onPreviousPage, onNextPage, 
  onViewDetail, onLogout 
}) => (
  <div style={styles.main}>
    <Header title={title} onLogout={onLogout} />
    <SearchBar value={search} onChange={onSearch} />
    
    {loading ? (
      <LoadingState />
    ) : (
      <>
        <ArticulosTable articulos={articulos} onViewDetail={onViewDetail} />
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={onPreviousPage}
            onNext={onNextPage}
          />
        )}
      </>
    )}
  </div>
)

const Header = ({ title, onLogout }) => (
  <div style={styles.header}>
    <h2 style={styles.title}>{title}</h2>
    <button onClick={onLogout} style={styles.headerLogout}>Cerrar Sesión</button>
  </div>
)

const SearchBar = ({ value, onChange }) => (
  <div style={styles.searchBox}>
    <input
      type="text"
      placeholder="🔍 Buscar por código o nombre..."
      style={styles.searchInput}
      value={value}
      onChange={onChange}
    />
  </div>
)

const LoadingState = () => (
  <div style={styles.loading}>Cargando artículos...</div>
)

const ArticulosTable = ({ articulos, onViewDetail }) => (
  <div style={styles.tableWrapper}>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th># Códigos QR</th>
          <th>Código de barra principal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map(art => (
          <tr key={art.id}>
            <td style={styles.cellCode}>{art.codigo}</td>
            <td>{art.nombre}</td>
            <td>
              <StatusBadge active={art.activo} />
            </td>
            <td style={{ textAlign: "center" }}>{art.codigosQR.length}</td>
            <td>{art.codigoBarraPrincipal}</td>
            <td>
              <button
                style={styles.viewBtn}
                onClick={() => onViewDetail(art.codigo)}
              >
                Ver detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const StatusBadge = ({ active }) => (
  <span style={{
    ...styles.badge,
    background: active ? "#DCFCE7" : "#FEE2E2",
    color: active ? "#166534" : "#991B1B"
  }}>
    {active ? "Activo" : "Inactivo"}
  </span>
)

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div style={styles.pagination}>
    <button onClick={onPrevious} disabled={currentPage === 1} style={styles.pageBtn}>
      ← Anterior
    </button>
    <span style={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
    <button onClick={onNext} disabled={currentPage === totalPages} style={styles.pageBtn}>
      Siguiente →
    </button>
  </div>
)

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#F8FAFC" },
  sidebar: { width: "260px", background: "white", borderRight: "1px solid #E2E8F0", padding: "24px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  logo: { fontSize: "20px", fontWeight: "bold", padding: "12px", marginBottom: "32px", color: "#1E293B" },
  nav: { flex: 1 },
  navItemActive: { padding: "10px 12px", margin: "4px 0", borderRadius: "8px", background: "#EFF6FF", color: "#2563EB", cursor: "pointer" },
  navItem: { padding: "10px 12px", margin: "4px 0", borderRadius: "8px", color: "#475569", cursor: "pointer" },
  logoutBtn: { padding: "10px", background: "#EF4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "20px" },
  main: { flex: 1, padding: "24px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  title: { fontSize: "24px", color: "#1E293B", margin: 0 },
  headerLogout: { padding: "8px 16px", background: "#EF4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  searchBox: { marginBottom: "24px" },
  searchInput: { width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
  tableWrapper: { overflowX: "auto", background: "white", borderRadius: "8px", border: "1px solid #E2E8F0" },
  table: { width: "100%", borderCollapse: "collapse" },
  cellCode: { fontWeight: "500", fontFamily: "monospace" },
  badge: { padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", display: "inline-block" },
  viewBtn: { padding: "6px 14px", background: "#2563EB", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "500" },
  pagination: { display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px", alignItems: "center" },
  pageBtn: { padding: "6px 12px", border: "1px solid #CBD5E1", background: "white", borderRadius: "6px", cursor: "pointer" },
  pageInfo: { fontSize: "14px", color: "#475569" },
  loading: { textAlign: "center", padding: "40px", color: "#64748B" }
}