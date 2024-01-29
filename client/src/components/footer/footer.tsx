import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="w-full max-w-[1280px] mx-auto py-6">
        {/* Social Links Container */}
        <div className="flex gap-4 justify-center items-center ">
          <div className="w-8 h-8 rounded-full  flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black cursor-pointer">
            <FaFacebookF size={20} />
          </div>
          <div className="w-8 h-8 rounded-full  flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black cursor-pointer">
            <FaTwitter size={20} />
          </div>
          <div className="w-8 h-8 rounded-full  flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-8 h-8 rounded-full  flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>

        {/* Other Links Container */}
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex justify-center items-center gap-4">
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Terms & Conditions
            </div>
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Privacy Policy
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center">
              © 2024, All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
