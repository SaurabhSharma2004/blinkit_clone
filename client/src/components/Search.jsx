import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile()

  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleChange = (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      navigate(`/search?q=${query}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="w-full h-11 lg:h-12 min-w-[300px] lg:min-w-[420px] rounded-lg flex items-center border text-neutral-500 bg-slate-50 shadow-sm focus-within:shadow-md transition-all duration-200 ease-in-out overflow-hidden">
      <div>
        {isMobile && isSearchPage ? (
          <Link to={'/'} className="flex items-center justify-center h-full p-3 group-focus-within:bg-neutral-200">
            <FaArrowLeft size={22}/>
          </Link>
        ) : (
          <button className="flex items-center justify-center h-full p-3 group-focus-within:bg-neutral-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              cursor={true}
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full ">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-full px-3 outline-none bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400"
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
