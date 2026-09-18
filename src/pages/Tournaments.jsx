import { useState } from "react";

function Tournaments() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "University Football Championship 2026",
      description: "Annual university football tournament",
      startDate: "2026-10-01",
      endDate: "2026-10-20",
      organizer: "Admin User",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Inter Department Cricket Cup 2026",
      description: "Inter department cricket competition",
      startDate: "2026-09-25",
      endDate: "2026-10-10",
      organizer: "Admin User",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Summer Football League",
      description: "Summer season football league",
      startDate: "2026-07-01",
      endDate: "2026-07-30",
      organizer: "Tournament Organizer",
      status: "Completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });


  // Search
  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Create tournament
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTournament = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      organizer: "Admin User",
      status: "Upcoming",
    };

    setTournaments([
      newTournament,
      ...tournaments,
    ]);

    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });

    setShowModal(false);
  };


  // Delete tournament
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tournament?"
    );

    if (confirmDelete) {
      setTournaments(
        tournaments.filter(
          (tournament) => tournament.id !== id
        )
      );
    }
  };


  return (
    <div>

      {/* Page Heading */}

      <div className="page-title">

        <div>
          <h2>Tournaments</h2>

          <p>
            Create and manage sports tournaments.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Tournament
        </button>

      </div>


      {/* Summary */}

      <div className="tournament-summary">

        <div className="summary-card">
          <span>Total Tournaments</span>
          <strong>{tournaments.length}</strong>
        </div>

        <div className="summary-card">
          <span>Upcoming</span>
          <strong>
            {
              tournaments.filter(
                (t) => t.status === "Upcoming"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <strong>
            {
              tournaments.filter(
                (t) => t.status === "Completed"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* Search */}

      <div className="tournament-toolbar">

        <div className="tournament-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search tournaments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* Tournament List */}

      <div className="tournament-table">

        <div className="table-heading">

          <div>
            <h3>Tournament List</h3>

            <p>
              Manage all registered tournaments.
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
                <th>Tournament</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Organizer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredTournaments.length > 0 ? (

                filteredTournaments.map((tournament) => (

                  <tr key={tournament.id}>

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
                      {tournament.startDate}
                    </td>


                    <td>
                      {tournament.endDate}
                    </td>


                    <td>
                      {tournament.organizer}
                    </td>


                    <td>

                      <span
                        className={
                          tournament.status === "Upcoming"
                            ? "status upcoming"
                            : "status completed"
                        }
                      >
                        {tournament.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button className="edit-btn">
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(tournament.id)
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
                    colSpan="6"
                    className="no-data"
                  >
                    No tournaments found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Create Tournament Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h3>Create Tournament</h3>

                <p>
                  Add a new sports tournament.
                </p>
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

                <label>
                  Tournament Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter tournament name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter tournament description"
                  value={formData.description}
                  onChange={handleChange}
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
                    required
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
                    required
                  />

                </div>

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
                  Create Tournament
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