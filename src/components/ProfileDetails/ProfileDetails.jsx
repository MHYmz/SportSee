// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { fetchUserInfo } from "/src/Api/userApi.js";
import './ProfileDetails.scss'; 
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const ProfileDetails = () => {
  // État pour stocker les données utilisateur et gérer les erreurs
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Fonction pour récupérer les données de l'utilisateur
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchUserInfo(12); 
        console.log("Données utilisateur reçues :", response); // 👀 DEBUG ICI
        setUserData(response);
      } catch (error) {
        setError('Erreur lors de la récupération des informations');
        console.error("Erreur :", error);
      }
    }
    fetchData();
  }, []);  

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  // Données pour le graphique radial
  const chartData = userData ? [
    {
      uv: userData.score * 100, // Score de l'utilisateur, multiplié par 100 pour le pourcentage
      fill: 'rgb(255, 0, 0)', 
    },
    {
      uv: 100, 
      fill: 'rgb(251, 251, 251)',
    },
  ] : [];

  // Personnalisation de la légende du graphique
  function StyledTag(payload) {
    return (
      <div className="dailyPerformance">
        <p className="percentage"><strong>{payload.payload[0].payload.uv}%</strong></p> 
        <p><span className="subtext">de votre</span></p> 
        <p><span className="subtext">objectif</span></p> 
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Si userData est défini (c'est-à-dire si les données de l'utilisateur ont été récupérées) */}
      {userData ? (
        <div className="profile-content">
          <h2 className='full-name'>
            <span className="greeting">Bonjour</span> 
            <span className="first-name">{userData.userInfos.firstName}</span> 👋
          </h2>
          <div className="Congratulations">
            <h3>Félicitation ! Vous avez explosé vos objectifs hier 👏 </h3>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <p>Chargement des données...</p>
        </div>
      )}

      {/* Affichage du graphique en bas à droite */}
      {userData && (
        <div className="score-chart">
          <div className='score-label'>Score</div>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius={80}
              outerRadius={105}
              startAngle={90}
              endAngle={1200}
              data={chartData}
            >
              <RadialBar dataKey="uv" cornerRadius={100} />
              <Legend content={<StyledTag />} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
