// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { fetchUserInfo } from "/src/Api/userApi.js";
import './ProfileDetails.scss'; 
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const ProfileDetails = ({ results }) => {
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

  function StyledTag({ payload }) {
    const todayScore = payload?.[0]?.payload?.uv ?? 0;  // Vérifie et prend la valeur 0 si pas de donnée
  
    return (
      <div className="dailyPerformance">
        <p className="percentage"><strong>{todayScore}%</strong></p> 
        <p><span className="subtext">de votre</span></p> 
        <p><span className="subtext">objectif</span></p> 
      </div>
    );
  }
  
  return (
        <div className="score-chart">
          <div className='score-label'>Score</div>
          {userData && (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius={80}
              outerRadius={105}
              startAngle={90}
              endAngle={1200}
              data={results}
            >
              <RadialBar dataKey="uv" cornerRadius={100} />
              <Legend content={<StyledTag />} />
            </RadialBarChart>
          </ResponsiveContainer>
          )}
        </div>
  );
}

export default ProfileDetails;
