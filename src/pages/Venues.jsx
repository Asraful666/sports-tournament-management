import { useState } from "react";

const initialVenues = [
  {
    id: 1,
    name: "University Football Ground",
    location: "Sylhet International University",
    capacity: 5000,
    createdAt: "2026-09-01",
    available: true,
  },
  {
    id: 2,
    name: "University Cricket Ground",
    location: "Main Campus",
    capacity: 3000,
    createdAt: "2026-09-03",
    available: true,
  },
  {
    id: 3,
    name: "Indoor Sports Complex",
    location: "University Campus",
    capacity: 1000,
    createdAt: "2026-09-05",
    available: false,
  },
];

const emptyForm = {
  name: "",
  location: "",
  capacity: "",
  available: true,
};

function Venues() {
  const [venues, setVenues] = useState(initialVenues);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const isEditing = editingId !== null;

  // Search venues
  const filteredVenues = venues.filter((venue) => {
    const searchText = search.toLowerCase();

    return (
      venue.name.toLowerCase().includes(searchText) ||
      venue.location.toLowerCase().includes(searchText)
    );
  });

  // Statistics
  const totalVenues = venues.length;

  const availableVenues = venues.filter(
    (venue) => venue.available
  ).length;

  const unavailableVenues = venues.filter(
    (venue) => !venue.available
  ).length;

  // Open Add Modal
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (venue) => {
    setEditingId(venue.id);

    setFormData({
      name: venue.name,
      location: venue.location,
      capacity: String(venue.capacity),
      available: venue.available,
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

  // Add / Update venue
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setVenues((previous) =>
        previous.map((venue) =>
          venue.id === editingId
            ? {
                ...venue,
                name: formData.name,
                location: formData.location,
                capacity: Number(formData.capacity),
                available: formData.available,
              }
            : venue
        )
      );
    } else {
      const newVenue = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        capacity: Number(formData.capacity),
        available: formData.available,
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setVenues((previous) => [
        ...previous,
        newVenue,
      ]);
    }

    closeModal();
  };

  // Delete venue
  const handleDelete = (id) => {
    const venue = venues.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        venue?.name || "this venue"
      }?`
    );

    if (!confirmed) return;

    setVenues((previous) =>
      previous.filter(
        (venue) => venue.id !== id
      )
    );
  };

  // Toggle availability
  const toggleAvailability = (id) => {
    setVenues((previous) =>
      previous.map((venue) =>
        venue.id === id
          ? {
              ...venue,
              available: !venue.available,
            }
          : venue
      )
    );
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Venue Management</h1>
          <p>
            Add and manage tournament venues
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Venue
        </button>
      </div>

      {/* Statistics */}
      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Venues</span>

            <div className="card-icon">
              🏟️
            </div>
          </div>

          <h3>{totalVenues}</h3>

          <small>
            Registered venues
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Available</span>

            <div className="card-icon">
              ✅
            </div>
          </div>

          <h3>{availableVenues}</h3>

          <small>
            Currently available
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Unavailable</span>

            <div className="card-icon">
              ❌
            </div>
          </div>

          <h3>{unavailableVenues}</h3>

          <small>
            Currently unavailable
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Total Capacity</span>

            <div className="card-icon">
              👥
            </div>
          </div>

          <h3>
            {venues.reduce(
              (total, venue) =>
                total + venue.capacity,
              0
            )}
          </h3>

          <small>
            Combined capacity
          </small>
        </div>

      </div>

      {/* Search Toolbar */}
      <div className="toolbar">

        <input
          type="search"
          className="search-input"
          placeholder="Search venue or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Venue
        </button>

      </div>

      {/* Venue Table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Venue Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Availability</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <tr key={venue.id}>

                  <td>
                    #{venue.id}
                  </td>

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
                    <button
                      type="button"
                      className={`status ${
                        venue.available
                          ? "available"
                          : "unavailable"
                      }`}
                      onClick={() =>
                        toggleAvailability(
                          venue.id
                        )
                      }
                    >
                      {venue.available
                        ? "Available"
                        : "Unavailable"}
                    </button>
                  </td>

                  <td>
                    {venue.createdAt}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(venue)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(venue.id)
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
                  colSpan="7"
                  className="empty-message"
                >
                  No venues found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>
                  {isEditing
                    ? "Edit Venue"
                    : "Add New Venue"}
                </h2>

                <p>
                  Enter venue information below
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

            <form onSubmit={handleSubmit}>

              {/* Venue Name */}
              <div className="form-group">

                <label>
                  Venue Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter venue name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Location */}
              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter venue location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Capacity */}
              <div className="form-group">

                <label>
                  Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter venue capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Availability */}
              <div className="form-group">

                <label>
                  Availability
                </label>

                <select
                  name="available"
                  value={String(
                    formData.available
                  )}
                  onChange={(e) =>
                    setFormData((previous) => ({
                      ...previous,
                      available:
                        e.target.value ===
                        "true",
                    }))
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

              {/* Modal Buttons */}
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
                  {isEditing
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