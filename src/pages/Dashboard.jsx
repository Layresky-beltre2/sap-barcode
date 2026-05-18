import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1120",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      color: "#E2E8F0"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 32px",
        borderBottom: "1px solid #1E293B",
        background: "rgba(11,17,32,0.8)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ fontWeight: "bold", fontSize: "20px", background: "linear-gradient(135deg, #A78BFA, #60A5FA)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>📘 SAP Dashboard</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span style={{ color: "#94A3B8" }}>Grace Stanley</span>
          <button onClick={() => navigate("/")} style={{
            background: "none",
            border: "1px solid #334155",
            color: "#CBD5E1",
            padding: "6px 14px",
            borderRadius: "40px",
            cursor: "pointer",
            fontSize: "13px",
            transition: "0.2s"
          }}>Log Out</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", padding: "28px 32px" }}>
        {/* Sidebar */}
        <div style={{ width: "240px", flexShrink: 0 }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "20px", color: "#A78BFA", letterSpacing: "0.5px" }}>Smart</div>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Dashboard", "Lessons", "Schedule", "Materials", "Forum", "Assessments", "Settings"].map(item => (
                <li key={item} style={{ padding: "8px 12px", borderRadius: "14px", background: item === "Dashboard" ? "#1E293B" : "transparent", fontWeight: item === "Dashboard" ? "500" : "400", cursor: "default" }}>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#111827", borderRadius: "24px", padding: "18px", marginTop: "20px", border: "1px solid #1E293B" }}>
            <div style={{ fontWeight: "500", marginBottom: "12px" }}>📅 My visit</div>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>78%</div>
            <div style={{ fontSize: "13px", color: "#9CA3AF" }}>December progress</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          {/* Welcome + search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "26px", margin: "0 0 6px 0" }}>Hello Grace!</h1>
              <p style={{ color: "#9CA3AF", margin: 0 }}>You have <strong style={{ color: "#F97316" }}>3 new tasks</strong>. It is a lot of work for today! So let's start!</p>
            </div>
            <div style={{ background: "#111827", padding: "8px 16px", borderRadius: "40px", border: "1px solid #2D3A5E" }}>🔍 Search</div>
          </div>

          {/* Performance + Calendar row */}
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "32px" }}>
            <div style={{ flex: 1.5, background: "#111827", borderRadius: "28px", padding: "20px", border: "1px solid #1E293B" }}>
              <h3 style={{ marginTop: 0 }}>Performance ⚡</h3>
              <p style={{ fontSize: "13px", color: "#9CA3AF" }}>The best lessons:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
                {["Introduction to programming 95.4%", "Algorithms structures 92%", "Object programming 83%", "Machine learning 78%", "Mobile application 97%", "Database development 96%", "Web design 89%"].map(sub => {
                  const [name, perc] = sub.split(" ")
                  return <div key={name} style={{ background: "#0F172A", padding: "8px 16px", borderRadius: "40px", fontSize: "13px" }}>{name} <span style={{ color: "#A78BFA", fontWeight: "bold" }}>{perc}</span></div>
                })}
              </div>
            </div>

            <div style={{ flex: 1, background: "#111827", borderRadius: "28px", padding: "20px", border: "1px solid #1E293B" }}>
              <h3 style={{ marginTop: 0 }}>📅 Calendar</h3>
              <p style={{ fontSize: "13px", color: "#9CA3AF" }}>6 events today</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "12px" }}>⚡ Electronics lesson · 9:45 - 10:30</li>
                <li style={{ marginBottom: "12px" }}>🤖 Robotics lesson · 11:00 - 11:40</li>
                <li style={{ marginBottom: "12px" }}>🔌 Electronics lesson · 11:00 - 11:40</li>
                <li>📘 C++ lesson · 13:45 - 14:30</li>
              </ul>
            </div>
          </div>

          {/* All lessons list + timeline */}
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, background: "#111827", borderRadius: "28px", padding: "20px", border: "1px solid #1E293B" }}>
              <h3>📚 All lessons</h3>
              {["Algorithms structures", "Object programming", "Machine learning", "Database development", "Web design"].map((l, i) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 4 ? "1px solid #1E293B" : "none" }}>
                  <span>{l}</span> <span style={{ color: "#A78BFA" }}>{[92,83,78,96,89][i]}%</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, background: "#111827", borderRadius: "28px", padding: "20px", border: "1px solid #1E293B" }}>
              <h3>⏰ Schedule</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"].map(time => (
                  <div key={time} style={{ fontSize: "13px", padding: "4px 0", borderBottom: "1px dashed #1E293B" }}>{time}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}