// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchUserActivity } from "/src/Api/userApi.js";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import "./GraphTracking.scss";

const GraphTracking = () => {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const getActivityData = async () => {
      try {
        const data = await fetchUserActivity(18);
        console.log(data.data.sessions)
        setActivityData(data.data.sessions); 
      } catch (error) {
        console.error("Erreur lors de la récupération des données d'activité :", error);
      }
    };

    getActivityData(); 
  }, []);

  if (!activityData) {
    return <div>Chargement...</div>; 
  }

  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];


  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="graphTracking">
      <h3>Durée moyenne des <br/>sessions</h3>
      <ResponsiveContainer width={258} height={263} className="lineChartWrapper">
        <LineChart
          data={activityData} 
          margin={{ top: 10, right: 0, left: 5, bottom: 10 }}
          width={258}
          height={263}
          onMouseMove={(e) => {
            const chartContainer = document.getElementsByClassName("lineChartWrapper")[0];
            if (e.isTooltipActive) {
              const chartWidth = chartContainer.clientWidth;
              const mouseXPercentage = Math.round((e.activeCoordinate.x / chartWidth) * 100);
              chartContainer.style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${mouseXPercentage}%, rgba(230, 0, 0, 1) ${mouseXPercentage}%, rgba(230, 0, 0, 1) 100%)`;
            }
          }}
        >
          <XAxis dataKey="day" stroke="#FFFFFF" opacity={0.5} tickLine={false} axisLine={false} tickFormatter={(tick) => daysOfWeek[tick]}/>
          <YAxis padding={{ top: 70, bottom: 25 }} stroke="#FFFFFF" opacity={0.5} tickLine={false} axisLine={false} hide />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Line type="natural" dataKey="sessionLength" stroke="#FFFFFF" dot={false} strokeWidth={2} legendType="none"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphTracking;
