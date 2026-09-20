import { useState } from "react";

function Results() {
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
    {
      id: 4,
      name: "Civil United",
    },
  ];

  const [matches] = useState([
    {
      id: 1,
      tournamentId: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      matchDate: "2026-09-20",
    },
    {
      id: 2,
      tournamentId: 1,
      homeTeamId: 3,
      awayTeamId: 4,
      matchDate: "2026-09-22",
    },
    {
      id: 3,
      tournamentId: 2,
      homeTeamId: 1,
      awayTeamId: 3,
      matchDate: "2026-09-25",
    },
  ]);

  const [results, setResults] = useState([
    {
      id: 1,
      matchId: 1,
      team1Score: 2,
      team2Score: 1,
      winnerTeamId: 1,
      notes: "CSE Warriors won the match.",
    },
    {
      id: 2,
      matchId: 2,
      team1Score: 1,
      team2Score: 1,
      winnerTeamId: null,
      notes: "Match ended in a draw.",
    },
  ]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [tournamentFilter, setTournamentFilter] =
    useState("all");

  const [winnerFilter, setWinnerFilter] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingResult, setEditingResult] =
    useState(null);

  const [formData, setFormData] = useState({
    matchId: "",
    team1Score: "",
    team2Score: "",
    notes: "",
  });

  const getTeamName = (teamId) => {
    const team = teams.find(
      (item) => item.id === Number(teamId)
    );

    return team
      ? team.name
      : "Unknown Team";
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

  const getMatch = (matchId) => {
    return matches.find(
      (match) => match.id === Number(matchId)
    );
  };

  const getWinnerName = (result) => {
    if (!result.winnerTeamId) {
      return "Draw";
    }

    return getTeamName(result.winnerTeamId);
  };

  const getWinnerClass = (result) => {
    if (!result.winnerTeamId) {
      return "draw";
    }

    return "winner";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const calculateWinner = (
    team1Score,
    team2Score,
    match
  ) => {
    const score1 = Number(team1Score);
    const score2 = Number(team2Score);

    if (score1 > score2) {
      return match.homeTeamId;
    }

    if (score2 > score1) {
      return match.awayTeamId;
    }

    return null;
  };

  const openAddModal = () => {
    setEditingResult(null);

    setFormData({
      matchId: "",
      team1Score: "",
      team2Score: "",
      notes: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (result) => {
    setEditingResult(result);

    setFormData({
      matchId: result.matchId,
      team1Score: result.team1Score,
      team2Score: result.team2Score,
      notes: result.notes,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.matchId ||
      formData.team1Score === "" ||
      formData.team2Score === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const match = getMatch(formData.matchId);

    if (!match) {
      alert("Selected match not found.");
      return;
    }

    const team1Score = Number(
      formData.team1Score
    );

    const team2Score = Number(
      formData.team2Score
    );

    if (
      team1Score < 0 ||
      team2Score < 0
    ) {
      alert("Score cannot be negative.");
      return;
    }

    const winnerTeamId = calculateWinner(
      team1Score,
      team2Score,
      match
    );

    if (editingResult) {
      setResults((previous) =>
        previous.map((result) =>
          result.id === editingResult.id
            ? {
                ...result,
                matchId: Number(
                  formData.matchId
                ),
                team1Score,
                team2Score,
                winnerTeamId,
                notes: formData.notes,
              }
            : result
        )
      );

      alert("Result updated successfully!");
    } else {
      const alreadyExists = results.some(
        (result) =>
          result.matchId ===
          Number(formData.matchId)
      );

      if (alreadyExists) {
        alert(
          "This match already has a result."
        );
        return;
      }

      const newResult = {
        id: Date.now(),
        matchId: Number(
          formData.matchId
        ),
        team1Score,
        team2Score,
        winnerTeamId,
        notes: formData.notes,
      };

      setResults((previous) => [
        ...previous,
        newResult,
      ]);

      alert("Result added successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmed) return;

    setResults((previous) =>
      previous.filter(
        (result) => result.id !== id
      )
    );
  };

  const filteredResults = results.filter(
    (result) => {
      const match = getMatch(
        result.matchId
      );

      if (!match) {
        return false;
      }

      const homeTeam = getTeamName(
        match.homeTeamId
      ).toLowerCase();

      const awayTeam = getTeamName(
        match.awayTeamId
      ).toLowerCase();

      const search = searchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        homeTeam.includes(search) ||
        awayTeam.includes(search);

      const matchesTournament =
        tournamentFilter === "all" ||
        match.tournamentId ===
          Number(tournamentFilter);

      const matchesWinner =
        winnerFilter === "all" ||
        (winnerFilter === "draw" &&
          result.winnerTeamId === null) ||
        Number(winnerFilter) ===
          result.winnerTeamId;

      return (
        matchesSearch &&
        matchesTournament &&
        matchesWinner
      );
    }
  );

  const totalResults = results.length;

  const completedMatches =
    results.length;

  const drawMatches = results.filter(
    (result) =>
      result.winnerTeamId === null
  ).length;

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Match Result Management</h1>

          <p>
            Manage match scores and tournament
            results.
          </p>
        </div>

        {/* ONLY ONE ADD RESULT BUTTON */}
        <button
          className="primary-btn"
          onClick={openAddModal}
        >
          + Add Result
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-icon">
            🏆
          </div>

          <div>
            <h3>{totalResults}</h3>
            <p>Total Results</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            ✅
          </div>

          <div>
            <h3>{completedMatches}</h3>
            <p>Completed Matches</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            🤝
          </div>

          <div>
            <h3>{drawMatches}</h3>
            <p>Draw Matches</p>
          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search team..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={tournamentFilter}
          onChange={(e) =>
            setTournamentFilter(
              e.target.value
            )
          }
          style={{
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "15px",
            background: "white",
            outline: "none",
          }}
        >
          <option value="all">
            All Tournaments
          </option>

          {tournaments.map(
            (tournament) => (
              <option
                key={tournament.id}
                value={tournament.id}
              >
                {tournament.name}
              </option>
            )
          )}
        </select>

        <select
          value={winnerFilter}
          onChange={(e) =>
            setWinnerFilter(e.target.value)
          }
          style={{
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "15px",
            background: "white",
            outline: "none",
          }}
        >
          <option value="all">
            All Results
          </option>

          <option value="draw">
            Draw
          </option>

          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              Won by {team.name}
            </option>
          ))}
        </select>

      </div>

      {/* RESULT TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Tournament</th>
              <th>Match</th>
              <th>Score</th>
              <th>Winner</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredResults.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="empty-message"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              filteredResults.map(
                (result, index) => {
                  const match = getMatch(
                    result.matchId
                  );

                  return (
                    <tr key={result.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {getTournamentName(
                          match.tournamentId
                        )}
                      </td>

                      <td>
                        <strong>
                          {getTeamName(
                            match.homeTeamId
                          )}
                        </strong>

                        <span> vs </span>

                        <strong>
                          {getTeamName(
                            match.awayTeamId
                          )}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {result.team1Score}
                        </strong>

                        <span> - </span>

                        <strong>
                          {result.team2Score}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`result-winner ${getWinnerClass(
                            result
                          )}`}
                        >
                          {getWinnerName(
                            result
                          )}
                        </span>
                      </td>

                      <td>
                        {result.notes || "—"}
                      </td>

                      <td>
                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              openEditModal(
                                result
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                result.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                }
              )
            )}

          </tbody>

        </table>

      </div>

      {/* ADD / EDIT RESULT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">

          <div className="modal result-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingResult
                    ? "Edit Result"
                    : "Add Result"}
                </h2>

                <p>
                  {editingResult
                    ? "Update match result."
                    : "Enter the final match result."}
                </p>

              </div>

              <button
                className="close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="result-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>
                  Match
                </label>

                <select
                  name="matchId"
                  value={formData.matchId}
                  onChange={handleChange}
                  disabled={Boolean(
                    editingResult
                  )}
                >

                  <option value="">
                    Select Match
                  </option>

                  {matches.map((match) => (
                    <option
                      key={match.id}
                      value={match.id}
                    >
                      {getTeamName(
                        match.homeTeamId
                      )}{" "}
                      vs{" "}
                      {getTeamName(
                        match.awayTeamId
                      )}{" "}
                      -{" "}
                      {match.matchDate}
                    </option>
                  ))}

                </select>

              </div>

              {formData.matchId && (
                <div className="selected-match-box">

                  <strong>
                    {(() => {
                      const match =
                        getMatch(
                          formData.matchId
                        );

                      return match
                        ? `${getTeamName(
                            match.homeTeamId
                          )} vs ${getTeamName(
                            match.awayTeamId
                          )}`
                        : "";
                    })()}
                  </strong>

                </div>
              )}

              <div className="score-input-grid">

                <div className="form-group">

                  <label>
                    Team 1 Score
                  </label>

                  <input
                    type="number"
                    name="team1Score"
                    min="0"
                    placeholder="0"
                    value={
                      formData.team1Score
                    }
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>
                    Team 2 Score
                  </label>

                  <input
                    type="number"
                    name="team2Score"
                    min="0"
                    placeholder="0"
                    value={
                      formData.team2Score
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

              {formData.matchId &&
                formData.team1Score !== "" &&
                formData.team2Score !== "" && (
                  <div className="winner-preview">

                    <strong>
                      Winner:
                    </strong>{" "}

                    {(() => {
                      const match =
                        getMatch(
                          formData.matchId
                        );

                      if (!match) {
                        return "";
                      }

                      const winner =
                        calculateWinner(
                          formData.team1Score,
                          formData.team2Score,
                          match
                        );

                      return winner
                        ? getTeamName(winner)
                        : "Draw";
                    })()}

                  </div>
                )}

              <div className="form-group">

                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  placeholder="Enter result notes..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingResult
                    ? "Update Result"
                    : "Save Result"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Results;