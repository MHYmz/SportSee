// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { fetchUserInfo } from "/src/Api/userApi.js";
import './ProfileDetails.scss'; 
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import UserGreeting from './UserGreeting'; 

const ProfileDetails = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchUserInfo(12); 
        setUserData(response);
      } catch (error) {
        setError('Erreur lors de la récupération des informations');
        console.error("Erreur :", error);
      }
    }
    fetchData();
  }, []);  

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const chartData = userData ? [
    {
      uv: userData.score * 100,
      fill: 'rgb(255, 0, 0)', 
    },
    {
      uv: 100, 
      fill: 'rgb(251, 251, 251)',
    },
  ] : [];

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
      {/* Utilisation du composant UserGreeting pour afficher le message de bienvenue */}
      <UserGreeting userData={userData} />

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
