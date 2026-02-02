import React from "react";
import "./PatientProfile.css";

const PatientProfile = () => {
  return (
    <div className="profile-container">
      {/* Header */}
      <h1 className="page-title">360° Patient Profile View</h1>

      {/* Main Grid */}
      <div className="dashboard-grid">
        
        {/* Patient Card */}
        <div className="card patient-card">
          <div className="patient-header">
            <img
              src="https://i.pravatar.cc/80"
              alt="patient"
              className="avatar"
            />
            <div>
              <h3>Rahul S</h3>
              <p>ID: 186 • Age: 44</p>
              <p>Blood Group: O+</p>
            </div>
          </div>
          <div className="card-actions">
            <button>Send Follow-up</button>
            <button className="outline">Start Consultation</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="card timeline-card">
          <h3>Timeline & Visit History</h3>
          <ul className="timeline">
            <li>Root Canal – Phase 2 Completed</li>
            <li>Annual Checkup – Cleaning</li>
            <li>Consultation – Diagnosis</li>
          </ul>
        </div>

        {/* Current Treatment */}
        <div className="card treatment-card">
          <h3>Current Treatment Plan</h3>
          <label>
            <input type="checkbox" checked readOnly />
            Phase 1 – Diagnosis
          </label>
          <label>
            <input type="checkbox" />
            Phase 2 – Procedure
          </label>
          <label>
            <input type="checkbox" />
            Phase 3 – Restoration
          </label>
          <button className="primary">View Oral Charts</button>
        </div>

        {/* X-Ray Images */}
        <div className="card xray-card">
          <h3>Current Treatment Plan</h3>
          <div className="xray-images">
            <img src="/assets/xray1.png" alt="xray" />
            <img src="/assets/xray2.png" alt="xray" />
          </div>
        </div>

        {/* Reports */}
        <div className="card reports-card">
          <h3>Digital Reports</h3>
          <ul>
            <li>Radiology Report (Active)</li>
            <li>Prescription – Jan 24</li>
          </ul>
          <button className="outline">View All Reports</button>
        </div>

        {/* Financial */}
        <div className="card finance-card">
          <h3>Financial Summary</h3>
          <p>Outstanding Balance: ₹0.00</p>
          <p>Last Invoice: Paid</p>
          <button className="outline">Download Statement</button>
        </div>

      </div>
    </div>
  );
};

export default PatientProfile;
