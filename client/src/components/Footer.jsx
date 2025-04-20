import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© 2023 Your Company. All rights reserved.</p>

        <div className='flex gap-4 items-center jsutify-center text-2xl'>
          <a href="" className='hover:text-blue-500 transition-colors duration-300'>
            <FaFacebook />
          </a>
          <a href='' className='hover:text-blue-500 transition-colors duration-300'>
            <FaInstagram />
          </a>
          <a href='' className='hover:text-blue-500 transition-colors duration-300'>
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer