import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaPlus,
} from "react-icons/fa";
import api from "../services/api";

function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    base: "",
    equipment: "",
    quantity: "",
    reason: "",
    expenditureDate: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          expendituresResponse,
          basesResponse,
          equipmentResponse,
        ] = await Promise.all([
          api.get("/api/expenditures"),
          api.get("/api/bases", {
            params: { page: 1, limit: 100 },
          }),
          api.get("/api/equipment", {
            params: { page: 1, limit: 100 },
          }),
        ]);

        setExpenditures(
          expendituresResponse.data.data
        );

        setBases(
          basesResponse.data.data
        );

        setEquipment(
          equipmentResponse.data.data
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load expenditure data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        "/api/expenditures",
        {
          ...formData,
          quantity: Number(formData.quantity),
        }
      );

      setFormData({
        base: "",
        equipment: "",
        quantity: "",
        reason: "",
        expenditureDate: "",
        remarks: "",
      });

      setShowModal(false);

      const response = await api.get(
        "/api/expenditures"
      );

      setExpenditures(
        response.data.data
      );

      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create expenditure"
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Expenditures</h1>

          <p>
            Track equipment used, damaged, or removed.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowModal(true)
          }
        >
          <FaPlus />
          Record Expenditure
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          Loading expenditures...
        </div>
      ) : expenditures.length === 0 ? (
        <div className="empty-state">
          <FaChartLine />

          <h3>No Expenditures Found</h3>

          <p>
            No expenditure records are available.
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
                <th>Reason</th>
                <th>Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {expenditures.map(
                (expenditure) => (
                  <tr
                    key={expenditure._id}
                  >
                    <td>
                      {expenditure.base?.name ||
                        "N/A"}
                    </td>

                    <td>
                      {expenditure.equipment?.name ||
                        "N/A"}
                    </td>

                    <td>
                      {expenditure.quantity}
                    </td>

                    <td>
                      {expenditure.reason}
                    </td>

                    <td>
                      {expenditure.expenditureDate
                        ? new Date(
                            expenditure.expenditureDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td>
                      {expenditure.remarks ||
                        "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">
              <h2>Record Expenditure</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
            >

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

              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Reason</label>

                <input
                  type="text"
                  name="reason"
                  placeholder="Example: Damaged equipment"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Expenditure Date</label>

                <input
                  type="date"
                  name="expenditureDate"
                  value={
                    formData.expenditureDate
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
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
                  Record Expenditure
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Expenditures;