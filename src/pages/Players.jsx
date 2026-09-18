import { useState } from "react";

function Players() {
  const [players, setPlayers] = useState([
    {
      id: 1,
      teamId: 1,
      name: "Arif Hossain",
      dateOfBirth: "2003-05-12",
      position: "Forward",
      jerseyNo: 10,
      createdAt: "2026-09-01",
    },
    {
      id: 2,
      teamId: 1,
      name: "Sakib Ahmed",
      dateOfBirth: "2002-08-20",
      position: "Midfielder",
      jerseyNo: 7,
      createdAt: "2026-09-02",
    },
    {
      id: 3,
      teamId: 2,
      name: "Hasan Rahman",
      dateOfBirth: "2003-02-15",
      position: "Defender",
      jerseyNo: 4,
      createdAt: "2026-09-03",
    },
  ]);

  const [teams] = useState([
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
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    teamId: "",
    dateOfBirth: "",
    position: "",
    jerseyNo: "",
  });

  // Find team name
  const getTeamName = (teamId) => {
    const team = teams.find((team) => team.id === Number(teamId));
    return team ? team.name : "Unknown Team";
  };

  // Search players
  const filteredPlayers = players.filter((player) => {
    const teamName = getTeamName(player.teamId);

    return (
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      teamName.toLowerCase().includes(search.toLowerCase()) ||
      player.position.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add player
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      id: Date.now(),
      teamId: Number(formData.teamId),
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      position: formData.position,
      jerseyNo: Number(formData.jerseyNo),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPlayers([...players, newPlayer]);

    setFormData({
      name: "",
      teamId: "",
      dateOfBirth: "",
      position: "",
      jerseyNo: "",
    });

    setShowModal(false);
  };

  // Delete player
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (confirmDelete) {
      setPlayers(players.filter((player) => player.id !== id));
    }
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Player Management</h1>
          <p>Add and manage tournament players</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Player
        </button>
      </div>

      {/* Summary */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">👤</div>

          <div>
            <h3>{players.length}</h3>
            <p>Total Players</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">⚽</div>

          <div>
            <h3>{teams.length}</h3>
            <p>Teams</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🏃</div>

          <div>
            <h3>
              {
                players.filter(
                  (player) => player.position.toLowerCase() === "forward"
                ).length
              }
            </h3>
            <p>Forwards</p>
          </div>
        </div>

      </div>

      {/* Search Toolbar */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search player, team or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Player
        </button>

      </div>

      {/* Players Table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Player Name</th>
              <th>Team</th>
              <th>Date of Birth</th>
              <th>Position</th>
              <th>Jersey No.</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <tr key={player.id}>

                  <td>#{player.id}</td>

                  <td>
                    <strong>{player.name}</strong>
                  </td>

                  <td>{getTeamName(player.teamId)}</td>

                  <td>{player.dateOfBirth}</td>

                  <td>{player.position}</td>

                  <td>
                    <span className="jersey-number">
                      {player.jerseyNo}
                    </span>
                  </td>

                  <td>{player.createdAt}</td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          alert("Edit feature will be added soon.")
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(player.id)}
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-message">
                  No players found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Add Player Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>Add New Player</h2>
                <p>Enter player information below</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Player Name */}
              <div className="form-group">
                <label>Player Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter player name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Team */}
              <div className="form-group">
                <label>Team</label>

                <select
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Team</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Position */}
              <div className="form-group">
                <label>Position</label>

                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>

              {/* Jersey Number */}
              <div className="form-group">
                <label>Jersey Number</label>

                <input
                  type="number"
                  name="jerseyNo"
                  placeholder="Enter jersey number"
                  min="1"
                  max="99"
                  value={formData.jerseyNo}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Modal Buttons */}
              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Player
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Players;