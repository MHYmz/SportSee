import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Fonction pour récupérer les informations générales de l'utilisateur
export const fetchUserInfo = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  console.log("Réponse API:", response.data);
  const userData = response.data.data; 
 
  return {
    ...userData, 
    score: Number(userData.todayScore || userData.score) || 0, 
  };
};

// Fonction pour récupérer l'activité de l'utilisateur
export const fetchUserActivity = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/activity`);
  return data;
};

// Fonction pour récupérer les sessions moyennes de l'utilisateur
export const fetchSessionTrends = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/average-sessions`);
  return data;
};

// Fonction pour récupérer les performances de l'utilisateur
export const fetchUserPerformance = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/user/${userId}/performance`);
  return data;
};
