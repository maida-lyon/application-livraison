// frontend/src/app/lib/auth.ts
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const checkRole = async (expectedRole: string) => {
  try {
    const res = await axios.get(`${API}/api/users/profile`, {
      withCredentials: true,
    });

    const { role } = res.data;
    return role === expectedRole;
  } catch (err: any) {
    console.error("Échec checkRole :", err?.message || err);
    return false;
  }
};
