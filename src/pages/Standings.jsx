import { useMemo, useState } from "react";

function Standings() {
  const tournaments = [
    {
      id: 1,
      name: "SIU Football Championship 2026",
    },
    {
      id: 2,
      name: "Inter Department Cricket Cup",
    },
    {
      id: 3,
      name: "University Basketball League",
    },
  ];

  const teams = [
    { id: 1, name: "CSE Warriors" },
    { id: 2, name: "EEE Titans" },
    { id: 3, name: "BBA Strikers" },
    { id: 4, name: "Civil United" },
  ];

  const initialStandings = [
    {
      id: 1,
      tournamentId: 1,
      teamId: 1,
      played: 3,
      won: 2,
      draw: 1,
      lost: 0,
      goalsFor: 7,
      goalsAgainst: 3,
      goalDifference: 4,
      points: 7,
    },
    {
      id: 2,
      tournamentId: 1,
      teamId: 2,
      played: 3,
      won: 1,
      draw: 1,
      lost: 1,
      goalsFor: 5,
      goalsAgainst: 5,
      goalDifference: 0,
      points: 4,
    },
    {
      id: 3,
      tournamentId: 1,
      teamId: 3,
      played: 3,
      won: 0,
      draw: 1,
      lost: 2,
      goalsFor: 2,
      goalsAgainst: 6,
      goalDifference: -4,
      points: 1,
    },
    {
      id: 4,
      tournamentId: 1,
      teamId: 4,
      played: 3,
      won: 1,
      draw: 1,
      lost: 1,
      goalsFor: 4,
      goalsAgainst: 4,
      goalDifference: 0,
      points: 4,
    },
    {
      id: 5,
      tournamentId: 2,
      teamId: 1,
      played: 2,
      won: 2,
      draw: 0,
      lost: 0,
      goalsFor: 6,
      goalsAgainst: 2,
      goalDifference: 4,
      points: 6,
    },
    {
      id: 6,
      tournamentId: 2,
      teamId: 3,
      played: 2,
      won: 1,
      draw: 0,
      lost: 1,
      goalsFor: 4,
      goalsAgainst: 4,
      goalDifference: 0,
      points: 3,
    },
  ];

  const [standings] = useState(initialStandings);

  const [selectedTournament, setSelectedTournament] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");

  const getTeamName = (teamId) => {
    const team = teams.find((item) => item.id === teamId);

    return team ? team.name : "Unknown Team";
  };

  const getTournamentName = (tournamentId) => {
    const tournament = tournaments.find(
      (item) => item.id === tournamentId
    );

    return tournament ? tournament.name : "Unknown Tournament";
  };

  const filteredStandings = useMemo(() => {
    return standings
      .filter((standing) => {
        const tournamentMatch =
          selectedTournament === "all" ||
          standing.tournamentId === Number(selectedTournament);

        const teamName = getTeamName(standing.teamId).toLowerCase();

        const searchMatch = teamName.includes(
          searchTerm.toLowerCase()
        );

        return tournamentMatch && searchMatch;
      })
      .sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }

        return b.goalDifference - a.goalDifference;
      });
  }, [standings, selectedTournament, searchTerm]);

  const totalTeams = filteredStandings.length;

  const totalPlayed = filteredStandings.reduce(
    (total, item) => total + item.played,
    0
  );

  const totalPoints = filteredStandings.reduce(
    (total, item) => total + item.points,
    0
  );

  const handleUpdateStandings = () => {
    alert("Tournament standings updated successfully!");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Tournament Standings</h1>
          <p>
            View team performance, points and tournament rankings.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleUpdateStandings}
        >
          Update Standings
        </button>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon">🏆</div>
          <div>
            <h3>{totalTeams}</h3>
            <p>Teams</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">⚽</div>
          <div>
            <h3>{totalPlayed}</h3>
            <p>Matches Played</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">⭐</div>
          <div>
            <h3>{totalPoints}</h3>
            <p>Total Points</p>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search team..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="standing-filter"
          value={selectedTournament}
          onChange={(e) =>
            setSelectedTournament(e.target.value)
          }
        >
          <option value="all">All Tournaments</option>

          {tournaments.map((tournament) => (
            <option
              key={tournament.id}
              value={tournament.id}
            >
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTournament !== "all" && (
        <div className="standing-title">
          <h2>
            {getTournamentName(Number(selectedTournament))}
          </h2>

          <p>
            Points are calculated using 3 points for a win,
            1 point for a draw and 0 points for a loss.
          </p>
        </div>
      )}

      <div className="table-container">
        {filteredStandings.length === 0 ? (
          <div className="empty-message">
            No standing data found.
          </div>
        ) : (
          <table className="standing-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {filteredStandings.map((standing, index) => (
                <tr key={standing.id}>
                  <td>
                    <strong>{index + 1}</strong>
                  </td>

                  <td>
                    <strong>
                      {getTeamName(standing.teamId)}
                    </strong>
                  </td>

                  <td>{standing.played}</td>
                  <td>{standing.won}</td>
                  <td>{standing.draw}</td>
                  <td>{standing.lost}</td>
                  <td>{standing.goalsFor}</td>
                  <td>{standing.goalsAgainst}</td>

                  <td>
                    <strong>
                      {standing.goalDifference > 0
                        ? `+${standing.goalDifference}`
                        : standing.goalDifference}
                    </strong>
                  </td>

                  <td>
                    <strong>{standing.points}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="points-info">
        <strong>Points System:</strong>

        <span>Win = 3 Points</span>
        <span>Draw = 1 Point</span>
        <span>Loss = 0 Points</span>
      </div>
    </div>
  );
}

export default Standings;