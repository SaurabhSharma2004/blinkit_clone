import React from 'react'
import logo from "../assets/logo.png";
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";

const Header = () => {

  const isMobile = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchPage = location.pathname === '/search'

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 z-40">
      {!(isMobile && isSearchPage) && (
        <div className="h-full flex justify-between items-center px-4 container mx-auto">
          {/* logo */}
          <Link to={"/"} className="h-full flex items-center justify-center">
            <img
              src={logo}
              alt="logo"
              width={170}
              height={60}
              className="hidden lg:block"
            />
            <img
              src={logo}
              alt="logo"
              width={120}
              height={60}
              className="block lg:hidden"
            />
          </Link>

          {/* search */}

          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and cart */}

          <div className="flex items-center gap-4">
            {/* mobile version */}
            <div className="lg:hidden">
              <button className="p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                <FaRegUserCircle size={26} />
              </button>
            </div>

            {/* desktop version */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 text-lg font-medium px-3 py-1 rounded-lg transition-colors"
              >
                Login
              </button>

              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all">
                <div className='animate-bounce'>
                  <BsCart4 size={26} />
                </div>

                <div >
                  My Cart
                </div>

              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>
    </header>
  );
}

export default Header