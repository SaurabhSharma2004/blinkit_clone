import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/UserMenu'

const Dashboard = () => {
  return (
    <section className=''>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-3'>
            
            {/* left of menu */}

            <div className='py-3 sticky top-24 overflow-y-auto hidden lg:block'>
                <UserMenu />
            </div>


            {/* right for content */}
            <div className='bg-red-400'>
                <Outlet />
            </div>

        </div>
    </section>
  )
}

export default Dashboard