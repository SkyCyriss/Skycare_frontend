import axios from "axios";

/* ================================
   AXIOS INSTANCE
================================ */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* ================================
   REGISTER PATIENT
   ⚠️ complantId (MATCH BACKEND)
================================ */
export const registerPatientApi = async (
  patient,
  phone,
  complantId
) => {
  const response = await api.post(
    `/patient/register?phone=${phone}&complantId=${complantId}`,
    {
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
    }
  );

  return response.data;
};

/* ================================
   GET PATIENT BY PHONE
================================ */
export const getPatientByPhoneApi = async (phone) => {
  const response = await api.get(
    `/patient/register?phone=${phone}`
  );

  return Array.isArray(response.data)
    ? response.data
    : [];
};

/* ================================
   GET COMPLAINTS
================================ */
export const getComplaintsApi = async () => {
  const response = await api.get(
    "/patient/complaints"
  );

  return Array.isArray(response.data)
    ? response.data
    : [];
};

/* ================================
   ADD COMPLAINT
================================ */
export const addComplaintApi = async (data) => {
  const response = await api.post(
    "/patient/complaints",
    data
  );

  return response.data;
};

export default api;
