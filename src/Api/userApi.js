import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Fonction pour récupérer les informations générales de l'utilisateur
export const getGeneralInfo = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}`);
  if (data.todayScore) {
    data.score = data.todayScore;
  }
  return data;
};

// Fonction pour récupérer l'activité de l'utilisateur
export const getActivity = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/activity`);
  return data;
};

// Fonction pour récupérer les sessions moyennes de l'utilisateur
export const getAverageSessions = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/average-sessions`);
  return data;
};

// Fonction pour récupérer les performances de l'utilisateur
export const getPerformance = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/performance`);
  return data;
};
