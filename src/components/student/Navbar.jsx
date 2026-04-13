import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ExternalLinkIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const {
    navigate,
    isEducator,
    backendUrl,
    setIsEducator,
    getToken,
  } = useContext(AppContext);

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const allowedEducatorEmail = "shahariarshawon.dev@gmail.com";
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const canShowEducatorBtn = userEmail === allowedEducatorEmail;

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();

      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md ${
        isCourseListPage ? "bg-white/90" : "bg-cyan-50/80"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-3">

        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
          alt="Logo"
          className="w-36 lg:w-48 cursor-pointer transition-transform hover:scale-105"
        />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-gray-600">

          {user && (
            <div className="flex items-center gap-4">
              {canShowEducatorBtn && (
                <button
                  onClick={becomeEducator}
                  className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
                </button>
              )}

              <Link
                to="/my-enrollments"
                className="hover:text-black transition font-medium"
              >
                My Enrollments
              </Link>
            </div>
          )}

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Go Projects"
                  labelIcon={<ExternalLinkIcon size={16} />}
                  onClick={() =>
                    window.open("https://go-projects-gps.vercel.app", "_blank")
                  }
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
			<>
			<button
              onClick={() => openSignIn()}
              className="bg-white text-violet-600 hover:bg-violet-800 hover:text-white px-5 py-2 rounded-full transition border-violet-400 border"
            >
              Login
            </button>
			<button
              onClick={() => openSignIn()}
              className="bg-violet-600  hover:bg-violet-800 text-white px-5 py-2 rounded-full transition"
            >
              Sign Up
            </button>
			
			
			
			</>
            
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3 text-gray-600">

          {user && (
            <div className="flex items-center gap-2 text-xs">
              {canShowEducatorBtn && (
                <button
                  onClick={becomeEducator}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs"
                >
                  {isEducator ? "Dashboard" : "Educator"}
                </button>
              )}

              <Link to="/my-enrollments" className="underline">
                Enrollments
              </Link>
            </div>
          )}

          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="user" className="w-6 h-6" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;