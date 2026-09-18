function Header() {
  return (
    <header className="header">

      <div>
        <small>Sports Tournament Management System</small>
        <h1>Dashboard</h1>
      </div>

      <div className="header-right">

        <input
          type="text"
          placeholder="Search..."
          className="search"
        />

        <button className="notification">
          🔔
        </button>

        <div className="profile">
          <div className="avatar">A</div>

          <div>
            <strong>Admin User</strong>
            <small>Administrator</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;