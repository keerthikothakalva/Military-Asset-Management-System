import { FaFire } from "react-icons/fa";

function Expenditures() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Expenditures</h1>
          <p>Track assets that have been expended.</p>
        </div>

        <button className="primary-button">
          + Record Expenditure
        </button>
      </div>

      <div className="content-card">
        <div className="empty-state">
          <FaFire />

          <h3>No Expenditures Found</h3>

          <p>
            Expenditure records will appear here once they are recorded.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Expenditures;