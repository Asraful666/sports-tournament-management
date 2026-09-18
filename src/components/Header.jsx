function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">☰</button>

        <div>
          <p className="header-small-text">
            Sports Tournament Management System
          </p>

          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="header-icon">
          🔔
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            A
          </div>

          <div className="user-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;