import { useEffect, useState } from "react";
import { fetchSessionTrends } from "/src/Api/userApi.js";
import {LineChart, CartesianGrid,XAxis,YAxis,Tooltip, Legend,Line,} from "recharts";
import "./StatGraph.scss"

export default function SessionTrendsChart() {
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    fetchSessionTrends(18).then((response) => {
      setSessionData(response.data.sessions);
    });
  }, []);

  return (
    <div className="chart-container">
      <LineChart width={702} height={145}  data={sessionData} margin={{ top: 10, right: 25, left: 15, bottom: 10 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sessionLength" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
