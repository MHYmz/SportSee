import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadUser from '../../Loader/loadUser';
import Slidebar from '../../components/Slidebar/Slidebar';
import UserGretting from '../../components/UserGretting/UserGretting';
import GraphTracking from '../../components/GraphTracking/GraphTracking';
import StatGraph from '../../components/StatGraph/StatGraph';
import PerformanceRadar from '../../components/PerformanceRadar/PerformanceRadar';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import NutrientCards from '../../components/NutrientCards/NutrientCards';
import UserStats from '../../utils/UserStats';

import "./Dashboard.scss"

export default function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) {
                console.error("L'ID utilisateur est introuvable dans l'URL !");
                return;
            }
            try {
                const data = await loadUser({ params: { id } });
                console.log("Données reçues de loadUser:", data); 
                setUserData(data);
            } catch (e) {
                console.error("Erreur lors du chargement des données utilisateur :", e);
            }
        }

        fetchData();
    }, [id]);

    if (!userData) return <p>Chargement des données...</p>;


    const userStats = new UserStats(userData.infosGen, userData.taskFlow, userData.graphTrack, userData.perf);
    
    console.log("UserStats dans Dashboard :", userStats.score); 
    console.log(userData.perf)

    return (
        <>
            <Slidebar />
            <div className="frontView">
                <UserGretting infoGen={userStats.infosGen} />
                <div className="frontView__Dashboard">
                    <div className="frontView__Dashboard--front">
                        <StatGraph tasksFlow={userStats.taskFlow} />
                        <div className="shapes">
                            <GraphTracking graphsTrack={userStats.graphTrack} />
                            <PerformanceRadar perfRadar={userData.perf} />
                            <ProfileDetails results={userStats.score} />
                        </div>
                    </div>
                    <div className="frontView__Dashboard--Aside">
                        <NutrientCards infoGen={userStats.infosGen} />
                    </div>
                </div>
            </div>
        </>
    );
}
