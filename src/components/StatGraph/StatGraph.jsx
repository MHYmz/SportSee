// eslint-disable-next-line no-unused-vars
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import "./StatGraph.scss";

export default function StatGraph({ tasksFlow = []}) {
  if (!Array.isArray(tasksFlow) || tasksFlow.length === 0) {
    return <p>Aucune donnée disponible</p>;
  }
  
  
  const data = [];
  for (let idx = 0; idx < tasksFlow.length; idx++) {
    const elt = tasksFlow[idx];
    data.push({
      ...elt,
      dayIndex: idx + 1
    });
  }
    
  const commonBarProps = {
    barSize: 7,
    barGap: 4,
    barCategoryGap: 3,
  };

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip-activity">
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} {...commonBarProps}>
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ marginTop: "-20px", transform:"translateX(-50px)"}} />
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
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <YAxis yAxisId="right" hide />
          <Tooltip content={renderTooltip} />
          <Bar name="Poids (kg)" dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} yAxisId="left" {...commonBarProps} />
          <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} yAxisId="right" {...commonBarProps} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
