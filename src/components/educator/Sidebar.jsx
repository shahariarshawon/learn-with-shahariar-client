import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Courses", path: "/educator/my-courses", icon: assets.my_course_icon },
    { name: "Students", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
    { name: "Make Quiz", path: "/educator/quizzes", icon: assets.person_tick_icon },
    { name: "Manage Courses", path: "/educator/my-courses", icon: assets.person_tick_icon },
  ];

  return (
    isEducator && (
      <aside className="md:w-64 w-16 min-h-screen border-r border-gray-200 bg-white flex flex-col py-4 transition-all duration-300">

        {/* Menu */}
        <nav className="flex flex-col gap-2 mt-2">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                `group flex items-center md:flex-row flex-col md:justify-start justify-center gap-3 py-3 md:px-6 rounded-lg mx-2 transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {/* Icon */}
              <img
                src={item.icon}
                alt=""
                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition"
              />

              {/* Label */}
              <span className="md:block hidden text-sm">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    )
  );
};

export default Sidebar;