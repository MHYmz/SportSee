import {
    fetchUserInfo,
    fetchUserActivity,
    fetchSessionTrends,
    fetchUserPerformance,
  } from "../Api/userApi";
  
  export default async function userLoader({ params }) {
    const { id } = params;
  
    // Récupération des données de l'utilisateur
    const generalInfo = await fetchUserInfo(id);
    
    const score = [
      {
        name: "",
        uv: 100,
        fill: "#ffffff",
      },
      {
        name: "Score",
        uv: generalInfo.score * 100,
        fill: "#ff0000",
      },
    ];
  
    const activity = (await fetchUserActivity(id)).data.sessions;
    const averageSessions = (await fetchSessionTrends(id)).data.sessions;
    
    const performanceResult = await fetchUserPerformance(id);
    const performance = {
      kinds: performanceResult.data.kind,
      data: performanceResult.data.data,
    };
  
    return {
      generalInfo,
      score,
      activity,
      averageSessions,
      performance,
    };
  }
  