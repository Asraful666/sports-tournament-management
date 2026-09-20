import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    alert(
      "Account created successfully!"
    );

    navigate("/login");
  };

  return (
    <div className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-header">

          <div className="auth-logo">
            🏆
          </div>

          <h1>Create Account</h1>

          <p>
            Register for Sports Tournament Management
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* ROLE */}
          <div className="form-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Role
              </option>

              <option value="Admin">
                System Administrator
              </option>

              <option value="Organizer">
                Tournament Organizer
              </option>

              <option value="Manager">
                Team Manager / Captain
              </option>

              <option value="Player">
                Player
              </option>

              <option value="Referee">
                Referee / Scorekeeper
              </option>

              <option value="Viewer">
                General Viewer
              </option>
            </select>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

            <small className="input-hint">
              Password must contain at least 6
              characters.
            </small>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* TERMS */}
          <label className="terms-check">

            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the system terms and
              conditions.
            </span>

          </label>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Create Account
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;