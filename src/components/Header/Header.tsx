import Logo from "../../assets/images/beLogo.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className='header-container'>
      <img src={Logo} alt='Logo' />
    </div>
  );
};

export default Header;
