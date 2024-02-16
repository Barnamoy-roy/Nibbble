// next/font
import localFont from "next/font/local";
const telma = localFont({ src: "../app/public/fonts/Telma/Telma-Bold.woff2" });

// react icons
import { FaTwitter } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const footerLinks = [
  "For designers",
  "Hire talent",
  "Inspiration",
  "Advertising",
  "Blog",
  "About",
  "Careers",
  "Support",
];

const docLinks = [
  "Jobs",
  "Designers",
  "Freelancers",
  "Tags",
  "Places",
  "Resources",
];

const Footer = () => {
  return (
    <div className="w-full px-10 py-8">
      <div className="lg:flex hidden flex-row justify-between items-center">
        <h1 className={`${telma.className} text-3xl`}>Nibbble</h1>
        <div className="flex flex-row gap-10 ">
          {footerLinks.map((link) => {
            return (
              <h1 className="text-sm text-slate-700 font-semibold" key={link}>
                {link}
              </h1>
            );
          })}
        </div>
        <div className="flex flex-row gap-4">
          <FaTwitter className="text-lg text-slate-700" />
          <FaSquareFacebook className="text-lg text-slate-700" />
          <FaInstagram className="text-lg text-slate-700" />
          <FaPinterest className="text-lg text-slate-700" />
        </div>
      </div>
      <div className="lg:flex hidden flex-row justify-between items-center mt-10">
        <div className="flex flex-row justify-center items-center gap-4">
          <h4 className="text-sm text-slate-500 font-medium">2024 Dribbble</h4>
          <h4 className="text-sm text-slate-500 font-medium">Terms</h4>
          <h4 className="text-sm text-slate-500 font-medium">Privacy</h4>
          <h4 className="text-sm text-slate-500 font-medium">Cookies</h4>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          {docLinks.map((link) => {
            return (
              <h4 className="text-sm text-slate-500 font-medium" key={link}>
                {link}
              </h4>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
