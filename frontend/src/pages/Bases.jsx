import { useEffect, useState } from "react";
import { FaBuilding, FaPlus, FaSearch } from "react-icons/fa";
import api from "../services/api";

function Bases() {
  const [bases, setBases] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
  });

  useEffect(() => {
    let ignore = false;

    const fetchBases = async () => {
      try {
        const response = await api.get("/api/bases", {
          params: {
            search,
            page: 1,
            limit: 10,
            sort: "createdAt",
          },
        });

        if (!ignore) {
          setBases(response.data.data);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message ||
              "Failed to load bases"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchBases();

    return () => {
      ignore = true;
    };
  }, [search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/bases", formData);

      setFormData({
        name: "",
        code: "",
        location: "",
      });

      setShowModal(false);

      // Refresh bases after creating a new one
      const response = await api.get("/api/bases", {
        params: {
          search,
          page: 1,
          limit: 10,
          sort: "createdAt",
        },
      });

      setBases(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create base"
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Bases</h1>
          <p>Manage military bases and locations.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          Add Base
        </button>
      </div>

      <div className="search-container">
        <FaSearch />

        <input
          type="text"
          placeholder="Search bases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          Loading bases...
        </div>
      ) : bases.length === 0 ? (
        <div className="empty-state">
          <FaBuilding />

          <h3>No Bases Found</h3>

          <p>
            No military bases match your search.
          </p>
        </div>
      ) : (
        <div className="base-grid">
          {bases.map((base) => (
            <div
              className="base-card"
              key={base._id}
            >
              <div className="base-card-icon">
                <FaBuilding />
              </div>

              <div className="base-card-content">
                <h3>{base.name}</h3>

                <span className="base-code">
                  {base.code}
                </span>

                <p>{base.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">

            <div className="modal-header">
              <h2>Add New Base</h2>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Base Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter base name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Base Code</label>

                <input
                  type="text"
                  name="code"
                  placeholder="Example: ALPHA-001"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Base
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Bases;