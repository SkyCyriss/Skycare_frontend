import React, { useEffect, useState } from "react";
import "./Registration.css";
import Navbar from "../Navbar/Navbar";

import {
  registerPatientApi,
  getPatientByPhoneApi,
  getComplaintsApi,
  addComplaintApi,
} from "../../api/Api";

function Patientform() {
  const [step, setStep] = useState(1);

  /* ================= MOBILE / OTP ================= */
  const [mobile, setMobile] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  /* ================= EXISTING PATIENT ================= */
  const [existingPatient, setExistingPatient] = useState(null);

  /* ================= CURRENT USER ================= */
  const [user, setUser] = useState({
    name: "",
    age: "",
    gender: "",
    complaintId: "",
  });

  /* ================= COMPLAINTS ================= */
  const [complaints, setComplaints] = useState([]);

  /* ================= PAYMENT ================= */
  const registrationFee = 50;
  const [consultationFee, setConsultationFee] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalAmount =
    registrationFee + (Number(consultationFee) || 0);

  /* ================= LOAD COMPLAINTS ================= */
  const loadComplaints = async () => {
    const data = await getComplaintsApi();
    setComplaints(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  /* ================= SEND OTP ================= */
  const handleSendOtp = () => {
    const regex = /^[6-9]\d{9}$/;
    if (!regex.test(mobile)) {
      setError("Enter valid Indian mobile number");
      return;
    }

    const demoOtp = Math.floor(
      100000 + Math.random() * 900000
    );
    setGeneratedOtp(demoOtp.toString());
    alert(`Demo OTP: ${demoOtp}`);

    setError("");
    setStep(2);
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

    try {
      const patient =
        await getPatientByPhoneApi(mobile);

      if (patient && patient.name) {
        setExistingPatient(patient);
        setStep(3.5);
      } else {
        setStep(3);
      }
    } catch {
      setStep(3);
    }
  };

  /* ================= SAVE PATIENT ================= */
  const handleSavePatient = async () => {
    console.log("PATIENT DATA BEFORE SAVE:", user);

    if (
      !user.name?.trim() ||
      !user.age ||
      !user.gender ||
      !user.complaintId
    ) {
      alert("Fill all patient details");
      return;
    }

    await registerPatientApi(
      {
        name: user.name,
        age: Number(user.age),
        gender: user.gender,
      },
      mobile,
      user.complaintId
    );

    setStep(4);
  };

  /* ================= PAYMENT ================= */
  const handlePayment = () => {
    if (!consultationFee || !paymentMethod) {
      alert("Complete payment details");
      return;
    }
    setStep(5);
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h2>Let's Get You Registered</h2>

          <input
            className="input"
            placeholder="Mobile Number"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
          />

          {error && <p className="error">{error}</p>}

          <button className="button" onClick={handleSendOtp}>
            Verify via OTP
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h2>Verify OTP</h2>

          <input
            className="input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
          />

          {error && <p className="error">{error}</p>}

          <button className="button" onClick={handleVerifyOtp}>
            Verify OTP
          </button>

          <button
            className="button secondary"
            onClick={() => setStep(1)}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* STEP 3.5 EXISTING PATIENT */}
      {step === 3.5 && existingPatient && (
        <div className="card">
          <h2>Hello, {existingPatient.name} 👋</h2>
          <p>Who is visiting today?</p>

          <button
            className="button"
            onClick={() => {
              setUser({
                name: existingPatient.name,
                age: existingPatient.age,
                gender: existingPatient.gender,
                complaintId: "",
              });
              setStep(3);
            }}
          >
            {existingPatient.name}
          </button>

          <button
            className="button"
            style={{ background: "#16a34a" }}
            onClick={() => {
              setUser({
                name: "",
                age: "",
                gender: "",
                complaintId: "",
              });
              setStep(3);
            }}
          >
            + Add Family Member
          </button>

          <button
            className="button secondary"
            onClick={() => setStep(2)}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h2>Enter Patient Details</h2>

          <input className="input" value={mobile} readOnly />

          <input
            className="input"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Age"
            value={user.age}
            onChange={(e) =>
              setUser({ ...user, age: e.target.value })
            }
          />

          <div className="row">
            {["male", "female", "other"].map((g) => (
              <button
                key={g}
                className={`gender-btn ${
                  user.gender === g ? "active" : ""
                }`}
                onClick={() =>
                  setUser({ ...user, gender: g })
                }
              >
                {g}
              </button>
            ))}
          </div>

          <select
            className="input"
            value={user.complaintId}
            onChange={(e) =>
              setUser({
                ...user,
                complaintId: e.target.value,
              })
            }
          >
            <option value="">Select Complaint</option>
            {complaints.map((c) => (
              <option key={c.id} value={c.id}>
                {c.complaint}
              </option>
            ))}
          </select>

          <button className="button" onClick={handleSavePatient}>
            Continue
          </button>

          <button
            className="button secondary"
            onClick={() =>
              existingPatient ? setStep(3.5) : setStep(2)
            }
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="card">
          <h2>Payment</h2>

          <input
            className="input"
            placeholder="Consultation Fee"
            value={consultationFee}
            onChange={(e) =>
              setConsultationFee(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

          <p>Total: ₹{totalAmount}</p>

          <select
            className="input"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option value="">Select Payment Method</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <button className="button" onClick={handlePayment}>
            Pay & Confirm
          </button>

          <button
            className="button secondary"
            onClick={() => setStep(3)}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="card">
          <h2>Registration Successful ✅</h2>

          <button
            className="button"
            onClick={() => window.location.reload()}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default Patientform;
