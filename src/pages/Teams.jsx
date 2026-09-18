import { useState } from "react";

function Teams() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: "CSE Warriors",
      coachName: "Rahim Ahmed",
      contactInfo: "01711111111",
      createdAt: "2026-09-01",
    },
    {
      id: 2,
      teamName: "EEE Titans",
      coachName: "Karim Hasan",
      contactInfo: "01822222222",
      createdAt: "2026-09-03",
    },
    {
      id: 3,
      teamName: "BBA Strikers",
      coachName: "Sakib Khan",
      contactInfo: "01933333333",
      createdAt: "2026-09-05",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    teamName: "",
    coachName: "",
    contactInfo: "",
  });

  // Search
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(search.toLowerCase())
  );

  // Form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Team
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = {
      id: Date.now(),
      teamName: formData.teamName,
      coachName: formData.coachName,
      contactInfo: formData.contactInfo,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTeams([...teams, newTeam]);

    setFormData({
      teamName: "",
      coachName: "",
      contactInfo: "",
    });

    setShowModal(false);
  };

  // Delete Team
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (confirmDelete) {
      setTeams(teams.filter((team) => team.id !== id));
    }
  };

  return (
    <div className="page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Team Management</h1>
          <p>Register and manage tournament teams</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Register Team
        </button>
      </div>

      {/* Summary */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">⚽</div>
          <div>
            <h3>{teams.length}</h3>
            <p>Total Teams</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">👨‍🏫</div>
          <div>
            <h3>{teams.length}</h3>
            <p>Team Coaches</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🏆</div>
          <div>
            <h3>3</h3>
            <p>Registered Teams</p>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="toolbar">

        <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Team
        </button>

      </div>

      {/* Team Table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Team Name</th>
              <th>Coach Name</th>
              <th>Contact Information</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <tr key={team.id}>

                  <td>#{team.id}</td>

                  <td>
                    <strong>{team.teamName}</strong>
                  </td>

                  <td>{team.coachName}</td>

                  <td>{team.contactInfo}</td>

                  <td>{team.createdAt}</td>

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
                        onClick={() => handleDelete(team.id)}
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-message">
                  No teams found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Add Team Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">
              <div>
                <h2>Register New Team</h2>
                <p>Enter team information below</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Team Name</label>

                <input
                  type="text"
                  name="teamName"
                  placeholder="Enter team name"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Coach Name</label>

                <input
                  type="text"
                  name="coachName"
                  placeholder="Enter coach name"
                  value={formData.coachName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Information</label>

                <input
                  type="text"
                  name="contactInfo"
                  placeholder="Enter phone number"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  Register Team
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