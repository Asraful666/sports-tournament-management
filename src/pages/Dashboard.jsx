import { Link } from "react-router-dom";

const statistics = [
  {
    title: "Total Tournaments",
    value: 12,
    icon: "🏆",
    description: "Active and completed tournaments",
  },
  {
    title: "Total Teams",
    value: 48,
    icon: "👥",
    description: "Registered tournament teams",
  },
  {
    title: "Total Players",
    value: 384,
    icon: "⚽",
    description: "Registered players",
  },
  {
    title: "Total Matches",
    value: 96,
    icon: "📅",
    description: "Scheduled tournament matches",
  },
];

const quickActions = [
  {
    title: "Create Tournament",
    description: "Add a new tournament",
    icon: "🏆",
    path: "/tournaments",
  },
  {
    title: "Register Team",
    description: "Add a new team",
    icon: "👥",
    path: "/teams",
  },
  {
    title: "Add Player",
    description: "Register player information",
    icon: "⚽",
    path: "/players",
  },
  {
    title: "Create Fixture",
    description: "Schedule a match",
    icon: "📅",
    path: "/matches",
  },
];

const recentResults = [
  {
    id: 1,
    home: "Eagles FC",
    away: "Tiger United",
    score: "2 - 1",
    date: "18 Sep 2026",
  },
  {
    id: 2,
    home: "Blue Warriors",
    away: "Red Lions",
    score: "1 - 1",
    date: "17 Sep 2026",
  },
  {
    id: 3,
    home: "Green Stars",
    away: "Falcon FC",
    score: "3 - 0",
    date: "16 Sep 2026",
  },
];

const upcomingMatches = [
  {
    id: 1,
    home: "Eagles FC",
    away: "Blue Warriors",
    date: "20 Sep 2026",
    time: "4:00 PM",
  },
  {
    id: 2,
    home: "Tiger United",
    away: "Red Lions",
    date: "21 Sep 2026",
    time: "5:00 PM",
  },
  {
    id: 3,
    home: "Falcon FC",
    away: "Green Stars",
    date: "22 Sep 2026",
    time: "4:30 PM",
  },
];

const standings = [
  {
    position: 1,
    team: "Eagles FC",
    played: 5,
    won: 4,
    points: 12,
  },
  {
    position: 2,
    team: "Blue Warriors",
    played: 5,
    won: 3,
    points: 10,
  },
  {
    position: 3,
    team: "Tiger United",
    played: 5,
    won: 2,
    points: 7,
  },
  {
    position: 4,
    team: "Red Lions",
    played: 5,
    won: 1,
    points: 4,
  },
];

function Dashboard() {
  return (
    <div>
      {/* Page Heading */}

      <div className="page-title">
        <div>
          <h2>Dashboard</h2>

          <p>
            Overview of your sports tournament management system.
          </p>
        </div>

        <Link to="/tournaments" className="primary-btn">
          + Create Tournament
        </Link>
      </div>

      {/* Statistics */}

      <div className="stats">
        {statistics.map((stat) => (
          <div className="card" key={stat.title}>
            <div className="card-top">
              <span>{stat.title}</span>

              <div className="card-icon">
                {stat.icon}
              </div>
            </div>

            <h3>{stat.value}</h3>

            <small>{stat.description}</small>
          </div>
        ))}
      </div>

      {/* Quick Actions */}

      <div className="section-heading">
        <div>
          <h3>Quick Actions</h3>

          <p>
            Frequently used tournament management actions.
          </p>
        </div>
      </div>

      <div className="quick-actions">
        {quickActions.map((action) => (
          <Link
            to={action.path}
            className="quick-action"
            key={action.title}
          >
            <span>{action.icon}</span>

            <div>
              <strong>{action.title}</strong>

              <small>{action.description}</small>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Results + Upcoming Matches */}

      <div className="dashboard-grid">
        {/* Recent Results */}

        <div className="dashboard-box">
          <div className="box-header">
            <div>
              <h3>Recent Results</h3>

              <p>Latest completed matches</p>
            </div>

            <Link to="/results" className="view-btn">
              View All
            </Link>
          </div>

          <div className="match-list">
            {recentResults.map((match) => (
              <div
                className="match-item"
                key={match.id}
              >
                <div className="team-names">
                  <strong>{match.home}</strong>

                  <span>vs</span>

                  <strong>{match.away}</strong>
                </div>

                <div className="match-score">
                  <strong>{match.score}</strong>

                  <small>{match.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Matches */}

        <div className="dashboard-box">
          <div className="box-header">
            <div>
              <h3>Upcoming Matches</h3>

              <p>Next scheduled fixtures</p>
            </div>

            <Link to="/matches" className="view-btn">
              View All
            </Link>
          </div>

          <div className="match-list">
            {upcomingMatches.map((match) => (
              <div
                className="match-item"
                key={match.id}
              >
                <div className="team-names">
                  <strong>{match.home}</strong>

                  <span>vs</span>

                  <strong>{match.away}</strong>
                </div>

                <div className="match-score">
                  <strong>{match.time}</strong>

                  <small>{match.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Standings */}

      <div className="dashboard-box standings-box">
        <div className="box-header">
          <div>
            <h3>Tournament Standings</h3>

            <p>
              Current tournament points table
            </p>
          </div>

          <Link to="/standings" className="view-btn">
            View Full Table
          </Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((team) => (
                <tr key={team.team}>
                  <td>
                    <strong>{team.position}</strong>
                  </td>

                  <td>
                    <strong>{team.team}</strong>
                  </td>

                  <td>{team.played}</td>

                  <td>{team.won}</td>

                  <td>
                    <strong>{team.points}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;