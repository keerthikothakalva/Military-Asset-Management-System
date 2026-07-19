import { useEffect, useState } from "react";
import {
  FaBox,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import api from "../services/api";
import "./Equipment.css";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Weapon",
    unit: "Pieces",
    description: "",
  });

  useEffect(() => {
    let ignore = false;

    const fetchEquipment = async () => {
      try {
        const response = await api.get(
          "/api/equipment",
          {
            params: {
              search,
              page: 1,
              limit: 10,
              sort: "-createdAt",
            },
          }
        );

        if (!ignore) {
          setEquipment(response.data.data);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message ||
              "Failed to load equipment"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchEquipment();

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
      await api.post(
        "/api/equipment",
        formData
      );

      setFormData({
        name: "",
        type: "Weapon",
        unit: "Pieces",
        description: "",
      });

      setShowModal(false);

      const response = await api.get(
        "/api/equipment",
        {
          params: {
            search,
            page: 1,
            limit: 10,
            sort: "-createdAt",
          },
        }
      );

      setEquipment(response.data.data);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create equipment"
      );
    }
  };

  return (
    <div className="page-container">

      
      <div className="page-header">
        <div>
          <h1>Equipment</h1>
          <p>
            Manage military equipment and assets.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          Add Equipment
        </button>
      </div>

     
      <div className="search-container">
        <FaSearch />

        <input
          type="text"
          placeholder="Search by name or type..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      
      {loading ? (
        <div className="loading-state">
          Loading equipment...
        </div>
      ) : equipment.length === 0 ? (
        <div className="empty-state">
          <FaBox />

          <h3>No Equipment Found</h3>

          <p>
            No equipment matches your search.
          </p>
        </div>
      ) : (
        <div className="equipment-grid">
          {equipment.map((item) => (
            <div
              className="equipment-card"
              key={item._id}
            >
              <div className="equipment-icon">
                <FaBox />
              </div>

              <div className="equipment-content">
                <h3>{item.name}</h3>

                <span className="equipment-type">
                  {item.type}
                </span>

                <p>
                  Unit: {item.unit}
                </p>

                {item.description && (
                  <p className="equipment-description">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">

            <div className="modal-header">
              <h2>Add Equipment</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              
              <div className="form-group">
                <label>
                  Equipment Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter equipment name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div className="form-group">
                <label>
                  Equipment Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Weapon">
                    Weapon
                  </option>

                  <option value="Vehicle">
                    Vehicle
                  </option>

                  <option value="Ammunition">
                    Ammunition
                  </option>

                  <option value="Communication">
                    Communication
                  </option>

                  <option value="Medical">
                    Medical
                  </option>

                  <option value="Others">
                    Others
                  </option>
                </select>
              </div>

              
              <div className="form-group">
                <label>
                  Unit
                </label>

                <input
                  type="text"
                  name="unit"
                  placeholder="Example: Pieces"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div className="form-group">
                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              
              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Equipment
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Equipment;