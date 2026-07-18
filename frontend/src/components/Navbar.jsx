import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaTachometerAlt,
  FaBuilding,
  FaBox,
  FaShoppingCart,
  FaExchangeAlt,
  FaUserShield,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
  localStorage.getItem("user") || "null"
);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Bases",
      path: "/bases",
      icon: <FaBuilding />,
    },
    {
      name: "Equipment",
      path: "/equipment",
      icon: <FaBox />,
    },
    {
      name: "Purchases",
      path: "/purchases",
      icon: <FaShoppingCart />,
    },
    {
      name: "Transfers",
      path: "/transfers",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Assignments",
      path: "/assignments",
      icon: <FaUserShield />,
    },
    {
      name: "Expenditures",
      path: "/expenditures",
      icon: <FaChartLine />,
    },
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <FaShieldAlt />
        </div>

        <div>
          <h2>Military Assets</h2>
          <span>Management System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="sidebar-footer">

        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="user-details">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.role || "Personnel"}</span>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Navbar;