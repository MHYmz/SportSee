// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ProfileDetails.scss'; 
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

export default function ProfileDetails({ results }) {
    console.log("Données reçues dans ProfileDetails:", results);

    const StyledTag = ({ payload }) => {
        const todayScore = payload?.[0]?.payload?.todayScore ?? 0; 
        console.log("todayScore dans StyledTag:", todayScore); 
        return (
            <div className="dailyPerformance">
                <p className="percentage"><strong>{todayScore}%</strong></p> 
                <p><span className="subtext">de votre</span></p> 
                <p><span className="subtext">objectif</span></p> 
            </div>
        );
    };

    if (!results || results.length === 0) {
        return <div>Loading...</div>; 
    }

    const innerRadius = 80;
    const outerRadius = 105;
    const startAngle = 90;
    const endAngle = 90 + (360 * (results[0]?.todayScore / 100));



    return (
        <div className="score-chart">
            <div className="score-label">Score</div>
            <ResponsiveContainer width="100%" height={273}>
                <RadialBarChart
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    data={results}
                >
                    
                    <RadialBar 
                        dataKey="todayScore" 
                        fill="#ff0000" 
                        cornerRadius={50} 
                    />

                    <Legend content={<StyledTag />} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
}