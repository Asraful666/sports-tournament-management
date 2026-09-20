import { useState } from "react";

function Players() {
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

  const [players, setPlayers] = useState([
    {
      id: 1,
      teamId: 1,
      name: "Arif Hossain",
      dateOfBirth: "2002-05-12",
      position: "Forward",
      jerseyNo: 10,
      createdAt: "2026-08-10",
    },
    {
      id: 2,
      teamId: 2,
      name: "Sakib Ahmed",
      dateOfBirth: "2001-09-18",
      position: "Midfielder",
      jerseyNo: 8,
      createdAt: "2026-08-12",
    },
    {
      id: 3,
      teamId: 3,
      name: "Hasan Rahman",
      dateOfBirth: "2003-02-25",
      position: "Defender",
      jerseyNo: 4,
      createdAt: "2026-08-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [positionFilter, setPositionFilter] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingPlayer, setEditingPlayer] =
    useState(null);

  const [formData, setFormData] = useState({
    teamId: "",
    name: "",
    dateOfBirth: "",
    position: "",
    jerseyNo: "",
  });

  const getTeamName = (teamId) => {
    const team = teams.find(
      (team) => team.id === Number(teamId)
    );

    return team ? team.name : "Unknown Team";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingPlayer(null);

    setFormData({
      teamId: "",
      name: "",
      dateOfBirth: "",
      position: "",
      jerseyNo: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (player) => {
    setEditingPlayer(player);

    setFormData({
      teamId: player.teamId,
      name: player.name,
      dateOfBirth: player.dateOfBirth,
      position: player.position,
      jerseyNo: player.jerseyNo,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.teamId ||
      !formData.name ||
      !formData.dateOfBirth ||
      !formData.position ||
      !formData.jerseyNo
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingPlayer) {
      setPlayers((previous) =>
        previous.map((player) =>
          player.id === editingPlayer.id
            ? {
                ...player,
                ...formData,
                teamId: Number(formData.teamId),
                jerseyNo: Number(
                  formData.jerseyNo
                ),
              }
            : player
        )
      );

      alert("Player updated successfully!");
    } else {
      const newPlayer = {
        id: Date.now(),
        teamId: Number(formData.teamId),
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        position: formData.position,
        jerseyNo: Number(formData.jerseyNo),
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setPlayers((previous) => [
        ...previous,
        newPlayer,
      ]);

      alert("Player added successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (!confirmed) return;

    setPlayers((previous) =>
      previous.filter(
        (player) => player.id !== id
      )
    );
  };

  const filteredPlayers = players.filter(
    (player) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        player.name
          .toLowerCase()
          .includes(search) ||
        String(player.jerseyNo).includes(search);

      const matchesTeam =
        teamFilter === "all" ||
        player.teamId === Number(teamFilter);

      const matchesPosition =
        positionFilter === "all" ||
        player.position === positionFilter;

      return (
        matchesSearch &&
        matchesTeam &&
        matchesPosition
      );
    }
  );

  const totalPlayers = players.length;

  const totalTeams = new Set(
    players.map((player) => player.teamId)
  ).size;

  const totalPositions = new Set(
    players.map((player) => player.position)
  ).size;

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Player Management</h1>

          <p>
            Manage players and their tournament
            information.
          </p>
        </div>

        {/* ONLY ONE ADD PLAYER BUTTON */}
        <button
          className="primary-btn"
          onClick={openAddModal}
        >
          + Add Player
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">
            👤
          </div>

          <div>
            <h3>{totalPlayers}</h3>
            <p>Total Players</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            👥
          </div>

          <div>
            <h3>{totalTeams}</h3>
            <p>Teams</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            ⚽
          </div>

          <div>
            <h3>{totalPositions}</h3>
            <p>Positions</p>
          </div>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search player or jersey number..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={teamFilter}
          onChange={(e) =>
            setTeamFilter(e.target.value)
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
            All Teams
          </option>

          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              {team.name}
            </option>
          ))}
        </select>

        <select
          value={positionFilter}
          onChange={(e) =>
            setPositionFilter(e.target.value)
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
            All Positions
          </option>

          <option value="Goalkeeper">
            Goalkeeper
          </option>

          <option value="Defender">
            Defender
          </option>

          <option value="Midfielder">
            Midfielder
          </option>

          <option value="Forward">
            Forward
          </option>
        </select>

      </div>

      {/* PLAYER TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Player Name</th>
              <th>Team</th>
              <th>Date of Birth</th>
              <th>Position</th>
              <th>Jersey No.</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredPlayers.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="empty-message"
                >
                  No players found.
                </td>
              </tr>
            ) : (
              filteredPlayers.map(
                (player, index) => (
                  <tr key={player.id}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {player.name}
                      </strong>
                    </td>

                    <td>
                      {getTeamName(
                        player.teamId
                      )}
                    </td>

                    <td>
                      {player.dateOfBirth}
                    </td>

                    <td>
                      {player.position}
                    </td>

                    <td>
                      <span className="jersey-number">
                        {player.jerseyNo}
                      </span>
                    </td>

                    <td>
                      {player.createdAt}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            openEditModal(
                              player
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              player.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

      {/* ADD / EDIT PLAYER MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingPlayer
                    ? "Edit Player"
                    : "Add Player"}
                </h2>

                <p>
                  {editingPlayer
                    ? "Update player information."
                    : "Add a new player to a team."}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Player Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter player name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Team</label>

                <select
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Team
                  </option>

                  {teams.map((team) => (
                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    formData.dateOfBirth
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Position</label>

                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Position
                  </option>

                  <option value="Goalkeeper">
                    Goalkeeper
                  </option>

                  <option value="Defender">
                    Defender
                  </option>

                  <option value="Midfielder">
                    Midfielder
                  </option>

                  <option value="Forward">
                    Forward
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Jersey Number</label>

                <input
                  type="number"
                  name="jerseyNo"
                  placeholder="Enter jersey number"
                  min="1"
                  value={formData.jerseyNo}
                  onChange={handleChange}
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
                  {editingPlayer
                    ? "Update Player"
                    : "Add Player"}
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