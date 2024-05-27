import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
function Rootlayout() {
  return (
    <div className='m-0'>
      <div className='m-0'>
        <div>
        <Navbar/>
        </div>
     
      <Outlet />
      </div>
     
    </div>
  )
}

export default Rootlayout