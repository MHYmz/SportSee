// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./Navbar/Navbar";

function Template() {
  return (
        <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        </>
  )
}

export default Template