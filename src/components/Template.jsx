// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar/Navbar";

function Template() {
  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
        </div>
  )
}

export default Template