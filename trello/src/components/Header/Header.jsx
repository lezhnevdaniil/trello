import trello from "../../assets/trello.png";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img src={trello} />
        <h1>Trello</h1>
      </div>
    </header>
  );
};

export default Header;
