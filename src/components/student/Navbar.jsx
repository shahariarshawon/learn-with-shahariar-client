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
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        isCourseListPage
          ? "bg-white/95 border-[#7F265B]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-white/85 border-[#7F265B]/10 shadow-[0_4px_20px_rgba(127,38,91,0.06)]"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
            alt="Logo"
            className="w-32 cursor-pointer object-contain transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.04] sm:w-36 lg:w-44"
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-700">
          {user && (
            <div className="flex items-center gap-4 lg:gap-5">
              {canShowEducatorBtn && (
                <button
                  onClick={becomeEducator}
                  className="rounded-full border border-[#7F265B] bg-[#7F265B] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)] active:translate-y-0"
                >
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
                </button>
              )}

              <Link
                to="/my-enrollments"
                className="group relative font-medium text-slate-700 transition duration-300 hover:text-[#7F265B]"
              >
                My Enrollments
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#7F265B] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          )}

          {user ? (
            <div className="flex items-center transition-transform duration-300 hover:-translate-y-0.5">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-[#7F265B]/15 transition duration-300 hover:ring-[#7F265B]/30",
                  },
                }}
              >
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
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openSignIn()}
                className="rounded-full border border-[#7F265B]/20 bg-white px-5 py-2 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7F265B] hover:bg-[#7F265B]/5 hover:shadow-sm active:translate-y-0"
              >
                Login
              </button>

              <button
                onClick={() => openSignIn()}
                className="rounded-full bg-[#7F265B] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)] active:translate-y-0"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              {canShowEducatorBtn && (
                <button
                  onClick={becomeEducator}
                  className="rounded-full bg-[#7F265B] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f]"
                >
                  {isEducator ? "Dashboard" : "Educator"}
                </button>
              )}

              <Link
                to="/my-enrollments"
                className="text-xs font-medium text-slate-700 transition duration-300 hover:text-[#7F265B]"
              >
                Enrollments
              </Link>
            </div>
          )}

          {user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-[#7F265B]/15 transition duration-300 hover:scale-105 hover:ring-[#7F265B]/30",
                },
              }}
            />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7F265B]/20 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#7F265B] hover:bg-[#7F265B]/5"
            >
              <img src={assets.user_icon} alt="user" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;