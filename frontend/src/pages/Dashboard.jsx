import {
  FaBoxOpen,
  FaArrowUp,
  FaUserShield,
  FaFire,
} from "react-icons/fa";

function Dashboard() {
  const metrics = [
    {
      title: "Opening Balance",
      value: "0",
      icon: <FaBoxOpen />,
      className: "metric-blue",
    },
    {
      title: "Closing Balance",
      value: "0",
      icon: <FaBoxOpen />,
      className: "metric-green",
    },
    {
      title: "Net Movement",
      value: "0",
      icon: <FaArrowUp />,
      className: "metric-purple",
    },
    {
      title: "Assigned Assets",
      value: "0",
      icon: <FaUserShield />,
      className: "metric-orange",
    },
    {
      title: "Expended Assets",
      value: "0",
      icon: <FaFire />,
      className: "metric-red",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Overview of military assets and logistics operations
          </p>
        </div>

        <div className="dashboard-date">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Filters */}
      <div className="dashboard-filters">

        <div className="filter-group">
          <label>Date</label>

          <input
            type="date"
            className="form-control"
          />
        </div>

        <div className="filter-group">
          <label>Base</label>

          <select className="form-select">
            <option value="">All Bases</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Equipment Type</label>

          <select className="form-select">
            <option value="">All Equipment</option>
          </select>
        </div>

        <button className="filter-button">
          Apply Filters
        </button>

      </div>

      {/* Metrics */}
      <div className="metrics-grid">

        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`metric-card ${metric.className}`}
          >
            <div className="metric-icon">
              {metric.icon}
            </div>

            <div>
              <p>{metric.title}</p>
              <h2>{metric.value}</h2>
            </div>
          </div>
        ))}

      </div>

      {/* Main Dashboard Sections */}
      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Asset Movement Summary</h3>
          </div>

          <div className="empty-state">
            <FaBoxOpen />

            <p>
              No asset movement data available
            </p>

            <span>
              Purchase and transfer records will appear here.
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>

          <div className="empty-state">
            <p>
              No recent activity
            </p>

            <span>
              System transactions will appear here.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;