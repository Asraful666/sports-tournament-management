import { useState } from "react";

const initialReferees = [
  {
    id: 1,
    name: "Rahim Ahmed",
    phone: "01711111111",
    email: "rahim@example.com",
    createdAt: "2026-09-01",
  },
  {
    id: 2,
    name: "Karim Hasan",
    phone: "01822222222",
    email: "karim@example.com",
    createdAt: "2026-09-03",
  },
  {
    id: 3,
    name: "Sakib Hossain",
    phone: "01933333333",
    email: "sakib@example.com",
    createdAt: "2026-09-05",
  },
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
};

function Referees() {
  const [referees, setReferees] = useState(initialReferees);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const isEditing = editingId !== null;

  // Search referees
  const filteredReferees = referees.filter((referee) => {
    const searchText = search.toLowerCase();

    return (
      referee.name.toLowerCase().includes(searchText) ||
      referee.phone.includes(searchText) ||
      referee.email.toLowerCase().includes(searchText)
    );
  });

  // Open Add Modal
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (referee) => {
    setEditingId(referee.id);

    setFormData({
      name: referee.name,
      phone: referee.phone,
      email: referee.email,
    });

    setShowModal(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add / Update referee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setReferees((previous) =>
        previous.map((referee) =>
          referee.id === editingId
            ? {
                ...referee,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
              }
            : referee
        )
      );
    } else {
      const newReferee = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setReferees((previous) => [
        ...previous,
        newReferee,
      ]);
    }

    closeModal();
  };

  // Delete referee
  const handleDelete = (id) => {
    const referee = referees.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        referee?.name || "this referee"
      }?`
    );

    if (!confirmed) return;

    setReferees((previous) =>
      previous.filter(
        (referee) => referee.id !== id
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
          <h1>Referee Management</h1>
          <p>
            Add and manage tournament referees
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Referee
        </button>
      </div>

      {/* Statistics */}
      <div className="stats">

        <div className="card">
          <div className="card-top">
            <span>Total Referees</span>

            <div className="card-icon">
              🧑‍⚖️
            </div>
          </div>

          <h3>{referees.length}</h3>

          <small>
            Registered referees
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Active Referees</span>

            <div className="card-icon">
              ✅
            </div>
          </div>

          <h3>{referees.length}</h3>

          <small>
            Available referees
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Contact Records</span>

            <div className="card-icon">
              📞
            </div>
          </div>

          <h3>{referees.length}</h3>

          <small>
            Phone numbers stored
          </small>
        </div>

        <div className="card">
          <div className="card-top">
            <span>Email Records</span>

            <div className="card-icon">
              ✉️
            </div>
          </div>

          <h3>{referees.length}</h3>

          <small>
            Email addresses stored
          </small>
        </div>

      </div>

      {/* Search Toolbar */}
      <div className="toolbar">

        <input
          type="search"
          className="search-input"
          placeholder="Search referee, phone or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Referee
        </button>

      </div>

      {/* Referee Table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Referee Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredReferees.length > 0 ? (
              filteredReferees.map((referee) => (
                <tr key={referee.id}>

                  <td>
                    #{referee.id}
                  </td>

                  <td>
                    <strong>
                      {referee.name}
                    </strong>
                  </td>

                  <td>
                    {referee.phone}
                  </td>

                  <td>
                    {referee.email}
                  </td>

                  <td>
                    {referee.createdAt}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(referee)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(referee.id)
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
                  className="empty-message"
                >
                  No referees found.
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
                    ? "Edit Referee"
                    : "Add New Referee"}
                </h2>

                <p>
                  Enter referee information below
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

              {/* Name */}
              <div className="form-group">

                <label>
                  Referee Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter referee name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Phone */}
              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Email */}
              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Modal Actions */}
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
                    ? "Update Referee"
                    : "Add Referee"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Referees;