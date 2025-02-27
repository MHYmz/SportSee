// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./GraphTracking.scss";

const GraphTracking = ({ graphsTrack }) => {
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];


  const chartWidth = 258;
  const chartHeight = 263;


  const chartMargin = { top: 10, right: 0, left: 5, bottom: 10 };

  // Fonction pour gérer l'affichage du tooltip
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sessionLength = payload[0].value;
      return (
        <div className="custom-tooltip">
          <p>{`${sessionLength} min`}</p>
        </div>
      );
    }
    return null;
  };

  // Fonction pour gérer le mouvement de la souris et l'arrière-plan dynamique
  const handleMouseMove = (e) => {
    const chartContainer = document.querySelector(".lineChartWrapper");
    if (e.isTooltipActive) {
      const mouseXPercentage = Math.round((e.activeCoordinate.x / chartContainer.clientWidth) * 100);
      chartContainer.style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${mouseXPercentage}%, rgba(230, 0, 0, 1) ${mouseXPercentage}%, rgba(230, 0, 0, 1) 100%)`;
    }
  };

  return (
    <div className="graphTracking">
      <h3>Durée moyenne des <br />sessions</h3>
      <ResponsiveContainer width={chartWidth} height={chartHeight} className="lineChartWrapper">
        <LineChart
          data={graphsTrack}
          margin={chartMargin}
          width={chartWidth}
          height={chartHeight}
          onMouseMove={handleMouseMove}
        >
          <XAxis
            dataKey="day"
            stroke="#FFFFFF"
            opacity={0.5}
            tickLine={false}
            axisLine={false}
            tickFormatter={(tick) => daysOfWeek[tick -1]}
          />
          <YAxis
            padding={{ top: 70, bottom: 25 }}
            stroke="#FFFFFF"
            opacity={0.5}
            tickLine={false}
            axisLine={false}
            hide
          />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            dot={false}
            strokeWidth={2}
            legendType="none"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphTracking;