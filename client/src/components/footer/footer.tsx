import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <section className="container">
        <div className="social-links">
          <FaFacebookF size={20} />
          <FaTwitter size={20} />
          <FaYoutube size={20} />
          <FaInstagram size={20} />
        </div>

        <div className="footer-links">
          <div>Terms & Condition</div>
          <div>Privacy Policy</div>
        </div>

        <div>© 2023 All Rights Reserved</div>
      </section>
    </footer>
  );
};

export default Footer;
