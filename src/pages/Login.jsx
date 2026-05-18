import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    serviceLayer: "",
    companyDB: "",
    username: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de autenticación SAP
    if (formData.serviceLayer && formData.companyDB && formData.username && formData.password) {
      localStorage.setItem("sap_session", JSON.stringify({
        ...formData,
        loggedIn: true,
        timestamp: Date.now()
      }))
      navigate("/articulos")
    } else {
      setError("Todos los campos son obligatorios")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F0F4F8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "450px",
        width: "100%",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "32px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏭</div>
          <h1 style={{ fontSize: "24px", color: "#1E293B", margin: 0 }}>SAP Business One</h1>
          <p style={{ color: "#64748B", fontSize: "14px", marginTop: "8px" }}>Service Layer Connection</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Service Layer URL (ej: http://localhost:50000)"
            style={inputStyle}
            value={formData.serviceLayer}
            onChange={(e) => setFormData({...formData, serviceLayer: e.target.value})}
          />
          <input
            type="text"
            placeholder="CompanyDB"
            style={inputStyle}
            value={formData.companyDB}
            onChange={(e) => setFormData({...formData, companyDB: e.target.value})}
          />
          <input
            type="text"
            placeholder="Usuario"
            style={inputStyle}
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={inputStyle}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          {error && <div style={{ color: "#EF4444", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
          
          <button type="submit" style={buttonStyle}>
            Conectar a SAP
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #E2E8F0", fontSize: "12px", color: "#94A3B8", textAlign: "center" }}>
          Demo: cualquier credencial válida (simulado)
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "16px",
  border: "1px solid #CBD5E1",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none"
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer"
}