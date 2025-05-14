import axios from "axios";

const API = "https://application-backend-final-clean.onrender.com";

export const fetchMissions = async () => {
  const res = await axios.get(`${API}/api/commandes`, { withCredentials: true });
  return res.data;
};

export const postWorkflow = async (data: any) => {
  return await axios.post(`${API}/api/workflows`, data, { withCredentials: true });
};

export const postSignature = async (data: any) => {
  return await axios.post(`${API}/api/signatures`, data, { withCredentials: true });
};

export const postVehicule = async (data: any) => {
  return await axios.post(`${API}/api/vehicules`, data, { withCredentials: true });
};
