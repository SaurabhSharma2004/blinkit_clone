import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/UserMenu'

const Dashboard = () => {
  return (
    <section className=''>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-3'>
            
            {/* left of menu */}

            <div className='py-3 sticky top-24 max-h-[calc(100vh - 96px)] overflow-y-auto hidden lg:block border-r'>
                <UserMenu />
            </div>


            {/* right for content */}
            <div className=''>
                <Outlet />
            </div>

        </div>
    </section>
  )
}

export default Dashboard