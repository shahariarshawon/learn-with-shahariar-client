import logo from "./logo.svg";
import logo_dark from "./logo_dark.svg";
import search_icon from "./search_icon.svg";
import cross_icon from "./cross_icon.svg";
import upload_area from "./upload_area.svg";
import sketch from "./sktech.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.svg";
import adobe_logo from "./adobe_logo.svg";
import paypal_logo from "./paypal_logo.svg";
import course_1_thumbnail from "./course_1.png";
import course_2_thumbnail from "./course_2.png";
import course_3_thumbnail from "./course_3.png";
import course_4_thumbnail from "./course_4.png";
import star from "./rating_star.svg";
import star_blank from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import arrow_icon from "./arrow_icon.svg";
import down_arrow_icon from "./down_arrow_icon.svg";
import time_left_clock_icon from "./time_left_clock_icon.svg";
import time_clock_icon from "./time_clock_icon.svg";
import user_icon from "./user_icon.svg";
import home_icon from "./home_icon.svg";
import add_icon from "./add_icon.svg";
import my_course_icon from "./my_course_icon.svg";
import person_tick_icon from "./person_tick_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import file_upload_icon from "./file_upload_icon.svg";
import appointments_icon from "./appointments_icon.svg";
import earning_icon from "./earning_icon.svg";
import dropdown_icon from "./dropdown_icon.svg";
import patients_icon from "./patients_icon.svg";
import play_icon from "./play_icon.svg";
import blue_tick_icon from "./blue_tick_icon.svg";
import course_4 from "./course_4.png";
import profile_img from "./profile_img.png";
import profile_img2 from "./profile_img2.png";
import profile_img3 from "./profile_img3.png";
import lesson_icon from "./lesson_icon.svg";
import abhishek from "./abhishek.JPG";
import shreyansh from "./shreyansh.JPG";

const getAssetSrc = (asset: unknown): string => {
  if (typeof asset === "string") return asset;
  if (asset && typeof asset === "object" && "src" in asset) return (asset as { src: string }).src;
  return String(asset || "");
};

export const assets: Record<string, string> = {
  abhishek: getAssetSrc(abhishek),
  shreyansh: getAssetSrc(shreyansh),
  logo: getAssetSrc(logo),
  search_icon: getAssetSrc(search_icon),
  sketch: getAssetSrc(sketch),
  microsoft_logo: getAssetSrc(microsoft_logo),
  walmart_logo: getAssetSrc(walmart_logo),
  accenture_logo: getAssetSrc(accenture_logo),
  adobe_logo: getAssetSrc(adobe_logo),
  paypal_logo: getAssetSrc(paypal_logo),
  course_1_thumbnail: getAssetSrc(course_1_thumbnail),
  course_2_thumbnail: getAssetSrc(course_2_thumbnail),
  course_3_thumbnail: getAssetSrc(course_3_thumbnail),
  course_4_thumbnail: getAssetSrc(course_4_thumbnail),
  star: getAssetSrc(star),
  star_blank: getAssetSrc(star_blank),
  profile_img_1: getAssetSrc(profile_img_1),
  profile_img_2: getAssetSrc(profile_img_2),
  profile_img_3: getAssetSrc(profile_img_3),
  arrow_icon: getAssetSrc(arrow_icon),
  dropdown_icon: getAssetSrc(dropdown_icon),
  cross_icon: getAssetSrc(cross_icon),
  upload_area: getAssetSrc(upload_area),
  logo_dark: getAssetSrc(logo_dark),
  down_arrow_icon: getAssetSrc(down_arrow_icon),
  time_left_clock_icon: getAssetSrc(time_left_clock_icon),
  time_clock_icon: getAssetSrc(time_clock_icon),
  user_icon: getAssetSrc(user_icon),
  home_icon: getAssetSrc(home_icon),
  add_icon: getAssetSrc(add_icon),
  my_course_icon: getAssetSrc(my_course_icon),
  person_tick_icon: getAssetSrc(person_tick_icon),
  facebook_icon: getAssetSrc(facebook_icon),
  instagram_icon: getAssetSrc(instagram_icon),
  twitter_icon: getAssetSrc(twitter_icon),
  course_4: getAssetSrc(course_4),
  file_upload_icon: getAssetSrc(file_upload_icon),
  appointments_icon: getAssetSrc(appointments_icon),
  earning_icon: getAssetSrc(earning_icon),
  patients_icon: getAssetSrc(patients_icon),
  profile_img: getAssetSrc(profile_img),
  profile_img2: getAssetSrc(profile_img2),
  profile_img3: getAssetSrc(profile_img3),
  play_icon: getAssetSrc(play_icon),
  blue_tick_icon: getAssetSrc(blue_tick_icon),
  lesson_icon: getAssetSrc(lesson_icon),
};

export { dummyEducatorData, dummyTestimonials as dummyTestimonial, dummyDashboardData, dummyCourses } from "@/constants/dummy-data";
