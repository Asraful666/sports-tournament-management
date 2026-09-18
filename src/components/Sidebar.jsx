import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      title: "Tournaments",
      path: "/tournaments",
      icon: "🏆",
    },
    {
      title: "Teams",
      path: "/teams",
      icon: "👥",
    },
    {
      title: "Players",
      path: "/players",
      icon: "⚽",
    },
    {
      title: "Matches",
      path: "/matches",
      icon: "📅",
    },
    {
      title: "Venues",
      path: "/venues",
      icon: "📍",
    },
    {
      title: "Referees",
      path: "/referees",
      icon: "🧑‍⚖️",
    },
    {
      title: "Results",
      path: "/results",
      icon: "📊",
    },
    {
      title: "Standings",
      path: "/standings",
      icon: "🥇",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🏆</div>

        <div>
          <h2>STMS</h2>
          <span>Tournament Manager</span>
        </div>
      </div>

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </NavLink>

        <button className="logout-btn">
          <span className="nav-icon">↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;