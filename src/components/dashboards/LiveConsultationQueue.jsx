import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  FileText,
  ArrowUpCircle,
  Phone,
  Activity,
  Upload,
  ArrowLeft,
  XCircle,
  Zap,
  Users,
  Calendar,
} from "lucide-react";
import "./LiveConsultationQueue.css";

export default function LiveConsultationQueue() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("waiting");
  const [inConsultationPatient, setInConsultationPatient] = useState(null);
  const [showReports, setShowReports] = useState(false);

  /* ---------------- Dummy Queue Data ---------------- */
  const queue = [
    {
      id: 1,
      token: "D-105",
      patientName: "Simran K",
      reason: "Severe Tooth Pain",
      priority: "emergency",
      waitTime: "2 min",
      age: 28,
      arrivalTime: "09:45 AM"
    },
    {
      id: 2,
      token: "D-106",
      patientName: "Rahul S",
      reason: "Routine Check-up",
      priority: "senior",
      waitTime: "5 min",
      age: 67,
      arrivalTime: "09:50 AM"
    },
    {
      id: 3,
      token: "D-107",
      patientName: "Priya M",
      reason: "Teeth Cleaning",
      priority: "normal",
      waitTime: "18 min",
      age: 34,
      arrivalTime: "10:05 AM"
    },
  ];

  /* ---------------- Actions ---------------- */

  const handleCallNext = (patient) => {
    setInConsultationPatient(patient);
    setActiveTab("consultation");
    setShowReports(false);
  };

  const openReports = () => {
    if (!inConsultationPatient) return;
    setShowReports(true);
  };

  const backToConsultation = () => {
    setShowReports(false);
  };

  const openTreatmentPlan = () => {
    if (!inConsultationPatient) {
      alert("No patient selected for Treatment Plan");
      return;
    }

    navigate("/dashboard/treatment-plan", {
      state: { patient: inConsultationPatient },
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="lcq-wrapper">
      {/* Top Bar */}
      <header className="lcq-topbar">
        <div className="lcq-hospital-info">
          <div className="lcq-hospital-icon">
            <Activity size={28} />
          </div>
          <div className="lcq-hospital-text">
            <strong>MedCare Dental Clinic</strong>
            <span className="lcq-subtitle">Excellence in Dental Care</span>
          </div>
        </div>
        
        <div className="lcq-topbar-stats">
          <div className="lcq-stat-item">
            <Users size={16} />
            <span className="lcq-stat-value">{queue.length}</span>
            <span className="lcq-stat-label">Waiting</span>
          </div>
          <div className="lcq-stat-item">
            <Calendar size={16} />
            <span className="lcq-stat-value">Feb 2</span>
            <span className="lcq-stat-label">Today</span>
          </div>
          <div className="lcq-status">
            <span className="lcq-status-dot"></span>
            <span className="lcq-status-text">Live</span>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="lcq-page-header">
        <div className="lcq-header-content">
          <div className="lcq-header-left">
            <h2>Consultation Queue</h2>
            <div className="lcq-doctor-info">
              <div className="lcq-doctor-avatar">
                <User size={18} />
              </div>
              <div className="lcq-doctor-details">
                <span className="lcq-doctor-name">Dr. Sharma</span>
                <span className="lcq-doctor-specialty">General Dentistry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="lcq-queue-tabs">
        <button
          className={`lcq-tab ${activeTab === "waiting" ? "lcq-tab-active" : ""}`}
          onClick={() => {
            setActiveTab("waiting");
            setShowReports(false);
          }}
        >
          <Clock size={20} />
          <div className="lcq-tab-content">
            <span className="lcq-tab-title">Waiting Room</span>
            <span className="lcq-tab-count">{queue.length} patients</span>
          </div>
        </button>

        <button
          className={`lcq-tab ${activeTab === "consultation" ? "lcq-tab-active" : ""}`}
          onClick={() => setActiveTab("consultation")}
        >
          <Activity size={20} />
          <div className="lcq-tab-content">
            <span className="lcq-tab-title">In Consultation</span>
            <span className="lcq-tab-count">{inConsultationPatient ? "1 active" : "None"}</span>
          </div>
        </button>

        <button
          className={`lcq-tab ${activeTab === "completed" ? "lcq-tab-active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          <CheckCircle size={20} />
          <div className="lcq-tab-content">
            <span className="lcq-tab-title">Completed</span>
            <span className="lcq-tab-count">0 today</span>
          </div>
        </button>
      </section>

      {/* ---------------- Waiting Room ---------------- */}
      {activeTab === "waiting" && (
        <section className="lcq-queue-list">
          {queue.map((p, index) => (
            <div key={p.id} className={`lcq-patient-card lcq-priority-${p.priority}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="lcq-card-glow"></div>
              
              <div className="lcq-patient-left">
                <div className="lcq-token">
                  <span className="lcq-token-number">{p.token}</span>
                </div>
                
                <div className="lcq-patient-details">
                  <div className="lcq-name-row">
                    <h3 className="lcq-name">{p.patientName}</h3>
                    {p.priority === "emergency" && (
                      <span className="lcq-badge lcq-badge-emergency">
                        <Zap size={12} />
                        URGENT
                      </span>
                    )}
                    {p.priority === "senior" && (
                      <span className="lcq-badge lcq-badge-senior">
                        <User size={12} />
                        SENIOR
                      </span>
                    )}
                  </div>
                  
                  <div className="lcq-patient-meta">
                    <span className="lcq-meta-item">
                      <User size={13} />
                      {p.age} years
                    </span>
                    <span className="lcq-meta-separator">•</span>
                    <span className="lcq-meta-item">
                      <Clock size={13} />
                      Arrived {p.arrivalTime}
                    </span>
                  </div>
                  
                  <div className="lcq-reason">
                    <FileText size={13} />
                    {p.reason}
                  </div>
                </div>
              </div>

              <div className="lcq-patient-right">
                <div className="lcq-wait-indicator">
                  <div className="lcq-wait-time">
                    <span className="lcq-wait-number">{p.waitTime.split(' ')[0]}</span>
                    <span className="lcq-wait-unit">{p.waitTime.split(' ')[1]}</span>
                  </div>
                  <span className="lcq-wait-label">waiting</span>
                </div>
                
                <div className="lcq-actions">
                  <button className="lcq-btn lcq-btn-call" onClick={() => handleCallNext(p)}>
                    <Phone size={16} />
                    <span>Call Patient</span>
                  </button>
                  <button className="lcq-btn lcq-btn-move" title="Move to top">
                    <ArrowUpCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ---------------- Consultation Panel ---------------- */}
      {activeTab === "consultation" && !showReports && (
        <section className="lcq-consultation-panel">
          {inConsultationPatient ? (
            <div className="lcq-consult-container">
              <div className="lcq-consultation-header">
                <div className="lcq-header-top">
                  <h3>Clinical Session</h3>
                  <div className="lcq-session-badge">
                    <span className="lcq-session-pulse"></span>
                    In Progress
                  </div>
                </div>
                
                <div className="lcq-patient-summary">
                  <div className="lcq-summary-token">{inConsultationPatient.token}</div>
                  <div className="lcq-summary-info">
                    <h4>{inConsultationPatient.patientName}</h4>
                    <p>{inConsultationPatient.reason}</p>
                  </div>
                </div>
              </div>

              <div className="lcq-consult-content">
                <div className="lcq-notes-section">
                  <div className="lcq-section-header">
                    <FileText size={20} />
                    <h4>Clinical Notes</h4>
                  </div>
                  <textarea 
                    placeholder="Document findings, symptoms, diagnosis, and treatment recommendations..."
                    className="lcq-notes-textarea"
                  ></textarea>
                </div>

                <div className="lcq-consult-actions">
                  <button className="lcq-action-btn lcq-action-reports" onClick={openReports}>
                    <div className="lcq-action-icon">
                      <FileText size={24} />
                    </div>
                    <div className="lcq-action-text">
                      <span>View Reports</span>
                      <small>Medical records & scans</small>
                    </div>
                    <ArrowLeft className="lcq-action-arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
                  </button>

                  <button className="lcq-action-btn lcq-action-treatment" onClick={openTreatmentPlan}>
                    <div className="lcq-action-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div className="lcq-action-text">
                      <span>Treatment Plan</span>
                      <small>Create care roadmap</small>
                    </div>
                    <ArrowLeft className="lcq-action-arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
                  </button>

                  <button className="lcq-action-btn lcq-action-end">
                    <div className="lcq-action-icon">
                      <XCircle size={24} />
                    </div>
                    <div className="lcq-action-text">
                      <span>End Session</span>
                      <small>Complete & close consultation</small>
                    </div>
                    <ArrowLeft className="lcq-action-arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lcq-empty-state">
              <div className="lcq-empty-icon-wrapper">
                <Activity size={64} />
              </div>
              <h3>No Active Consultation</h3>
              <p>Select a patient from the waiting room to begin</p>
            </div>
          )}
        </section>
      )}

      {/* ---------------- Reports ---------------- */}
      {activeTab === "consultation" && showReports && (
        <section className="lcq-reports-page">
          <div className="lcq-reports-header">
            <div>
              <h3>Medical Records</h3>
              <p className="lcq-reports-subtitle">
                {inConsultationPatient.patientName} • {inConsultationPatient.token}
              </p>
            </div>
            <button className="lcq-btn-back" onClick={backToConsultation}>
              <ArrowLeft size={18} />
              Back to Session
            </button>
          </div>

          <div className="lcq-reports-content">
            <div className="lcq-report-card">
              <div className="lcq-report-header">
                <h4>Diagnostic Imaging</h4>
                <span className="lcq-report-badge">X-Ray</span>
              </div>
              
              <div className="lcq-xray-box">
                <FileText size={56} className="lcq-xray-icon" />
                <p>Molar #14 X-Ray</p>
                <span className="lcq-xray-date">Jan 28, 2026</span>
              </div>
              
              <button className="lcq-btn lcq-btn-secondary">
                <Upload size={16} />
                Upload New Image
              </button>
            </div>

            <div className="lcq-report-card">
              <div className="lcq-report-header">
                <h4>Documents & Records</h4>
                <span className="lcq-report-badge">2 files</span>
              </div>
              
              <div className="lcq-document-list">
                <div className="lcq-document-item">
                  <FileText size={20} />
                  <div className="lcq-document-info">
                    <span className="lcq-document-name">Referral_OralSurgeon.pdf</span>
                    <span className="lcq-document-date">Feb 1, 2026</span>
                  </div>
                </div>
                <div className="lcq-document-item">
                  <FileText size={20} />
                  <div className="lcq-document-info">
                    <span className="lcq-document-name">Previous_Treatment.pdf</span>
                    <span className="lcq-document-date">Jan 15, 2026</span>
                  </div>
                </div>
              </div>
              
              <button className="lcq-btn lcq-btn-secondary">
                <Upload size={16} />
                Upload Document
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Completed Tab ---------------- */}
      {activeTab === "completed" && (
        <section className="lcq-queue-list">
          <div className="lcq-empty-state">
            <div className="lcq-empty-icon-wrapper">
              <CheckCircle size={64} />
            </div>
            <h3>No Completed Sessions</h3>
            <p>Completed consultations will appear here</p>
          </div>
        </section>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Using axios for API calls
// import "./LiveConsultationQueue.css";

// export default function LiveConsultationQueue() {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("waiting");
//   const [inConsultationPatient, setInConsultationPatient] = useState(null);
//   const [showReports, setShowReports] = useState(false);
//   const [queue, setQueue] = useState([]); // Queue state from API
//   const [loading, setLoading] = useState(true);

//   /* ---------------- Fetch Queue from API ---------------- */
//   const fetchQueue = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8082/dine-ease/api/v1/patients/waiting" // replace with your API endpoint
//       );
//       setQueue(response.data); // assuming API returns array of patients
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching queue:", error);
//       setLoading(false);
//     }
//   };

//   /* ---------------- Polling / Live Updates ---------------- */
//   useEffect(() => {
//     fetchQueue(); // initial fetch
//     const interval = setInterval(() => {
//       fetchQueue(); // fetch every 5 seconds
//     }, 5000);

//     return () => clearInterval(interval); // cleanup interval
//   }, []);

//   /* ---------------- Actions ---------------- */
//   const handleCallNext = (patient) => {
//     setInConsultationPatient(patient);
//     setActiveTab("consultation");
//     setShowReports(false);
//   };

//   const openReports = () => {
//     if (!inConsultationPatient) return;
//     setShowReports(true);
//   };

//   const backToConsultation = () => {
//     setShowReports(false);
//   };

//   const openTreatmentPlan = () => {
//     if (!inConsultationPatient) {
//       alert("No patient selected for Treatment Plan");
//       return;
//     }

//     navigate("/dashboard/treatment-plan", {
//       state: { patient: inConsultationPatient },
//     });
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="lcq-wrapper">
//       <header className="topbar">
//         <div className="hospital-info">
//           <strong>YOUR HOSPITAL NAME</strong>
//           <span className="online">● Online</span>
//         </div>
//       </header>

//       <section className="page-header">
//         <h2>Live Consultation Queue</h2>
//         <span>Dr. Sharma — General Dentistry</span>
//       </section>

//       <section className="queue-tabs">
//         <button
//           className={activeTab === "waiting" ? "active" : ""}
//           onClick={() => {
//             setActiveTab("waiting");
//             setShowReports(false);
//           }}
//         >
//           Waiting Room
//         </button>

//         <button
//           className={activeTab === "consultation" ? "active" : ""}
//           onClick={() => setActiveTab("consultation")}
//         >
//           In Consultation
//         </button>

//         <button
//           className={activeTab === "completed" ? "active" : ""}
//           onClick={() => setActiveTab("completed")}
//         >
//           Completed Today
//         </button>
//       </section>

//       {activeTab === "waiting" && (
//         <section className="queue-list">
//           {loading ? (
//             <p>Loading queue...</p>
//           ) : queue.length === 0 ? (
//             <p>No patients waiting</p>
//           ) : (
//             queue.map((p) => (
//               <div key={p.id} className={`patient-card ${p.priority}`}>
//                 <div className="patient-left">
//                   <div className="token">Token: {p.token}</div>
//                   <div className="name">{p.patientName}</div>
//                   <div className="reason">{p.reason}</div>
//                 </div>

//                 <div className="patient-middle">
//                   {p.priority === "emergency" && (
//                     <span className="badge emergency">EMERGENCY</span>
//                   )}
//                   {p.priority === "senior" && (
//                     <span className="badge senior">SENIOR</span>
//                   )}
//                 </div>

//                 <div className="patient-right">
//                   <span className="wait">Waiting: {p.waitTime}</span>
//                   <div className="actions">
//                     <button className="call" onClick={() => handleCallNext(p)}>
//                       CALL NEXT
//                     </button>
//                     <button className="move">MOVE TO TOP</button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </section>
//       )}

//       {activeTab === "consultation" && !showReports && (
//         <section className="consultation-panel">
//           {inConsultationPatient ? (
//             <>
//               <h3>
//                 Clinical Notes – {inConsultationPatient.patientName} (
//                 {inConsultationPatient.token})
//               </h3>

//               <div className="consult-actions">
//                 <button onClick={openReports}>REPORTS & SCANS</button>

//                 <button onClick={openTreatmentPlan}>TREATMENT PLAN</button>

//                 <button className="end">END SESSION</button>
//               </div>
//             </>
//           ) : (
//             <p>No patient in consultation</p>
//           )}
//         </section>
//       )}

//       {activeTab === "consultation" && showReports && (
//         <section className="reports-page">
//           <div className="reports-header">
//             <h3>
//               Reports – {inConsultationPatient.patientName} (
//               {inConsultationPatient.token})
//             </h3>
//             <button onClick={backToConsultation}>← Back</button>
//           </div>

//           <div className="reports-content">
//             <div className="report-card">
//               <h4>X-Ray – Molar #14</h4>
//               <div className="xray-box">🦷 X-Ray Image</div>
//             </div>

//             <div className="report-card">
//               <h4>Documents</h4>
//               <p>Referral_OralSurgeon.pdf</p>
//               <button>UPLOAD NEW</button>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }
