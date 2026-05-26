import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Courses", path: "/educator/my-courses", icon: assets.my_course_icon },
    { name: "Students", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
    { name: "Make Quiz", path: "/educator/quizzes", icon: assets.person_tick_icon },
    { name: "Manage Courses", path: "/educator/manage-courses", icon: assets.person_tick_icon },
  ];

  if (!isEducator) return null;

  return (
    <aside
      className={`relative min-h-screen shrink-0 border-r border-[#7F265B]/10 bg-white/90 backdrop-blur-xl transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute -right-3 top-6 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#7F265B]/15 bg-white text-[#7F265B] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#7F265B] hover:text-white"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="overflow-hidden px-3 py-5">
        {/* Header */}
        <div
          className={`mb-6 transition-all duration-300 ${
            collapsed ? "opacity-0 invisible h-0" : "opacity-100 visible h-auto"
          }`}
        >
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7F265B]/70">
            Educator Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                `group relative flex items-center rounded-2xl transition-all duration-300 overflow-hidden ${
                  collapsed
                    ? "justify-center px-2 py-3"
                    : "justify-start px-4 py-3"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#7F265B]/12 to-[#7F265B]/5 text-[#7F265B] shadow-[0_12px_30px_rgba(127,38,91,0.12)]"
                    : "text-slate-600 hover:bg-[#7F265B]/5 hover:text-[#7F265B]"
                }`
              }
            >
              {/* Active bar */}
              <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#7F265B]" />

              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="h-5 w-5 opacity-80 transition-all duration-300 group-hover:opacity-100"
                />
              </div>

              {/* Label */}
              <span
                className={`ml-3 whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  collapsed
                    ? "w-0 opacity-0 translate-x-2"
                    : "w-auto opacity-100 translate-x-0"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;