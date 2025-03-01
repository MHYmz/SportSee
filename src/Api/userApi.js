import axios from "axios";

const BASE_URL = "http://localhost:3000";


const isMock = import.meta.env.VITE_IS_MOCK;
console.log("Valeur de VITE_IS_MOCK:", isMock);

const useMock = isMock === "true";

if (useMock) {
  console.log("Mode mock activé ✅");
} else {
  console.log("Mode API activé 🌐");
}

export const apiService = () => { 
   // Permet de trouver un utilisateur en vérifiant "id" ou "userId"
  const findUser = (id) => (item) => (item.id || item.userId )=== parseInt(id, 10);

  if (useMock) {
    return {
      fetchUserInfo: async (id) => {
        try {

        const response = await fetch("/mocks/userDetails.json");
        const result = await response.json();
        const user = result.find(findUser(id));

        return user 
        ? { data: { data: { ...user, score: Number(user.todayScore || user.score) || 0 } } } 
        : null;
      } catch (error) {
        console.error("Erreur lors du chargement des infos utilisateur mockées:", error);
        return null;
    }
  },
      fetchUserActivity: async (id) => {
        try {
        const response = await fetch("/mocks/userMove.json");
        const result = await response.json();
        const userActivity = result.find(findUser(id));
        return userActivity
        ? { data: { data: { sessions: userActivity.sessions } } }
        : null;
      } catch (error) {
        console.error ("Erreur lors du chargement de l'activité mockée", error);
        return null ;
      }
    },

      fetchSessionTrends: async (id) => {
        try {
        const response = await fetch("/mocks/userGraphTrack.json");
        const result = await response.json();
        const userGraphTrack = result.find(findUser(id));

        return userGraphTrack  ? { data: { data: { sessions: userGraphTrack.sessions } } } 
        : null;
      } catch (error) {
        console.error ("Erreur lors du chargement des sessions mockées:", error);
        return null
      }
    },
      fetchUserPerformance: async (id) => {
        try {
        const response = await fetch("/mocks/userPerfRadar.json");
        const result = await response.json();
        const userPerfRadar = result.find(findUser(id));

        return userPerfRadar 
        ? { data: { data: userPerfRadar } } 
        : null;
      } catch (error) {
        console.error ("Erreur lors du chargement des performances mockées", error)
        return null;
      }
    },
  };
}

  return {
    fetchUserInfo: async (id) => {
      try {
      const response = await axios.get(`${BASE_URL}/user/${id}`);
      const userData = response.data.data;
      return { data: { data: { ...userData, score: Number(userData.todayScore || userData.score) || 0 } } }; // Structure .data.data conservée
    } catch (error) {
      console.error ("Erreur lors du chargement des infos utilisateur API:", error);
      return null;
    }
    },

    fetchUserActivity: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${id}/activity`);
        return { data: { data: response.data.data } };
    } catch (error) {
      console.error("Erreur lors du chargement de l'activité API:", error);
      return null;
    }
  },


    fetchSessionTrends: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${id}/average-sessions`);
        return { data: { data: response.data.data } };
    } catch (error) {
      console.error("Erreur lors du chargement des sessions API:", error);
      return null;
    }
  },

    fetchUserPerformance: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${id}/performance`);
        return { data: { data: response.data.data || response.data } };
    } catch (error) {
      console.error("Erreur lors du chargement des Performances API:", error )
      return null;
    }
  },
  };
};