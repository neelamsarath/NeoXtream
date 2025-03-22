import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-mobile";
import { floatAnimation } from "@/lib/motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "TV Shows", path: "/tv-shows" },
  { label: "My List", path: "/my-list" },
];

const Topbar = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-40 glassmorphic border-b border-neo-violet/20">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Center Navigation */}
        {isDesktop && (
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.a
                  className={`font-medium transition-colors ${
                    isActive(item.path) ? "text-neo-violet" : "text-white/70 hover:text-neo-violet"
                  }`}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={floatAnimation}
                >
                  {item.label}
                </motion.a>
              </Link>
            ))}
          </div>
        )}
        
        {/* Right Side - Search and User */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neo-dark/60 border border-neo-violet/30 text-white rounded-full py-2 px-4 pl-10 w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-neo-violet/50 transition-all duration-300 placeholder-white/50"
            />
            <i className="bx bx-search absolute left-3 top-2.5 text-white/50 group-hover:text-neo-violet transition-colors"></i>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <motion.button 
              className="text-white/70 hover:text-white flex items-center justify-center h-10 w-10 rounded-full hover:bg-neo-violet/20 transition-colors"
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={floatAnimation}
            >
              <i className="bx bxs-bell text-2xl"></i>
            </motion.button>
            <div className="absolute top-3 right-2 h-2 w-2 bg-neo-purple rounded-full"></div>
          </div>
          
          {/* User profile */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={floatAnimation}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neo-violet to-neo-purple flex items-center justify-center cursor-pointer neo-shadow hover:neo-shadow-hover">
              <i className="bx bxs-user text-white"></i>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
