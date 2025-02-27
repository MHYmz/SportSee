// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import Slidebar from "../Slidebar/Slidebar"

function Template() {
  return (
        <>
        <Navbar />
        <Slidebar />
        <main>
            <Outlet />
        </main>
        </>
  )
}

export default Template