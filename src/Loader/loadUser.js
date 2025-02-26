import { apiService } from "../Api/userApi";
import UserStats from "../utils/UserStats";

export default async function loadUser({ params } = {}) {
  try {
    if (!params || !params.id) {
      throw new Error("L'ID utilisateur est manquant !");
    }

    const { id } = params;
    const { fetchUserInfo, fetchUserActivity, fetchSessionTrends, fetchUserPerformance } = apiService();

    const userInfoResponse = await fetchUserInfo(id);
    const userActivityResponse = await fetchUserActivity(id);
    const sessionTrendsResponse = await fetchSessionTrends(id);
    const userPerformanceResponse = await fetchUserPerformance(id);

    console.log("Réponse userInfo :", userInfoResponse);
    console.log("Réponse userActivity :", userActivityResponse);
    console.log("Réponse sessionTrends :", sessionTrendsResponse);
    console.log("Réponse userPerformance :", userPerformanceResponse);

    if (!userInfoResponse || !userInfoResponse.data) {
      throw new Error("Données utilisateur introuvables dans userInfoResponse");
    }
    if (!userActivityResponse || !userActivityResponse.data || !userActivityResponse.data.data || !userActivityResponse.data.data.sessions) {
      throw new Error("Activité utilisateur introuvable dans userActivityResponse");
    }
    if (!sessionTrendsResponse || !sessionTrendsResponse.data || !sessionTrendsResponse.data.data || !sessionTrendsResponse.data.data.sessions) {
      throw new Error("Tendances de session introuvables dans sessionTrendsResponse");
    }
    if (!userPerformanceResponse || !userPerformanceResponse.data) {
      throw new Error("Performances utilisateur introuvables dans userPerformanceResponse");
    }

    const infosGen = userInfoResponse.data.data;
    const taskFlow = userActivityResponse.data.data.sessions;
    const graphTrack = sessionTrendsResponse.data.data.sessions;
    const perf = userPerformanceResponse.data.data;

    return new UserStats(infosGen, taskFlow, graphTrack, perf);
  } catch (e) {
    console.error("Erreur lors du chargement des données utilisateur :", e);
    throw e; 
  }
}
