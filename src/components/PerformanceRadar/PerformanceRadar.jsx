// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./PerformanceRadar.scss"

  export default function PerformanceRadar ({perfRadar}) {

    if (!perfRadar || !perfRadar.data) {
      return <div>Chargement des Données</div>; // Affiche un message de chargement ou un fallback
    }

 // Transformation des données avant de les passer au graphique
 const formattedData = perfRadar.data.map((item) => ({
  ...item,
  kindLabel: perfRadar.categories && perfRadar.categories[item.kind], // Associer la catégorie à partir de kind
}));

const chartWidth = 275;
const chartHeight = 263;


  return (
    <div className="PerformanceRadar">
      <RadarChart width={chartWidth} height={chartHeight} data={formattedData} >
        <PolarGrid />
        <PolarAngleAxis dataKey="kindLabel" stroke="#FFFFFF" tick={{ fontSize:9}} />
        <PolarRadiusAxis angle={30} domain={[0, 200]} tick={false}/>
        <Radar
          dataKey="value"
          stroke="#FF0101"
          fill="#FF0101"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>
  );
};