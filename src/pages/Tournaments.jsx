import { useState } from "react";

function Tournaments() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "SIU Football Championship 2026",
      description: "University inter-department football tournament.",
      startDate: "2026-10-01",
      endDate: "2026-10-20",
      organizer: "Sports Committee",
      createdAt: "2026-08-10",
    },
    {
      id: 2,
      name: "Inter Department Cricket Cup",
      description: "Annual cricket tournament.",
      startDate: "2026-11-05",
      endDate: "2026-11-25",
      organizer: "CSE Department",
      createdAt: "2026-08-12",
    },
    {
      id: 3,
      name: "University Basketball League",
      description: "Basketball competition between university teams.",
      startDate: "2026-07-01",
      endDate: "2026-07-20",
      organizer: "Sports Club",
      createdAt: "2026-07-01",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    organizer: "",
  });

  // =========================
  // TOURNAMENT STATUS
  // =========================

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return "Upcoming";
    }

    if (today > end) {
      return "Completed";
    }

    return "Ongoing";
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // ADD
  // =========================

  const handleAdd = () => {
    setEditingTournament(null);

    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      organizer: "",
    });

    setShowModal(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (tournament) => {
    setEditingTournament(tournament);

    setFormData({
      name: tournament.name,
      description: tournament.description,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      organizer: tournament.organizer,
    });

    setShowModal(true);
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    setShowModal(false);
    setEditingTournament(null);
  };

  // =========================
  // SAVE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.organizer
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      new Date(formData.endDate) <
      new Date(formData.startDate)
    ) {
      alert("End date cannot be before start date.");
      return;
    }

    if (editingTournament) {
      setTournaments((previous) =>
        previous.map((tournament) =>
          tournament.id === editingTournament.id
            ? {
                ...tournament,
                ...formData,
              }
            : tournament
        )
      );

      alert("Tournament updated successfully!");
    } else {
      const newTournament = {
        id: Date.now(),
        ...formData,
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setTournaments((previous) => [
        ...previous,
        newTournament,
      ]);

      alert("Tournament added successfully!");
    }

    handleClose();
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tournament?"
    );

    if (!confirmDelete) return;

    setTournaments((previous) =>
      previous.filter(
        (tournament) => tournament.id !== id
      )
    );

    alert("Tournament deleted successfully!");
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTournaments = tournaments.filter(
    (tournament) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        tournament.name
          .toLowerCase()
          .includes(search) ||
        tournament.description
          .toLowerCase()
          .includes(search) ||
        tournament.organizer
          .toLowerCase()
          .includes(search);

      const status = getStatus(
        tournament.startDate,
        tournament.endDate
      );

      const matchesStatus =
        statusFilter === "All" ||
        statusFilter === status;

      return matchesSearch && matchesStatus;
    }
  );

  // =========================
  // SUMMARY
  // =========================

  const total = tournaments.length;

  const upcoming = tournaments.filter(
    (tournament) =>
      getStatus(
        tournament.startDate,
        tournament.endDate
      ) === "Upcoming"
  ).length;

  const ongoing = tournaments.filter(
    (tournament) =>
      getStatus(
        tournament.startDate,
        tournament.endDate
      ) === "Ongoing"
  ).length;

  const completed = tournaments.filter(
    (tournament) =>
      getStatus(
        tournament.startDate,
        tournament.endDate
      ) === "Completed"
  ).length;

  return (
    <div className="page-container">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h1>Tournament Management</h1>

          <p>
            Create and manage sports tournaments.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Tournament
        </button>

      </div>

      {/* SUMMARY */}

      <div className="tournament-summary">

        <div className="summary-card">
          <span>Total Tournaments</span>
          <strong>{total}</strong>
        </div>

        <div className="summary-card">
          <span>Upcoming</span>
          <strong>{upcoming}</strong>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="tournament-toolbar">

        <div className="tournament-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search tournament..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "7px",
            padding: "0 10px",
            outline: "none",
            fontSize: "12px",
            background: "white",
          }}
        >
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* TABLE */}

      <div className="tournament-table">

        <div className="table-heading">

          <div>
            <h3>Tournament List</h3>

            <p>
              Manage all registered tournaments
            </p>
          </div>

          <span>
            {filteredTournaments.length} tournaments
          </span>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>#</th>
                <th>Tournament</th>
                <th>Organizer</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredTournaments.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#9ca3af",
                    }}
                  >
                    No tournaments found.
                  </td>
                </tr>

              ) : (

                filteredTournaments.map(
                  (tournament, index) => {

                    const status = getStatus(
                      tournament.startDate,
                      tournament.endDate
                    );

                    return (
                      <tr key={tournament.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>

                          <div className="tournament-name">

                            <div className="tournament-icon">
                              🏆
                            </div>

                            <div>

                              <strong>
                                {tournament.name}
                              </strong>

                              <small>
                                {tournament.description}
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>
                          {tournament.organizer}
                        </td>

                        <td>
                          {tournament.startDate}
                        </td>

                        <td>
                          {tournament.endDate}
                        </td>

                        <td>

                          <span
                            className={`status ${status.toLowerCase()}`}
                          >
                            {status}
                          </span>

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(tournament)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  tournament.id
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

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingTournament
                    ? "Edit Tournament"
                    : "Add Tournament"}
                </h2>

                <p>
                  Enter tournament information.
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
                  Tournament Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter tournament name"
                />

              </div>

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter tournament description"
                  rows="3"
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Organizer
                </label>

                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  placeholder="Enter organizer"
                />

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
                  {editingTournament
                    ? "Update Tournament"
                    : "Add Tournament"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tournaments;