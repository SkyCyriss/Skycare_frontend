import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TreatmentPlan.css";

export default function TreatmentPlan() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patient = state?.patient;

  if (!patient) {
    return <div className="tp-empty">No patient selected</div>;
  }

  /* ---------------- Treatment Template ---------------- */

  const initialPhases = [
    {
      title: "Phase 1: Diagnosis & Prep",
      unlocked: true,
      tasks: [
        { name: "X-ray & Exam", status: "pending", time: null },
        { name: "Pulp Removal", status: "pending", time: null },
        { name: "Canal Cleaning", status: "pending", time: null },
        { name: "Temporary Filling", status: "pending", time: null },
      ],
    },
    {
      title: "Phase 2: Procedure",
      unlocked: false,
      tasks: [
        { name: "X-ray & Exam", status: "pending", time: null },
        { name: "Pulp Removal", status: "pending", time: null },
        { name: "Permanent Filling", status: "pending", time: null },
        { name: "Crown Fitting", status: "pending", time: null },
      ],
    },
    {
      title: "Phase 3: Recovery",
      unlocked: false,
      tasks: [
        { name: "Crown Fitting", status: "pending", time: null },
        { name: "6-Month Checkup", status: "pending", time: null },
        { name: "Follow-up Visit", status: "pending", time: null },
      ],
    },
  ];

  const [phases, setPhases] = useState(initialPhases);

  /* ---------------- Logic ---------------- */

  const updateTaskStatus = (phaseIndex, taskIndex) => {
    const updated = [...phases];
    const task = updated[phaseIndex].tasks[taskIndex];

    if (task.status === "pending") task.status = "in-progress";
    else if (task.status === "in-progress") {
      task.status = "completed";
      task.time = new Date().toLocaleString();
    }

    // Check if phase completed
    const allDone = updated[phaseIndex].tasks.every(
      (t) => t.status === "completed"
    );

    if (allDone && updated[phaseIndex + 1]) {
      updated[phaseIndex + 1].unlocked = true;
    }

    setPhases(updated);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="tp-layout">
      {/* Top Bar */}
      <header className="tp-topbar">
        <div>
          <strong>YOUR HOSPITAL NAME</strong>
          <span className="tp-online">● Online</span>
        </div>
        <button className="tp-end">END DAY & GENERATE REPORTS</button>
      </header>

      {/* Header */}
      <section className="tp-header">
        <h2>
          Treatment Plan: {patient.patientName} ({patient.token})
        </h2>
        <span>In Consultation</span>
      </section>

      {/* Content */}
      <section className="tp-content">
        {/* Left Menu */}
        <aside className="tp-sidebar">
          <h4>Visit Summary</h4>
          <button className="active">Treatment Plan</button>
          <button>Root Canal</button>
          <button>Filling</button>
          <button>Follow-up</button>
        </aside>

        {/* Phases */}
        <div className="tp-phases">
          {phases.map((phase, pIndex) => (
            <div
              key={pIndex}
              className={`tp-phase ${
                phase.unlocked ? "active" : "locked"
              }`}
            >
              <h4>{phase.title}</h4>

              {phase.tasks.map((task, tIndex) => (
                <div
                  key={tIndex}
                  className={`tp-step ${task.status}`}
                  onClick={() =>
                    phase.unlocked && updateTaskStatus(pIndex, tIndex)
                  }
                >
                  <span className="icon">
                    {task.status === "pending" && "○"}
                    {task.status === "in-progress" && "⏳"}
                    {task.status === "completed" && "✔"}
                  </span>

                  <span className="label">{task.name}</span>

                  {task.time && (
                    <span className="time">{task.time}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="tp-footer">
        <button onClick={() => navigate(-1)}>BACK</button>
        <button className="primary">SAVE PLAN</button>
      </footer>
    </div>
  );
}
