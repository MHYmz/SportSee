// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Slidebar from './components/Slidebar/Slidebar'
import PerformanceRadar from './components/PerformanceRadar/PerformanceRadar'
import ProfileDetails from './components/ProfileDetails/ProfileDetails'

function App() {
  return (
    <div>
      <Navbar />
      <Slidebar />
      <PerformanceRadar />
      <ProfileDetails />
    </div>
  )
}

export default App