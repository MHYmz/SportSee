// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "/src/Api/userApi.js";
import "./UserGretting.scss"

// Fonction fléchée pour UserGreeting
const UserGreeting = ({ infoGen }) => {
  const [userData, setUserData] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserInfo(userId);
      setUserData(data);
    };

    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="profile-content">
      <h2 className="full-name">
        <span className="greeting">Bonjour</span>
        <span className="first-name">{infoGen.userInfos.firstName}</span> 👋
      </h2>
      <div className="Congratulations">
        <h3>Félicitation ! Vous avez explosé vos objectifs hier 👏</h3>
      </div>
    </div>
  );
}

// Exportation après la déclaration
export default UserGreeting;
