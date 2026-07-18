import { useEffect, useState } from "react";
import {
  FaUserShield,
  FaPlus,
} from "react-icons/fa";
import api from "../services/api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [bases, setBases] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    base: "",
    equipment: "",
    assignedTo: "",
    quantity: "",
    assignedDate: "",
    remarks: "",
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [
          assignmentsResponse,
          basesResponse,
          equipmentResponse,
        ] = await Promise.all([
          api.get("/api/assignments", {
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
          setAssignments(
            assignmentsResponse.data.data
          );

          setBases(
            basesResponse.data.data
          );

          setEquipment(
            equipmentResponse.data.data
          );

          setError("");
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error.response?.data?.message ||
              "Failed to load assignment data"
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
        "/api/assignments",
        {
          ...formData,
          quantity: Number(
            formData.quantity
          ),
        }
      );

      setFormData({
        base: "",
        equipment: "",
        assignedTo: "",
        quantity: "",
        assignedDate: "",
        remarks: "",
      });

      setShowModal(false);
      setError("");

      const response = await api.get(
        "/api/assignments",
        {
          params: {
            page: 1,
            limit: 10,
            sort: "-createdAt",
          },
        }
      );

      setAssignments(
        response.data.data
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create assignment"
      );
    }
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Assignments</h1>

          <p>
            Assign equipment to military personnel.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowModal(true)
          }
        >
          <FaPlus />
          Create Assignment
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="loading-state">
          Loading assignments...
        </div>
      ) : assignments.length === 0 ? (
        <div className="empty-state">
          <FaUserShield />

          <h3>No Assignments Found</h3>

          <p>
            No equipment assignments are available.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">

            <thead>
              <tr>
                <th>Base</th>
                <th>Equipment</th>
                <th>Assigned To</th>
                <th>Quantity</th>
                <th>Assigned Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map(
                (assignment) => (
                  <tr
                    key={assignment._id}
                  >

                    <td>
                      {assignment.base?.name ||
                        "N/A"}
                    </td>

                    <td>
                      {assignment.equipment?.name ||
                        "N/A"}
                    </td>

                    <td>
                      {assignment.assignedTo}
                    </td>

                    <td>
                      {assignment.quantity}
                    </td>

                    <td>
                      {assignment.assignedDate
                        ? new Date(
                            assignment.assignedDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td>
                      {assignment.remarks ||
                        "-"}
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal-card">

            <div className="modal-header">
              <h2>Create Assignment</h2>

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
                      {base.name} (
                      {base.code}
                      )
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

                  {equipment.map(
                    (item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Assigned To */}
              <div className="form-group">
                <label>
                  Assigned To
                </label>

                <input
                  type="text"
                  name="assignedTo"
                  placeholder="Enter personnel name"
                  value={
                    formData.assignedTo
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  placeholder="Enter quantity"
                  value={
                    formData.quantity
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Assigned Date */}
              <div className="form-group">
                <label>
                  Assigned Date
                </label>

                <input
                  type="date"
                  name="assignedDate"
                  value={
                    formData.assignedDate
                  }
                  onChange={handleChange}
                />
              </div>

              {/* Remarks */}
              <div className="form-group">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  placeholder="Enter remarks"
                  value={
                    formData.remarks
                  }
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
                  Assign Equipment
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Assignments;