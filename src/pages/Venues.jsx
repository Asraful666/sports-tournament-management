import { useState } from "react";

function Venues() {
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "SIU Main Ground",
      location: "Sylhet International University",
      capacity: 5000,
      available: true,
      createdAt: "2026-08-10",
    },
    {
      id: 2,
      name: "University Indoor Hall",
      location: "Sylhet",
      capacity: 1500,
      available: true,
      createdAt: "2026-08-12",
    },
    {
      id: 3,
      name: "City Sports Complex",
      location: "Sylhet City",
      capacity: 3000,
      available: false,
      createdAt: "2026-08-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingVenue, setEditingVenue] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingVenue(null);

    setFormData({
      name: "",
      location: "",
      capacity: "",
      available: true,
    });

    setIsModalOpen(true);
  };

  const openEditModal = (venue) => {
    setEditingVenue(venue);

    setFormData({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      available: venue.available,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVenue(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.capacity
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingVenue) {
      setVenues((previous) =>
        previous.map((venue) =>
          venue.id === editingVenue.id
            ? {
                ...venue,
                name: formData.name,
                location: formData.location,
                capacity: Number(
                  formData.capacity
                ),
                available:
                  formData.available === true ||
                  formData.available === "true",
              }
            : venue
        )
      );

      alert("Venue updated successfully!");
    } else {
      const newVenue = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        capacity: Number(formData.capacity),
        available:
          formData.available === true ||
          formData.available === "true",
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setVenues((previous) => [
        ...previous,
        newVenue,
      ]);

      alert("Venue added successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) return;

    setVenues((previous) =>
      previous.filter((venue) => venue.id !== id)
    );
  };

  const filteredVenues = venues.filter(
    (venue) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        venue.name
          .toLowerCase()
          .includes(search) ||
        venue.location
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" &&
          venue.available) ||
        (statusFilter === "unavailable" &&
          !venue.available);

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  const totalVenues = venues.length;

  const availableVenues = venues.filter(
    (venue) => venue.available
  ).length;

  const unavailableVenues = venues.filter(
    (venue) => !venue.available
  ).length;

  const totalCapacity = venues.reduce(
    (total, venue) =>
      total + Number(venue.capacity),
    0
  );

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Venue Management</h1>

          <p>
            Manage tournament venues and
            availability.
          </p>
        </div>

        {/* ONLY ONE ADD VENUE BUTTON */}
        <button
          className="primary-btn"
          onClick={openAddModal}
        >
          + Add Venue
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">
            🏟️
          </div>

          <div>
            <h3>{totalVenues}</h3>
            <p>Total Venues</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            ✅
          </div>

          <div>
            <h3>{availableVenues}</h3>
            <p>Available</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            👥
          </div>

          <div>
            <h3>
              {totalCapacity.toLocaleString()}
            </h3>
            <p>Total Capacity</p>
          </div>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search venue or location..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
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
            All Status
          </option>

          <option value="available">
            Available
          </option>

          <option value="unavailable">
            Unavailable
          </option>
        </select>

      </div>

      {/* VENUE TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Venue Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredVenues.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="empty-message"
                >
                  No venues found.
                </td>
              </tr>
            ) : (
              filteredVenues.map(
                (venue, index) => (
                  <tr key={venue.id}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {venue.name}
                      </strong>
                    </td>

                    <td>
                      {venue.location}
                    </td>

                    <td>
                      {venue.capacity.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={
                          venue.available
                            ? "status status-active"
                            : "status status-inactive"
                        }
                      >
                        {venue.available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </td>

                    <td>
                      {venue.createdAt}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            openEditModal(venue)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              venue.id
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

      {/* ADD / EDIT VENUE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingVenue
                    ? "Edit Venue"
                    : "Add Venue"}
                </h2>

                <p>
                  {editingVenue
                    ? "Update venue information."
                    : "Add a new tournament venue."}
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
                <label>Venue Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter venue name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter venue location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Capacity</label>

                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter venue capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Availability</label>

                <select
                  name="available"
                  value={String(
                    formData.available
                  )}
                  onChange={(e) =>
                    setFormData(
                      (previous) => ({
                        ...previous,
                        available:
                          e.target.value ===
                          "true",
                      })
                    )
                  }
                >
                  <option value="true">
                    Available
                  </option>

                  <option value="false">
                    Unavailable
                  </option>
                </select>
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
                  {editingVenue
                    ? "Update Venue"
                    : "Add Venue"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Venues;