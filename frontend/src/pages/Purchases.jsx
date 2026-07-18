import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import api from "../services/api";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    base: "",
    equipment: "",
    quantity: "",
    purchaseDate: "",
    remarks: "",
  });

  // Fetch purchases, bases and equipment
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [
          purchasesResponse,
          basesResponse,
          equipmentResponse,
        ] = await Promise.all([
          api.get("/api/purchases", {
            params: {
              page: 1,
              limit: 10,
              sort: "-createdAt",
            },
          }),

          api.get("/api/bases", {
            params: {
              page: 1,
              limit: 100,
            },
          }),

          api.get("/api/equipment", {
            params: {
              page: 1,
              limit: 100,
              sort: "-createdAt",
            },
          }),
        ]);

        if (!ignore) {
          setPurchases(purchasesResponse.data.data);
          setBases(basesResponse.data.data);
          setEquipment(equipmentResponse.data.data);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message ||
              "Failed to load purchase data"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

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
        "/api/purchases",
        {
          ...formData,
          quantity: Number(formData.quantity),
        }
      );

      setFormData({
        base: "",
        equipment: "",
        quantity: "",
        purchaseDate: "",
        remarks: "",
      });

      setShowModal(false);

      const response = await api.get(
        "/api/purchases",
        {
          params: {
            page: 1,
            limit: 10,
            sort: "-createdAt",
          },
        }
      );

      setPurchases(response.data.data);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create purchase"
      );
    }
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Purchases</h1>

          <p>
            Record and manage equipment purchases.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          Record Purchase
        </button>
      </div>

      {/* Search */}
      <div className="search-container">
        <FaSearch />

        <input
          type="text"
          placeholder="Search purchases..."
        />
      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="loading-state">
          Loading purchases...
        </div>
      ) : purchases.length === 0 ? (
        <div className="empty-state">
          <FaShoppingCart />

          <h3>No Purchases Found</h3>

          <p>
            No purchase records are available.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">

            <thead>
              <tr>
                <th>Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
                <th>Purchase Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase._id}>

                  <td>
                    {purchase.base?.name || "N/A"}
                  </td>

                  <td>
                    {purchase.equipment?.name || "N/A"}
                  </td>

                  <td>
                    {purchase.quantity}
                  </td>

                  <td>
                    {purchase.purchaseDate
                      ? new Date(
                          purchase.purchaseDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    {purchase.remarks || "-"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">
              <h2>Record Purchase</h2>

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

              {/* Base */}
              <div className="form-group">
                <label>Base</label>

                <select
                  name="base"
                  value={formData.base}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Base
                  </option>

                  {bases.map((base) => (
                    <option
                      key={base._id}
                      value={base._id}
                    >
                      {base.name} ({base.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div className="form-group">
                <label>Equipment</label>

                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Equipment
                  </option>

                  {equipment.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Purchase Date */}
              <div className="form-group">
                <label>Purchase Date</label>

                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
              </div>

              {/* Remarks */}
              <div className="form-group">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  placeholder="Enter remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              {/* Actions */}
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
                  Record Purchase
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Purchases;