import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Login successful!");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">🏆</div>

          <h1>Welcome Back</h1>

          <p>
            Login to Sports Tournament Management
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

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
                placeholder="Enter your password"
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
          </div>

          <div className="auth-options">

            <label className="remember-me">
              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert(
                  "Password recovery will be available after backend integration."
                )
              }
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Login
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;