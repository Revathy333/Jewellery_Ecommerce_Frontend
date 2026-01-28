import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // const goToAdminLogin = () => {
  //   navigate("/admin-login");
  // };
  return (
    <footer className="bg-gradient-to-r from-pink-200 to-purple-400 text-purple-900 mt-12">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">UMIKz</h2>
          <p className="text-purple-700 max-w-sm">
            Exquisite jewellery collections to sparkle every moment. Rings,
            necklaces, bracelets, and more crafted for elegance.
          </p>
        </div>

        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="border-t border-purple-300 mt-8 py-4 text-center text-purple-700 relative">
        &copy; {new Date().getFullYear()} UMIKz. All rights reserved.
       {/* <button
          onClick={goToAdminLogin}
          className="absolute bottom-2 right-2 w-8 h-8 opacity-0 hover:opacity-50 z-50"
          title="Admin Login"
        /> */}
      </div>
    </footer>
  );
};

export default Footer;
