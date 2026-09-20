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

const venues = [
  {
    id: 1,
    name: "University Football Ground",
  },
  {
    id: 2,
    name: "University Cricket Ground",
  },
  {
    id: 3,
    name: "Indoor Sports Complex",
  },
];

const referees = [
  {
    id: 1,
    name: "Rahim Ahmed",
  },
  {
    id: 2,
    name: "Karim Hasan",
  },
  {
    id: 3,
    name: "Sakib Hossain",
  },
];

const initialMatches = [
  {
    id: 1,
    tournamentId: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    venueId: 1,
    refereeId: 1,
    matchDate: "2026-10-05",
    matchTime: "15:00",
    round: "Semi Final",
  },
  {
    id: 2,
    tournamentId: 1,
    homeTeamId: 2,
    awayTeamId: 3,
    venueId: 1,
    refereeId: 2,
    matchDate: "2026-10-07",
    matchTime: "16:00",
    round: "Group Stage",
  },
  {
    id: 3,
    tournamentId: 2,
    homeTeamId: 1,
    awayTeamId: 3,
    venueId: 2,
    refereeId: 3,
    matchDate: "2026-10-10",
    matchTime: "14:30",
    round: "Final",
  },
];

const emptyForm = {
  tournamentId: "",
  homeTeamId: "",
  awayTeamId: "",
  venueId: "",
  refereeId: "",
  matchDate: "",
  matchTime: "",
  round: "",
};

function Matches() {
  const [matches, setMatches] = useState(initialMatches);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const isEditing = editingId !== null;

  const getTournamentName = (id) => {
    const item = tournaments.find(
      (tournament) => tournament.id === Number(id)
    );

    return item ? item.name : "Unknown Tournament";
  };

  const getTeamName = (id) => {
    const item = teams.find(
      (team) => team.id === Number(id)
    );

    return item ? item.name : "Unknown Team";
  };

  const getVenueName = (id) => {
    const item = venues.find(
      (venue) => venue.id === Number(id)
    );

    return item ? item.name : "Unknown Venue";
  };

  const getRefereeName = (id) => {
    const item = referees.find(
      (referee) => referee.id === Number(id)
    );

    return item ? item.name : "Unknown Referee";
  };

  const filteredMatches = matches.filter((match) => {
    const text = search.toLowerCase();

    return (
      getTournamentName(match.tournamentId)
        .toLowerCase()
        .includes(text) ||
      getTeamName(match.homeTeamId)
        .toLowerCase()
        .includes(text) ||
      getTeamName(match.awayTeamId)
        .toLowerCase()
        .includes(text) ||
      getVenueName(match.venueId)
        .toLowerCase()
        .includes(text) ||
      getRefereeName(match.refereeId)
        .toLowerCase()
        .includes(text) ||
      match.round.toLowerCase().includes(text)
    );
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (match) => {
    setEditingId(match.id);

    setFormData({
      tournamentId: String(match.tournamentId),
      homeTeamId: String(match.homeTeamId),
      awayTeamId: String(match.awayTeamId),
      venueId: String(match.venueId),
      refereeId: String(match.refereeId),
      matchDate: match.matchDate,
      matchTime: match.matchTime,
      round: match.round,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.tournamentId ||
      !formData.homeTeamId ||
      !formData.awayTeamId ||
      !formData.venueId ||
      !formData.refereeId ||
      !formData.matchDate ||
      !formData.matchTime ||
      !formData.round
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      formData.homeTeamId === formData.awayTeamId
    ) {
      alert(
        "Home Team and Away Team cannot be the same."
      );
      return;
    }

    const matchData = {
      tournamentId: Number(formData.tournamentId),
      homeTeamId: Number(formData.homeTeamId),
      awayTeamId: Number(formData.awayTeamId),
      venueId: Number(formData.venueId),
      refereeId: Number(formData.refereeId),
      matchDate: formData.matchDate,
      matchTime: formData.matchTime,
      round: formData.round,
    };

    if (isEditing) {
      setMatches((previous) =>
        previous.map((match) =>
          match.id === editingId
            ? {
                ...match,
                ...matchData,
              }
            : match
        )
      );

      alert("Fixture updated successfully.");
    } else {
      const newMatch = {
        id: Date.now(),
        ...matchData,
      };

      setMatches((previous) => [
        ...previous,
        newMatch,
      ]);

      alert("Fixture created successfully.");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fixture?"
    );

    if (!confirmed) return;

    setMatches((previous) =>
      previous.filter((match) => match.id !== id)
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Match / Fixture Management</h1>
          <p>
            Create and manage tournament match fixtures
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleAdd}
        >
          + Create Fixture
        </button>
      </div>

      {/* STATS */}
      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Matches</span>
            <div className="card-icon">⚽</div>
          </div>

          <h3>{matches.length}</h3>
          <small>Scheduled fixtures</small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Venues Used</span>
            <div className="card-icon">🏟️</div>
          </div>

          <h3>
            {new Set(
              matches.map((match) => match.venueId)
            ).size}
          </h3>

          <small>Assigned venues</small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Referees</span>
            <div className="card-icon">🧑‍⚖️</div>
          </div>

          <h3>
            {new Set(
              matches.map(
                (match) => match.refereeId
              )
            ).size}
          </h3>

          <small>Assigned referees</small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Tournaments</span>
            <div className="card-icon">🏆</div>
          </div>

          <h3>{tournaments.length}</h3>
          <small>Available tournaments</small>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="toolbar">

        <input
          type="search"
          className="search-input"
          placeholder="Search tournament, team, venue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          className="primary-btn"
          onClick={handleAdd}
        >
          + Create Fixture
        </button>

      </div>

      {/* TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Tournament</th>
              <th>Teams</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Round</th>
              <th>Referee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <tr key={match.id}>

                  <td>#{match.id}</td>

                  <td>
                    <strong>
                      {getTournamentName(
                        match.tournamentId
                      )}
                    </strong>
                  </td>

                  <td>
                    <div className="match-teams">
                      <span>
                        {getTeamName(
                          match.homeTeamId
                        )}
                      </span>

                      <strong>VS</strong>

                      <span>
                        {getTeamName(
                          match.awayTeamId
                        )}
                      </span>
                    </div>
                  </td>

                  <td>
                    {getVenueName(match.venueId)}
                  </td>

                  <td>{match.matchDate}</td>

                  <td>{match.matchTime}</td>

                  <td>
                    <span className="match-round">
                      {match.round}
                    </span>
                  </td>

                  <td>
                    {getRefereeName(
                      match.refereeId
                    )}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(match)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(match.id)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="empty-message"
                >
                  No matches found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal match-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {isEditing
                    ? "Edit Fixture"
                    : "Create New Fixture"}
                </h2>

                <p>
                  Enter match information below
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

            <form
              className="match-form"
              onSubmit={handleSubmit}
            >

              {/* TOURNAMENT */}
              <div className="form-group">
                <label>Tournament</label>

                <select
                  name="tournamentId"
                  value={formData.tournamentId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Tournament
                  </option>

                  {tournaments.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* HOME TEAM */}
              <div className="form-group">
                <label>Home Team</label>

                <select
                  name="homeTeamId"
                  value={formData.homeTeamId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Home Team
                  </option>

                  {teams.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* AWAY TEAM */}
              <div className="form-group">
                <label>Away Team</label>

                <select
                  name="awayTeamId"
                  value={formData.awayTeamId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Away Team
                  </option>

                  {teams.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* VENUE */}
              <div className="form-group">
                <label>Venue</label>

                <select
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Venue
                  </option>

                  {venues.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* REFEREE */}
              <div className="form-group">
                <label>Referee</label>

                <select
                  name="refereeId"
                  value={formData.refereeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Referee
                  </option>

                  {referees.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE */}
              <div className="form-group">
                <label>Match Date</label>

                <input
                  type="date"
                  name="matchDate"
                  value={formData.matchDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TIME */}
              <div className="form-group">
                <label>Match Time</label>

                <input
                  type="time"
                  name="matchTime"
                  value={formData.matchTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ROUND */}
              <div className="form-group">
                <label>Round</label>

                <select
                  name="round"
                  value={formData.round}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Round
                  </option>

                  <option value="Group Stage">
                    Group Stage
                  </option>

                  <option value="Quarter Final">
                    Quarter Final
                  </option>

                  <option value="Semi Final">
                    Semi Final
                  </option>

                  <option value="Final">
                    Final
                  </option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="match-form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn create-fixture-btn"
                >
                  {isEditing
                    ? "Update Fixture"
                    : "Create Fixture"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Matches;