import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {
  return (
    <section className='w-full h-screen'>

      <button className='absolute right-5 top-50 text-neutral-800' onClick={() => window.history.back()}>
        <IoClose size={25} />
      </button>

      <div className='conatiner mx-auto p-3'>
          <UserMenu />
      </div>

    </section>
  )
}

export default UserMenuMobile