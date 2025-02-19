// eslint-disable-next-line no-unused-vars
import React from 'react'
import loadUserData from "../Loader/loadUser";
import Slidebar from "../components/Slidebar/Slidebar"
import UserGretting from '../components/UserGretting/UserGretting';
import GraphTracking from '../components/GraphTracking/GraphTracking';
import StatGraph from '../components/StatGraph/StatGraph'
import PerformanceRadar from '../components/PerformanceRadar/PerformanceRadar'
import ProfileDetails from '../components/ProfileDetails/ProfileDetails'

export default function Dashboard () {
  const { infosGen, taskFlow,graphTrack,perf,result } = loadUserData ();

  return (
    <>
    <Slidebar />
    <div className="frontView">
      <UserGretting infoGen={infosGen} />
      <h2>Félicitations ! Vous avez explosé vos objectifs hier 👏</h2>
      <div className="frontView__Dashboard">
      <div className="frontView__Dashboard--front">
        <StatGraph tasksFlow={taskFlow} />
        <div className='shapes'>
          <GraphTracking graphsTrack={graphTrack} />
          <PerformanceRadar perfRadar={perf} />
          <ProfileDetails results={result} />
        </div>
    </div>
    </div>
    </div>
    </>
  )
}
