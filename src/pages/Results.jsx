import { useState } from "react";

const matches = [
  {
    id: 1,
    tournament: "University Football Championship 2026",
    homeTeam: "CSE Warriors",
    awayTeam: "EEE Titans",
    date: "2026-10-05",
  },
  {
    id: 2,
    tournament: "University Football Championship 2026",
    homeTeam: "EEE Titans",
    awayTeam: "BBA Strikers",
    date: "2026-10-07",
  },
  {
    id: 3,
    tournament: "Inter Department Cricket Cup 2026",
    homeTeam: "CSE Warriors",
    awayTeam: "BBA Strikers",
    date: "2026-10-10",
  },
];

const initialResults = [
  {
    id: 1,
    matchId: 1,
    team1Score: 3,
    team2Score: 1,
    winner: "CSE Warriors",
    notes: "CSE Warriors won the semi final.",
  },
  {
    id: 2,
    matchId: 2,
    team1Score: 2,
    team2Score: 2,
    winner: "Draw",
    notes: "Both teams finished with equal scores.",
  },
];

const emptyForm = {
  matchId: "",
  team1Score: "",
  team2Score: "",
  notes: "",
};

function Results() {
  const [results, setResults] = useState(initialResults);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const isEditing = editingId !== null;

  // Find match
  const getMatch = (matchId) => {
    return matches.find(
      (match) => match.id === Number(matchId)
    );
  };

  // Get match name
  const getMatchName = (matchId) => {
    const match = getMatch(matchId);

    if (!match) {
      return "Unknown Match";
    }

    return `${match.homeTeam} vs ${match.awayTeam}`;
  };

  // Calculate winner
  const getWinner = (matchId, score1, score2) => {
    const match = getMatch(matchId);

    if (!match) {
      return "Unknown";
    }

    const team1Score = Number(score1);
    const team2Score = Number(score2);

    if (team1Score > team2Score) {
      return match.homeTeam;
    }

    if (team2Score > team1Score) {
      return match.awayTeam;
    }

    return "Draw";
  };

  // Search
  const filteredResults = results.filter((result) => {
    const match = getMatch(result.matchId);

    if (!match) {
      return false;
    }

    const searchText = search.toLowerCase();

    return (
      match.homeTeam
        .toLowerCase()
        .includes(searchText) ||
      match.awayTeam
        .toLowerCase()
        .includes(searchText) ||
      match.tournament
        .toLowerCase()
        .includes(searchText) ||
      result.winner
        .toLowerCase()
        .includes(searchText)
    );
  });

  // Open Add modal
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // Open Edit modal
  const handleEdit = (result) => {
    setEditingId(result.id);

    setFormData({
      matchId: String(result.matchId),
      team1Score: String(result.team1Score),
      team2Score: String(result.team2Score),
      notes: result.notes,
    });

    setShowModal(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit result
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

    if (
      Number(formData.team1Score) < 0 ||
      Number(formData.team2Score) < 0
    ) {
      alert("Score cannot be negative.");
      return;
    }

    // Prevent duplicate result for another match
    const duplicateResult = results.find(
      (result) =>
        result.matchId === Number(formData.matchId) &&
        result.id !== editingId
    );

    if (duplicateResult) {
      alert(
        "This match already has a result. Please edit the existing result."
      );
      return;
    }

    const match = getMatch(formData.matchId);

    const winner = getWinner(
      formData.matchId,
      formData.team1Score,
      formData.team2Score
    );

    const resultData = {
      matchId: Number(formData.matchId),
      team1Score: Number(formData.team1Score),
      team2Score: Number(formData.team2Score),
      winner,
      notes:
        formData.notes.trim() ||
        `${winner} result recorded.`,
    };

    if (isEditing) {
      setResults((previous) =>
        previous.map((result) =>
          result.id === editingId
            ? {
                ...result,
                ...resultData,
              }
            : result
        )
      );

      alert("Result updated successfully.");
    } else {
      const newResult = {
        id: Date.now(),
        ...resultData,
      };

      setResults((previous) => [
        ...previous,
        newResult,
      ]);

      alert(
        `${match.homeTeam} vs ${match.awayTeam} result added successfully.`
      );
    }

    closeModal();
  };

  // Delete
  const handleDelete = (id) => {
    const result = results.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete the result of ${getMatchName(
        result?.matchId
      )}?`
    );

    if (!confirmed) {
      return;
    }

    setResults((previous) =>
      previous.filter((result) => result.id !== id)
    );
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  // Statistics
  const totalResults = results.length;

  const totalWins = results.filter(
    (result) => result.winner !== "Draw"
  ).length;

  const totalDraws = results.filter(
    (result) => result.winner === "Draw"
  ).length;

  const pendingResults =
    matches.length - results.length;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Result Management</h1>
          <p>
            Record and manage tournament match results
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Result
        </button>
      </div>

      {/* STATS */}
      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Results</span>
            <div className="card-icon">📋</div>
          </div>

          <h3>{totalResults}</h3>

          <small>
            Recorded match results
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Completed Matches</span>
            <div className="card-icon">✅</div>
          </div>

          <h3>{totalResults}</h3>

          <small>
            Matches with results
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Draws</span>
            <div className="card-icon">🤝</div>
          </div>

          <h3>{totalDraws}</h3>

          <small>
            Draw results
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Pending</span>
            <div className="card-icon">⏳</div>
          </div>

          <h3>
            {pendingResults > 0
              ? pendingResults
              : 0}
          </h3>

          <small>
            Matches without result
          </small>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="toolbar">

        <input
          type="search"
          className="search-input"
          placeholder="Search team, tournament or winner..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          type="button"
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Result
        </button>

      </div>

      {/* TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Match</th>
              <th>Tournament</th>
              <th>Score</th>
              <th>Winner</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredResults.length > 0 ? (
              filteredResults.map((result) => {
                const match = getMatch(
                  result.matchId
                );

                return (
                  <tr key={result.id}>

                    <td>#{result.id}</td>

                    <td>
                      <strong>
                        {match
                          ? `${match.homeTeam} vs ${match.awayTeam}`
                          : "Unknown Match"}
                      </strong>
                    </td>

                    <td>
                      {match?.tournament ||
                        "Unknown Tournament"}
                    </td>

                    <td>
                      <span className="result-score">
                        {result.team1Score}
                      </span>

                      <strong className="score-separator">
                        -
                      </strong>

                      <span className="result-score">
                        {result.team2Score}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          result.winner === "Draw"
                            ? "result-winner draw"
                            : "result-winner"
                        }
                      >
                        {result.winner}
                      </span>
                    </td>

                    <td>
                      {result.notes || "-"}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(result)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(result.id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="empty-message"
                >
                  No results found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal result-modal">

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>
                <h2>
                  {isEditing
                    ? "Edit Match Result"
                    : "Add Match Result"}
                </h2>

                <p>
                  Enter the final match score
                </p>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              className="result-form"
              onSubmit={handleSubmit}
            >

              {/* MATCH */}
              <div className="form-group">
                <label>Match</label>

                <select
                  name="matchId"
                  value={formData.matchId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Match
                  </option>

                  {matches.map((match) => {
                    const alreadyHasResult =
                      results.some(
                        (result) =>
                          result.matchId ===
                            match.id &&
                          result.id !== editingId
                      );

                    return (
                      <option
                        key={match.id}
                        value={match.id}
                        disabled={alreadyHasResult}
                      >
                        {match.homeTeam} vs{" "}
                        {match.awayTeam}
                        {alreadyHasResult
                          ? " (Result Added)"
                          : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* SELECTED MATCH */}
              {formData.matchId && (
                <div className="selected-match-box">

                  <span>
                    {getMatch(
                      formData.matchId
                    )?.homeTeam}
                  </span>

                  <strong>VS</strong>

                  <span>
                    {getMatch(
                      formData.matchId
                    )?.awayTeam}
                  </span>

                </div>
              )}

              {/* TEAM 1 SCORE */}
              <div className="form-group">
                <label>
                  {formData.matchId
                    ? `${
                        getMatch(
                          formData.matchId
                        )?.homeTeam
                      } Score`
                    : "Team 1 Score"}
                </label>

                <input
                  type="number"
                  name="team1Score"
                  min="0"
                  placeholder="Enter score"
                  value={formData.team1Score}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TEAM 2 SCORE */}
              <div className="form-group">
                <label>
                  {formData.matchId
                    ? `${
                        getMatch(
                          formData.matchId
                        )?.awayTeam
                      } Score`
                    : "Team 2 Score"}
                </label>

                <input
                  type="number"
                  name="team2Score"
                  min="0"
                  placeholder="Enter score"
                  value={formData.team2Score}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* WINNER PREVIEW */}
              {formData.matchId &&
                formData.team1Score !== "" &&
                formData.team2Score !== "" && (
                  <div className="winner-preview">

                    <span>
                      Winner
                    </span>

                    <strong>
                      {getWinner(
                        formData.matchId,
                        formData.team1Score,
                        formData.team2Score
                      )}
                    </strong>

                  </div>
                )}

              {/* NOTES */}
              <div className="form-group">
                <label>Notes</label>

                <textarea
                  name="notes"
                  rows="4"
                  placeholder="Enter result notes..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              {/* BUTTONS */}
              <div className="result-form-actions">

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
                  {isEditing
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