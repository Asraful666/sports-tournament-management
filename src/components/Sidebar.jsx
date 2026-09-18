import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    ["Dashboard", "/dashboard", "▦"],
    ["Tournaments", "/tournaments", "🏆"],
    ["Teams", "/teams", "👥"],
    ["Players", "/players", "⚽"],
    ["Matches", "/matches", "📅"],
    ["Venues", "/venues", "📍"],
    ["Referees", "/referees", "🧑‍⚖️"],
    ["Results", "/results", "📊"],
    ["Standings", "/standings", "🥇"],
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🏆</div>

        <div>
          <h2>STMS</h2>
          <span>Tournament Manager</span>
        </div>
      </div>

      <p className="menu-title">MAIN MENU</p>

      <nav>
        {menuItems.map(([name, path, icon]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>{icon}</span>
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/profile" className="nav-link">
          <span>👤</span>
          Profile
        </NavLink>

        <button className="logout">
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;