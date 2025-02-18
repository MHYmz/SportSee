import { fetchUserInfo, fetchUserActivity, fetchSessionTrends, fetchUserPerformance } from "../Api/UserApi";
import UserStats from "../utils/UserStats";

export default async function loadUserData({ params }) {
  try {
    const userId = params.id;

    const infosGen = (await fetchUserInfo(userId)).data; 
    const taskFlow = (await fetchUserActivity(userId)).data.sessions; 
    const graphTrack = (await fetchSessionTrends(userId)).data.sessions; 
    const perf = (await fetchUserPerformance(userId)).data; 

    // Vérifier que toutes les données sont bien présentes avant de créer l'objet UserStats
    if (!infosGen || !taskFlow || !graphTrack || !perf) {
      throw new Error("Données utilisateur manquantes.");
    }

    return new UserStats(infosGen, taskFlow, graphTrack, perf);
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    return null;  // Retourne null si une erreur se produit
  }
}
