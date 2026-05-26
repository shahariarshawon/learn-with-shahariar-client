import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  LinkedinLogo,
  GithubLogo,
  WhatsappLogo,
} from "phosphor-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577638139845",
    icon: FacebookLogo,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shahariar-dev",
    icon: LinkedinLogo,
  },
  {
    name: "GitHub",
    href: "https://github.com/shahariarshawon",
    icon: GithubLogo,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/+8801518935876",
    icon: WhatsappLogo,
  },
];

const SocialIcons = () => {
  return (
    <div className="mt-5 flex items-center gap-3 max-md:mt-4">
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          to={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/50 hover:bg-[#7F265B]/12 hover:text-white hover:shadow-[0_10px_25px_rgba(127,38,91,0.28)] active:translate-y-0"
        >
          <Icon
            size={22}
            weight="fill"
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#7F265B] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
            {name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;