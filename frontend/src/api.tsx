import axios from "axios";

const API_BASE = "http://localhost:3001/api";

export const getBudgetByYear = async (year: number) => {
  const res = await axios.get(`${API_BASE}/budgets/${year}`);
  return res.data;
};

export const getComparison = async (from: number, to: number) => {
  const res = await axios.get(`${API_BASE}/budgets/comparison/range`, {
    params: { from, to },
  });
  return res.data;
};

export const submitFeedback = async (name: string, email: string, message: string) => {
  const res = await axios.post(`${API_BASE}/feedback`, { name, email, message });
  return res.data;
};

export const getFeedback = async () => {
  const res = await axios.get(`${API_BASE}/feedback`);
  return res.data;
};
