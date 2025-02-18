// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchUserPerformance } from "/src/Api/userApi.js";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./PerformanceRadar.scss"

const PerformanceRadar = ({ perfRadar }) => {
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserPerformance(18);
        setUserPerformance({
          kinds: result.data.kind,
          data: result.data.data,
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchData();
  }, []);


  const performanceData = perfRadar || userPerformance;
  if (!performanceData) {
    return null;
  }

  const radarData = userPerformance.data.map((elt) => ({
    ...elt,
    kind: userPerformance.kinds[elt.kind],
  }));

  return (
    <div className="PerformanceRadar">
      <RadarChart width={275} height={263} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="kind" stroke="#FFFFFF" className="col w-25" />
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

export default PerformanceRadar;
