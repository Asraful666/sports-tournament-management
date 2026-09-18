const recentResults = [
  {
    home: "Eagles FC",
    away: "Tiger United",
    score: "2 - 1",
    date: "18 Sep 2026",
  },
  {
    home: "Blue Warriors",
    away: "Red Lions",
    score: "1 - 1",
    date: "17 Sep 2026",
  },
  {
    home: "Green Stars",
    away: "Falcon FC",
    score: "3 - 0",
    date: "16 Sep 2026",
  },
];

const upcomingMatches = [
  {
    home: "Eagles FC",
    away: "Blue Warriors",
    date: "20 Sep 2026",
    time: "4:00 PM",
  },
  {
    home: "Tiger United",
    away: "Red Lions",
    date: "21 Sep 2026",
    time: "5:00 PM",
  },
  {
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

        <button className="primary-btn">
          + Create Tournament
        </button>
      </div>


      {/* Statistics */}

      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Tournaments</span>
            <div className="card-icon">🏆</div>
          </div>

          <h3>12</h3>

          <small>
            Active and completed tournaments
          </small>
        </div>


        <div className="card">
          <div className="card-top">
            <span>Total Teams</span>
            <div className="card-icon">👥</div>
          </div>

          <h3>48</h3>

          <small>
            Registered tournament teams
          </small>
        </div>


        <div className="card">
          <div className="card-top">
            <span>Total Players</span>
            <div className="card-icon">⚽</div>
          </div>

          <h3>384</h3>

          <small>
            Registered players
          </small>
        </div>


        <div className="card">
          <div className="card-top">
            <span>Total Matches</span>
            <div className="card-icon">📅</div>
          </div>

          <h3>96</h3>

          <small>
            Scheduled tournament matches
          </small>
        </div>

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

        <button className="quick-action">
          <span>🏆</span>
          <div>
            <strong>Create Tournament</strong>
            <small>Add a new tournament</small>
          </div>
        </button>


        <button className="quick-action">
          <span>👥</span>
          <div>
            <strong>Register Team</strong>
            <small>Add a new team</small>
          </div>
        </button>


        <button className="quick-action">
          <span>⚽</span>
          <div>
            <strong>Add Player</strong>
            <small>Register player information</small>
          </div>
        </button>


        <button className="quick-action">
          <span>📅</span>
          <div>
            <strong>Create Fixture</strong>
            <small>Schedule a match</small>
          </div>
        </button>

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

            <button className="view-btn">
              View All
            </button>

          </div>


          <div className="match-list">

            {recentResults.map((match, index) => (
              <div
                className="match-item"
                key={index}
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

            <button className="view-btn">
              View All
            </button>

          </div>


          <div className="match-list">

            {upcomingMatches.map((match, index) => (
              <div
                className="match-item"
                key={index}
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


      {/* Standings */}

      <div className="dashboard-box standings-box">

        <div className="box-header">

          <div>
            <h3>Tournament Standings</h3>

            <p>
              Current tournament points table
            </p>
          </div>

          <button className="view-btn">
            View Full Table
          </button>

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
                <tr key={team.position}>

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