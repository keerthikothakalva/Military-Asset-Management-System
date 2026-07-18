import { useCallback,useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaArrowUp,
  FaUserShield,
  FaFire,
} from "react-icons/fa";

import api from "../services/api";

function Dashboard() {
  const [totals, setTotals] = useState({
    openingBalance: 0,
    closingBalance: 0,
    netMovement: 0,
    assigned: 0,
    expended: 0,
  });

  const [bases, setBases] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);

  const [filters, setFilters] = useState({
    date: "",
    base: "",
    equipmentType: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFilterData = useCallback(async () => {
  try {
    const [basesResponse, equipmentResponse] =
      await Promise.all([
        api.get("/api/bases?limit=100"),
        api.get("/api/equipment?limit=100"),
      ]);

    setBases(basesResponse.data.data);

    const types = [
      ...new Set(
        equipmentResponse.data.data.map(
          (item) => item.type
        )
      ),
    ];

    setEquipmentTypes(types);
  } catch (error) {
    console.error(error);
  }
}, []);

  const fetchDashboard = useCallback(
  async (customFilters = filters) => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/dashboard",
        {
          params: customFilters,
        }
      );

      setTotals(response.data.totals);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  },
  [filters]
);

 useEffect(() => {
  const loadDashboard = async () => {
    await fetchFilterData();
    await fetchDashboard();
  };

  loadDashboard();
}, [fetchFilterData, fetchDashboard]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    fetchDashboard(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      date: "",
      base: "",
      equipmentType: "",
    };

    setFilters(emptyFilters);

    fetchDashboard(emptyFilters);
  };

  const metrics = [
    {
      title: "Opening Balance",
      value: totals.openingBalance,
      icon: <FaBoxOpen />,
      className: "metric-blue",
    },
    {
      title: "Closing Balance",
      value: totals.closingBalance,
      icon: <FaBoxOpen />,
      className: "metric-green",
    },
    {
      title: "Net Movement",
      value: totals.netMovement,
      icon: <FaArrowUp />,
      className: "metric-purple",
    },
    {
      title: "Assigned Assets",
      value: totals.assigned,
      icon: <FaUserShield />,
      className: "metric-orange",
    },
    {
      title: "Expended Assets",
      value: totals.expended,
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

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="dashboard-filters">

        <div className="filter-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="filter-group">
          <label>Base</label>

          <select
            name="base"
            value={filters.base}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">
              All Bases
            </option>

            {bases.map((base) => (
              <option
                key={base._id}
                value={base._id}
              >
                {base.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Equipment Type</label>

          <select
            name="equipmentType"
            value={filters.equipmentType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">
              All Equipment
            </option>

            {equipmentTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          className="filter-button"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>

        <button
          className="filter-button"
          onClick={handleClearFilters}
        >
          Clear
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

              <h2>
                {loading ? "..." : metric.value}
              </h2>
            </div>
          </div>
        ))}

      </div>

      {/* Dashboard Information */}
      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-header">
            <h3>Asset Movement Summary</h3>
          </div>

          <div className="movement-summary">

            <p>
              <strong>Purchases:</strong>{" "}
              Assets added through purchases
            </p>

            <p>
              <strong>Transfer In:</strong>{" "}
              Assets received from other bases
            </p>

            <p>
              <strong>Transfer Out:</strong>{" "}
              Assets sent to other bases
            </p>

          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-header">
            <h3>Balance Calculation</h3>
          </div>

          <div className="movement-summary">

            <p>
              Opening Balance + Net Movement
            </p>

            <p>
              − Assigned Assets − Expended Assets
            </p>

            <h3>
              = Closing Balance
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;