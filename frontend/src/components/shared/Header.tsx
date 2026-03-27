import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NepaliDate from 'nepali-date';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nepalSamvat, setNepalSamvat] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, []);

  // Calculate Nepal Samvat date using nepali-date library
  useEffect(() => {
    const calculateNepalSamvat = () => {
      try {
        const nepaliDate = new NepaliDate(currentTime);
        const year = nepaliDate.getYear();
        const month = nepaliDate.getMonth();
        const day = nepaliDate.getDate();

        const nepaliMonths = [
          "BAISAKH", "JESTHA", "ASAR", "SHRAWAN", "BHADRAPAD", "ASHWIN",
          "KARTIK", "MANGSIR", "POUSH", "MAGH", "FALGUN", "CHAITRA"
        ];

        return `${year} ${nepaliMonths[month]} ${day}`;
      } catch (error) {
        console.error('Error calculating Nepal Samvat:', error);
        return "2081 BAISAKH 1"; // Fallback
      }
    };

    setNepalSamvat(calculateNepalSamvat());
  }, [currentTime]);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="bg-[#1E4A8A] text-white w-full h-20 md:h-24 bg-[url('https://giwmscdn.prixacdn.net/media/albums/topbg_CUCDohGKGe.png')] bg-cover bg-center relative">
      <div className="container mx-auto px-2 md:px-4 h-full flex items-center justify-between">
        {/* Left: Logo + Text */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <NavLink to="/" className="flex-shrink-0">
            <img
              src="https://giwmscdnone.gov.np/static/assets/image/Emblem_of_Nepal.png"
              alt="Nepal Emblem"
              className="w-16 h-14 md:w-24 md:h-20 cursor-pointer"
            />
          </NavLink>
          <div className="leading-tight min-w-0">
            <h1 className="text-xs md:text-sm font-medium truncate">Government of Nepal</h1>
            <h2 className="text-sm md:text-lg font-bold truncate">Ministry of Finance</h2>
            <p className="text-xs md:text-sm truncate">Singhadurbar, Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Right: Date + Flag */}
        <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
          <img
            src="https://giwmscdnone.gov.np/static/grapejs/img/Nepal-flag.gif"
            alt="Nepal Flag"
            className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0"
          />
          <div className="text-right leading-tight min-w-0">
            <p className="truncate">
              A.D.: <span className="font-bold">{formattedDate} at {formattedTime}</span>
            </p>
            <p className="truncate">
              Nepal Samvat: <span className="font-bold">{nepalSamvat}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
