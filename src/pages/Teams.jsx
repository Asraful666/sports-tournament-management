import { useState } from "react";

function Teams() {
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

  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: "CSE Warriors",
      coachName: "Rahim Ahmed",
      contactInfo: "01711111111",
      tournamentId: 1,
      createdAt: "2026-08-10",
    },
    {
      id: 2,
      teamName: "EEE Titans",
      coachName: "Karim Hasan",
      contactInfo: "01822222222",
      tournamentId: 1,
      createdAt: "2026-08-12",
    },
    {
      id: 3,
      teamName: "BBA Strikers",
      coachName: "Sakib Rahman",
      contactInfo: "01933333333",
      tournamentId: 2,
      createdAt: "2026-08-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [tournamentFilter, setTournamentFilter] =
    useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const [formData, setFormData] = useState({
    teamName: "",
    coachName: "",
    contactInfo: "",
    tournamentId: "",
  });

  const getTournamentName = (tournamentId) => {
    const tournament = tournaments.find(
      (item) => item.id === Number(tournamentId)
    );

    return tournament
      ? tournament.name
      : "Not Assigned";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    setEditingTeam(null);

    setFormData({
      teamName: "",
      coachName: "",
      contactInfo: "",
      tournamentId: "",
    });

    setShowModal(true);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);

    setFormData({
      teamName: team.teamName,
      coachName: team.coachName,
      contactInfo: team.contactInfo,
      tournamentId: String(team.tournamentId),
    });

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingTeam(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.teamName ||
      !formData.coachName ||
      !formData.contactInfo ||
      !formData.tournamentId
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingTeam) {
      setTeams((previous) =>
        previous.map((team) =>
          team.id === editingTeam.id
            ? {
                ...team,
                teamName: formData.teamName,
                coachName: formData.coachName,
                contactInfo: formData.contactInfo,
                tournamentId: Number(
                  formData.tournamentId
                ),
              }
            : team
        )
      );

      alert("Team updated successfully!");
    } else {
      const newTeam = {
        id: Date.now(),
        teamName: formData.teamName,
        coachName: formData.coachName,
        contactInfo: formData.contactInfo,
        tournamentId: Number(
          formData.tournamentId
        ),
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setTeams((previous) => [
        ...previous,
        newTeam,
      ]);

      alert("Team registered successfully!");
    }

    handleClose();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    setTeams((previous) =>
      previous.filter((team) => team.id !== id)
    );

    alert("Team deleted successfully!");
  };

  const filteredTeams = teams.filter((team) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      team.teamName
        .toLowerCase()
        .includes(search) ||
      team.coachName
        .toLowerCase()
        .includes(search) ||
      team.contactInfo
        .toLowerCase()
        .includes(search);

    const matchesTournament =
      tournamentFilter === "All" ||
      team.tournamentId ===
        Number(tournamentFilter);

    return (
      matchesSearch &&
      matchesTournament
    );
  });

  return (
    <div className="page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h1>Team Management</h1>

          <p>
            Register and manage participating teams.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleRegister}
        >
          + Register Team
        </button>

      </div>

      {/* SUMMARY */}

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-icon">
            👥
          </div>

          <div>
            <h3>{teams.length}</h3>
            <p>Total Teams</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            🏆
          </div>

          <div>
            <h3>{tournaments.length}</h3>
            <p>Tournaments</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            📋
          </div>

          <div>
            <h3>{filteredTeams.length}</h3>
            <p>Showing Teams</p>
          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="toolbar">

        <input
          className="search-input"
          type="text"
          placeholder="Search team or coach..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={tournamentFilter}
          onChange={(e) =>
            setTournamentFilter(e.target.value)
          }
          style={{
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            background: "white",
            fontSize: "14px",
          }}
        >
          <option value="All">
            All Tournaments
          </option>

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

      {/* TEAM TABLE */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>#</th>
              <th>Team Name</th>
              <th>Coach</th>
              <th>Contact</th>
              <th>Tournament</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredTeams.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="empty-message"
                >
                  No teams found.
                </td>

              </tr>

            ) : (

              filteredTeams.map((team, index) => (

                <tr key={team.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong>
                      {team.teamName}
                    </strong>
                  </td>

                  <td>
                    {team.coachName}
                  </td>

                  <td>
                    {team.contactInfo}
                  </td>

                  <td>
                    {getTournamentName(
                      team.tournamentId
                    )}
                  </td>

                  <td>
                    {team.createdAt}
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(team)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(team.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* REGISTER / EDIT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingTeam
                    ? "Edit Team"
                    : "Register Team"}
                </h2>

                <p>
                  {editingTeam
                    ? "Update team information."
                    : "Enter information to register a new team."}
                </p>

              </div>

              <button
                className="close-btn"
                onClick={handleClose}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Team Name
                </label>

                <input
                  type="text"
                  name="teamName"
                  placeholder="Enter team name"
                  value={formData.teamName}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Coach Name
                </label>

                <input
                  type="text"
                  name="coachName"
                  placeholder="Enter coach name"
                  value={formData.coachName}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Contact Information
                </label>

                <input
                  type="text"
                  name="contactInfo"
                  placeholder="Phone or email"
                  value={formData.contactInfo}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Tournament
                </label>

                <select
                  name="tournamentId"
                  value={formData.tournamentId}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Tournament
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

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingTeam
                    ? "Update Team"
                    : "Register Team"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Teams;