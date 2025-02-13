// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchUserActivity } from "/src/Api/userApi.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./StatGraph.scss";

const StatGraph = () => {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchUserActivity(18);
        const formattedData = response.data.sessions.map((session, index) => ({
          ...session,
          dayIndex: index + 1,
        }));
        setActivityData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données d'activité :", error);
      }
    };

    loadData();
  }, []);

  if (!activityData) {
    return null;
  }

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value} kg`}</p>
          <p>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="stat-graph">
      <h3>Activité quotidienne</h3>
      <ResponsiveContainer width={870} height={300}>
        <BarChart data={activityData} barGap={4} barCategoryGap={3}>
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ marginTop: "-20px" }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dayIndex"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC" }}
            domain={[1, 9]}
            allowDecimals={false}
            tickFormatter={(tick) => tick} 
            />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            orientation="right"
            tick={{ fill: "#9B9EAC" }}
            domain={['dataMin', 'dataMax']} 
            />
          <YAxis yAxisId="right" hide />
          <Tooltip content={renderTooltip} />
          <Bar name="Poids (kg)" dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} yAxisId="left" />
          <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatGraph;