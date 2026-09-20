import { useState } from "react";

function Referees() {
  const [referees, setReferees] = useState([
    {
      id: 1,
      name: "Abdul Karim",
      phone: "01711111111",
      email: "abdulkarim@example.com",
      createdAt: "2026-08-10",
    },
    {
      id: 2,
      name: "Rahim Ahmed",
      phone: "01822222222",
      email: "rahim@example.com",
      createdAt: "2026-08-12",
    },
    {
      id: 3,
      name: "Sakib Hasan",
      phone: "01933333333",
      email: "sakib@example.com",
      createdAt: "2026-08-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingReferee, setEditingReferee] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingReferee(null);

    setFormData({
      name: "",
      phone: "",
      email: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (referee) => {
    setEditingReferee(referee);

    setFormData({
      name: referee.name,
      phone: referee.phone,
      email: referee.email,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReferee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingReferee) {
      setReferees((previous) =>
        previous.map((referee) =>
          referee.id === editingReferee.id
            ? {
                ...referee,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
              }
            : referee
        )
      );

      alert("Referee updated successfully!");
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

      alert("Referee added successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this referee?"
    );

    if (!confirmed) return;

    setReferees((previous) =>
      previous.filter(
        (referee) => referee.id !== id
      )
    );
  };

  const filteredReferees = referees.filter(
    (referee) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      return (
        referee.name
          .toLowerCase()
          .includes(search) ||
        referee.phone
          .toLowerCase()
          .includes(search) ||
        referee.email
          .toLowerCase()
          .includes(search)
      );
    }
  );

  const totalReferees = referees.length;

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Referee Management</h1>

          <p>
            Manage tournament referees and
            their contact information.
          </p>
        </div>

        {/* ONLY ONE ADD REFEREE BUTTON */}
        <button
          className="primary-btn"
          onClick={openAddModal}
        >
          + Add Referee
        </button>

      </div>

      {/* SUMMARY CARD */}
      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-icon">
            🧑‍⚖️
          </div>

          <div>
            <h3>{totalReferees}</h3>
            <p>Total Referees</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            📞
          </div>

          <div>
            <h3>
              {referees.filter(
                (referee) => referee.phone
              ).length}
            </h3>

            <p>Contact Available</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon">
            ✉️
          </div>

          <div>
            <h3>
              {referees.filter(
                (referee) => referee.email
              ).length}
            </h3>

            <p>Email Available</p>
          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search referee by name, phone or email..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      {/* REFEREE TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Referee Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredReferees.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="empty-message"
                >
                  No referees found.
                </td>
              </tr>
            ) : (
              filteredReferees.map(
                (referee, index) => (
                  <tr key={referee.id}>

                    <td>{index + 1}</td>

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
                            openEditModal(
                              referee
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              referee.id
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

      {/* ADD / EDIT REFEREE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingReferee
                    ? "Edit Referee"
                    : "Add Referee"}
                </h2>

                <p>
                  {editingReferee
                    ? "Update referee information."
                    : "Add a new referee."}
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

                <label>
                  Referee Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter referee name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
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
                  {editingReferee
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