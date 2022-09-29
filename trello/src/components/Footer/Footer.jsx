import trello from "../../assets/trello.png";
import "./Footer.scss";

const Footer = () => {
  const titleFooter = ["О Trello", "Вакансии", "Приложения", "Обратная связь",]
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div>
            <img src={trello} />
            <p>Trello</p>
          </div>
          {titleFooter.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
