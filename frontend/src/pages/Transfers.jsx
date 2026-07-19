import { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaPlus,
} from "react-icons/fa";
import api from "../services/api";
import "./Transfers.css";

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fromBase: "",
    toBase: "",
    equipment: "",
    quantity: "",
    transferDate: "",
    remarks: "",
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [
          transfersResponse,
          basesResponse,
          equipmentResponse,
        ] = await Promise.all([
          api.get("/api/transfers", {
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
          setTransfers(transfersResponse.data.data);
          setBases(basesResponse.data.data);
          setEquipment(equipmentResponse.data.data);
          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message ||
              "Failed to load transfer data"
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

    if (formData.fromBase === formData.toBase) {
      setError(
        "Source and destination bases cannot be the same."
      );
      return;
    }

    try {
      await api.post("/api/transfers", {
        ...formData,
        quantity: Number(formData.quantity),
      });

      setFormData({
        fromBase: "",
        toBase: "",
        equipment: "",
        quantity: "",
        transferDate: "",
        remarks: "",
      });

      setShowModal(false);
      setError("");

      const response = await api.get(
        "/api/transfers",
        {
          params: {
            page: 1,
            limit: 10,
            sort: "-createdAt",
          },
        }
      );

      setTransfers(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create transfer"
      );
    }
  };

  return (
    <div className="page-container">

      
      <div className="page-header">
        <div>
          <h1>Transfers</h1>

          <p>
            Manage equipment transfers between bases.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          Record Transfer
        </button>
      </div>

      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      
      {loading ? (
        <div className="loading-state">
          Loading transfers...
        </div>
      ) : transfers.length === 0 ? (
        <div className="empty-state">
          <FaExchangeAlt />

          <h3>No Transfers Found</h3>

          <p>
            No transfer records are available.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">

            <thead>
              <tr>
                <th>From Base</th>
                <th>To Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
                <th>Transfer Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer._id}>

                  <td>
                    {transfer.fromBase?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {transfer.toBase?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {transfer.equipment?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {transfer.quantity}
                  </td>

                  <td>
                    {transfer.transferDate
                      ? new Date(
                          transfer.transferDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    {transfer.remarks || "-"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      
      {showModal && (
        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">
              <h2>Record Transfer</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                x
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              
              <div className="form-group">
                <label>From Base</label>

                <select
                  name="fromBase"
                  value={formData.fromBase}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Source Base
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
                <label>To Base</label>

                <select
                  name="toBase"
                  value={formData.toBase}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Destination Base
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
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div className="form-group">
                <label>Transfer Date</label>

                <input
                  type="date"
                  name="transferDate"
                  value={formData.transferDate}
                  onChange={handleChange}
                />
              </div>

              
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
                  Record Transfer
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Transfers;