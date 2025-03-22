import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { floatAnimation } from "@/lib/motion";

const navItems = [
  { icon: "bxs-home", label: "Home", path: "/" },
  { icon: "bxs-movie-play", label: "Movies", path: "/movies" },
  { icon: "bxs-tv", label: "TV Shows", path: "/tv-shows" },
  { icon: "bxs-heart", label: "My List", path: "/my-list" },
  { icon: "bxs-hot", label: "Trending", path: "/trending" },
  { icon: "bxs-videos", label: "Live TV", path: "/live-tv" },
  { icon: "bxs-category", label: "Categories", path: "/categories" },
];

const bottomItems = [
  { icon: "bxs-cog", label: "Settings", path: "/settings" },
  { icon: "bxs-user-circle", label: "Profile", path: "/profile" },
];

const Sidebar = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className="fixed h-full w-20 lg:w-64 glassmorphic z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-neo-violet/20">
      {/* Logo */}
      <div className="py-8 px-4 flex flex-col justify-center items-center">
        <Link href="/">
          <a className="flex flex-col items-center">
            <motion.div 
              className="relative mb-3 w-14 h-14 flex items-center justify-center"
              animate={{ 
                rotate: [0, 3, 0, -3, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Custom NX Logo */}
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Stylized N */}
                <div className="absolute text-neo-violet text-3xl font-bold -mt-1" 
                  style={{ left: '3px', transform: 'skewX(-10deg)', textShadow: '0 0 8px rgba(157, 78, 221, 0.8)' }}>N</div>
                
                {/* Stylized X */}
                <div className="absolute text-neo-purple text-3xl font-bold -mt-1" 
                  style={{ right: '3px', transform: 'skewX(10deg)', textShadow: '0 0 8px rgba(216, 67, 227, 0.8)' }}>X</div>
                
                {/* Connecting slash */}
                <div className="absolute h-[3px] w-10 bg-gradient-to-r from-neo-violet via-white to-neo-purple transform rotate-45 z-20"></div>
                
                {/* Inner circle */}
                <div className="absolute w-10 h-10 rounded-full border border-neo-violet/30 z-10"></div>
                
                {/* Tech circuit lines */}
                <div className="absolute w-full h-full">
                  <div className="absolute top-1 left-4 w-1 h-1 bg-neo-violet rounded-full"></div>
                  <div className="absolute bottom-1 right-4 w-1 h-1 bg-neo-purple rounded-full"></div>
                  <div className="absolute top-2 right-2 w-4 h-[1px] bg-neo-violet/50 transform rotate-45"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-[1px] bg-neo-purple/50 transform rotate-45"></div>
                </div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 blur-lg bg-neo-purple opacity-20 rounded-full z-0 neo-shadow animate-pulse-slow"></div>
                
                {/* Outer ring with gradient */}
                <div className="absolute inset-0 rounded-full z-10 border-2 border-transparent bg-clip-border"
                  style={{ 
                    background: 'linear-gradient(to right, transparent, transparent), linear-gradient(to right, rgba(139, 92, 246, 0.7), rgba(216, 67, 227, 0.7))', 
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box'
                  }}></div>
              </div>
            </motion.div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-neo-violet to-neo-purple font-[Outfit] font-bold text-lg hidden lg:block tracking-wider" style={{ textShadow: '0 0 5px rgba(139, 92, 246, 0.5)' }}>NEOXSTREAM</div>
          </a>
        </Link>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 py-8">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <motion.a
                  className={`flex items-center nav-icon rounded-xl px-4 py-3 ${
                    isActive(item.path)
                      ? "text-white bg-neo-violet/20"
                      : "text-white/70 hover:bg-neo-violet/10"
                  } group transition-all duration-300`}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={floatAnimation}
                >
                  <i
                    className={`bx ${item.icon} text-2xl lg:mr-3 ${
                      isActive(item.path)
                        ? "text-neo-violet"
                        : "group-hover:text-neo-violet"
                    }`}
                  ></i>
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </motion.a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bottom section */}
      <div className="p-4">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <motion.a
                  className={`flex items-center nav-icon rounded-xl px-4 py-3 ${
                    isActive(item.path)
                      ? "text-white bg-neo-violet/20"
                      : "text-white/70 hover:bg-neo-violet/10"
                  } group transition-all duration-300`}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={floatAnimation}
                >
                  <i
                    className={`bx ${item.icon} text-2xl lg:mr-3 ${
                      isActive(item.path)
                        ? "text-neo-violet"
                        : "group-hover:text-neo-violet"
                    }`}
                  ></i>
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </motion.a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
