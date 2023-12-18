import Logo from "../assets/img/logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-2 ">
      <div className="container mx-auto text-black flex justify-between items-center">
        <a href="/">
          <img src={Logo} alt="" />
        </a>
        Copyright &copy; Dream Hotel 2023. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
