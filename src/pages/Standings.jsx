import { useState } from "react";

const tournaments = [
  {
    id: 1,
    name: "University Football Championship 2026",
  },
  {
    id: 2,
    name: "Inter Department Cricket Cup 2026",
  },
];

const teams = [
  {
    id: 1,
    name: "CSE Warriors",
  },
  {
    id: 2,
    name: "EEE Titans",
  },
  {
    id: 3,
    name: "BBA Strikers",
  },
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
  },
  {
    id: 4,
    tournamentId: 2,
    teamId: 1,
    played: 2,
    won: 1,
    draw: 1,
    lost: 0,
    goalsFor: 4,
    goalsAgainst: 2,
  },
  {
    id: 5,
    tournamentId: 2,
    teamId: 3,
    played: 2,
    won: 0,
    draw: 1,
    lost: 1,
    goalsFor: 2,
    goalsAgainst: 4,
  },
];

function Standings() {
  const [standings, setStandings] =
    useState(initialStandings);

  const [selectedTournament, setSelectedTournament] =
    useState("1");

  const [search, setSearch] = useState("");

  const getTeamName = (teamId) => {
    const team = teams.find(
      (item) => item.id === Number(teamId)
    );

    return team ? team.name : "Unknown Team";
  };

  const getTournamentName = (tournamentId) => {
    const tournament = tournaments.find(
      (item) =>
        item.id === Number(tournamentId)
    );

    return tournament
      ? tournament.name
      : "Unknown Tournament";
  };

  // Calculate points
  const calculatePoints = (standing) => {
    return (
      standing.won * 3 +
      standing.draw
    );
  };

  // Calculate goal difference
  const calculateGoalDifference = (standing) => {
    return (
      standing.goalsFor -
      standing.goalsAgainst
    );
  };

  // Filter standings
  const filteredStandings = standings
    .filter(
      (standing) =>
        standing.tournamentId ===
        Number(selectedTournament)
    )
    .filter((standing) =>
      getTeamName(standing.teamId)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const pointsDifference =
        calculatePoints(b) -
        calculatePoints(a);

      if (pointsDifference !== 0) {
        return pointsDifference;
      }

      return (
        calculateGoalDifference(b) -
        calculateGoalDifference(a)
      );
    });

  // Current tournament data
  const currentTournament =
    tournaments.find(
      (tournament) =>
        tournament.id ===
        Number(selectedTournament)
    );

  // Statistics
  const totalTeams =
    filteredStandings.length;

  const totalPlayed = filteredStandings.reduce(
    (total, item) =>
      total + item.played,
    0
  );

  const totalWins = filteredStandings.reduce(
    (total, item) =>
      total + item.won,
    0
  );

  const totalPoints = filteredStandings.reduce(
    (total, item) =>
      total + calculatePoints(item),
    0
  );

  // Update standings manually
  const handleUpdatePoints = () => {
    setStandings((previous) =>
      previous.map((standing) => ({
        ...standing,
      }))
    );

    alert(
      "Tournament standings updated successfully."
    );
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>Tournament Standings</h1>

          <p>
            View tournament points table and team
            performance
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleUpdatePoints}
        >
          ↻ Update Standings
        </button>

      </div>

      {/* TOURNAMENT SELECT */}
      <div className="standing-filter">

        <div className="form-group">
          <label>Select Tournament</label>

          <select
            value={selectedTournament}
            onChange={(e) =>
              setSelectedTournament(
                e.target.value
              )
            }
          >
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

        <div className="standing-search">

          <input
            type="search"
            className="search-input"
            placeholder="Search team..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* TOURNAMENT TITLE */}
      <div className="standing-title">

        <div>
          <span className="standing-label">
            CURRENT TOURNAMENT
          </span>

          <h2>
            {currentTournament?.name}
          </h2>
        </div>

        <div className="standing-trophy">
          🏆
        </div>

      </div>

      {/* STATS */}
      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Teams</span>
            <div className="card-icon">
              ⚽
            </div>
          </div>

          <h3>{totalTeams}</h3>

          <small>
            Participating teams
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Matches Played</span>
            <div className="card-icon">
              📅
            </div>
          </div>

          <h3>{totalPlayed}</h3>

          <small>
            Team match records
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Total Wins</span>
            <div className="card-icon">
              🥇
            </div>
          </div>

          <h3>{totalWins}</h3>

          <small>
            Recorded wins
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Total Points</span>
            <div className="card-icon">
              ⭐
            </div>
          </div>

          <h3>{totalPoints}</h3>

          <small>
            Current points
          </small>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-container standing-table">

        <table>

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

            {filteredStandings.length > 0 ? (
              filteredStandings.map(
                (standing, index) => {

                  const points =
                    calculatePoints(
                      standing
                    );

                  const goalDifference =
                    calculateGoalDifference(
                      standing
                    );

                  return (
                    <tr
                      key={standing.id}
                    >

                      {/* POSITION */}
                      <td>

                        <span
                          className={
                            index === 0
                              ? "position-badge first"
                              : "position-badge"
                          }
                        >
                          {index + 1}
                        </span>

                      </td>

                      {/* TEAM */}
                      <td>

                        <div className="standing-team">

                          {index === 0 && (
                            <span className="leader-icon">
                              👑
                            </span>
                          )}

                          <strong>
                            {getTeamName(
                              standing.teamId
                            )}
                          </strong>

                        </div>

                      </td>

                      {/* PLAYED */}
                      <td>
                        {standing.played}
                      </td>

                      {/* WON */}
                      <td>
                        <span className="stat-win">
                          {standing.won}
                        </span>
                      </td>

                      {/* DRAW */}
                      <td>
                        <span className="stat-draw">
                          {standing.draw}
                        </span>
                      </td>

                      {/* LOST */}
                      <td>
                        <span className="stat-loss">
                          {standing.lost}
                        </span>
                      </td>

                      {/* GOALS FOR */}
                      <td>
                        {standing.goalsFor}
                      </td>

                      {/* GOALS AGAINST */}
                      <td>
                        {standing.goalsAgainst}
                      </td>

                      {/* GOAL DIFFERENCE */}
                      <td>

                        <span
                          className={
                            goalDifference > 0
                              ? "goal-positive"
                              : goalDifference < 0
                              ? "goal-negative"
                              : "goal-neutral"
                          }
                        >
                          {goalDifference > 0
                            ? `+${goalDifference}`
                            : goalDifference}
                        </span>

                      </td>

                      {/* POINTS */}
                      <td>

                        <strong className="points-value">
                          {points}
                        </strong>

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="empty-message"
                >
                  No standings found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* POINTS RULE */}
      <div className="points-info">

        <h3>Points System</h3>

        <div className="points-rules">

          <div>
            <strong>Win</strong>
            <span>3 Points</span>
          </div>

          <div>
            <strong>Draw</strong>
            <span>1 Point</span>
          </div>

          <div>
            <strong>Loss</strong>
            <span>0 Points</span>
          </div>

          <div>
            <strong>GD</strong>
            <span>GF − GA</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Standings;