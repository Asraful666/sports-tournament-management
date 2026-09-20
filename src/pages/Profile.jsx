import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Md. Asraful Islam",
    email: "asraful@example.com",
    role: "System Administrator",
    createdAt: "2026-08-10",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and email are required.");
      return;
    }

    setProfile(formData);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>User Profile</h1>
          <p>
            Manage your account information and profile settings.
          </p>
        </div>

        {!isEditing && (
          <button
            className="primary-btn"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-layout">

        {/* Profile Card */}
        <div className="profile-card">

          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <h2>{profile.name}</h2>

          <p className="profile-email">
            {profile.email}
          </p>

          <span className="profile-role">
            {profile.role}
          </span>

          <div className="profile-divider"></div>

          <div className="profile-info-item">
            <span>Account Created</span>
            <strong>{profile.createdAt}</strong>
          </div>

          <div className="profile-info-item">
            <span>Account Status</span>
            <strong className="status-active">
              Active
            </strong>
          </div>

        </div>

        {/* Profile Form */}
        <div className="profile-form-card">

          <div className="section-title">
            <h2>Personal Information</h2>

            <p>
              Update your basic account information.
            </p>
          </div>

          <form onSubmit={handleSave}>

            <div className="profile-form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Role</label>

                <input
                  type="text"
                  value={formData.role}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Account Created</label>

                <input
                  type="text"
                  value={formData.createdAt}
                  disabled
                />
              </div>

            </div>

            {isEditing && (
              <div className="profile-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Save Changes
                </button>

              </div>
            )}

          </form>

          {/* Password Section */}
          <div className="password-section">

            <div className="section-title">
              <h2>Security</h2>

              <p>
                Manage your account password.
              </p>
            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                alert(
                  "Password change will be connected with the backend later."
                )
              }
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;