import React from 'react'
import './RootLayout.css'
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function Rootlayout() {
  return (
    <div className= 'root-main m-0'>
      <div className='root-navbar'>
        <Navbar/>
      </div>
      <div className='root-out'>
        <Outlet />
      </div>
    </div>
  )
}

export default Rootlayout