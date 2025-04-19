import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchMissions = async () => {
  const res = await axios.get(`${API}/api/commandes`);
  return res.data;
};

export const postWorkflow = async (data: any) => {
  return await axios.post(`${API}/api/workflows`, data);
};

export const postSignature = async (data: any) => {
  return await axios.post(`${API}/api/signatures`, data);
};

export const postVehicule = async (data: any) => {
  return await axios.post(`${API}/api/vehicules`, data);
};
