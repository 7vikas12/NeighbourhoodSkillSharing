import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

const getAuthToken = () => {
  try {
    const stored = localStorage.getItem("auth");
    if (!stored) return "";
    const parsed = JSON.parse(stored);
    return parsed?.accessToken || "";
  } catch {
    return "";
  }
};

export const addSkill = async (data) => {
  const token = getAuthToken();
  const res = await API.post("/skills", data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data?.data ?? res.data;
};

export const getSkills = async () => {
  const res = await API.get("/skills");
  return res.data?.data ?? [];
};
