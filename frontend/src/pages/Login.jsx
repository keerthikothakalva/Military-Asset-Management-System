import { useState } from "react";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/api/users/login", formData);

    console.log(response.data);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.location.href = "/dashboard";
    }

  } catch (error) {
    console.error(
      error.response?.data?.message || "Login failed"
    );
  }
};

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <FaShieldAlt />
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="login-title">
            Military Asset Management
          </h1>

          <p className="login-subtitle">
            Secure logistics and asset management system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <div className="login-footer">
          Authorized personnel only
        </div>

      </div>
    </div>
  );
}

export default Login;