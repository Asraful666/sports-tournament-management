function Dashboard() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>
            Welcome to Sports Tournament Management System
          </p>
        </div>

        <button className="primary-btn">
          + Create Tournament
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div>
            <span className="stat-title">
              Total Tournaments
            </span>

            <h3>12</h3>

            <p className="stat-description">
              Active and completed tournaments
            </p>
          </div>

          <div className="stat-icon">
            🏆
          </div>
        </div>


        <div className="stat-card">
          <div>
            <span className="stat-title">
              Total Teams
            </span>

            <h3>48</h3>

            <p className="stat-description">
              Registered tournament teams
            </p>
          </div>

          <div className="stat-icon">
            👥
          </div>
        </div>


        <div className="stat-card">
          <div>
            <span className="stat-title">
              Total Players
            </span>

            <h3>384</h3>

            <p className="stat-description">
              Registered players
            </p>
          </div>

          <div className="stat-icon">
            ⚽
          </div>
        </div>


        <div className="stat-card">
          <div>
            <span className="stat-title">
              Total Matches
            </span>

            <h3>96</h3>

            <p className="stat-description">
              Scheduled and completed matches
            </p>
          </div>

          <div className="stat-icon">
            📅
          </div>
        </div>

      </div>


      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Matches</h3>
              <p>Latest tournament matches</p>
            </div>

            <button className="text-btn">
              View All
            </button>
          </div>

          <div className="empty-state">
            <span>📅</span>
            <p>No recent matches available.</p>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Upcoming Matches</h3>
              <p>Next scheduled matches</p>
            </div>

            <button className="text-btn">
              View All
            </button>
          </div>

          <div className="empty-state">
            <span>🏟️</span>
            <p>No upcoming matches available.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;