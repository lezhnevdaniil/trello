import { useRef } from "react";
import "./ChangeCardTittle.scss";

const ChangeCardTittle = ({
  idCardChange,
  setIsModal,
  setCardList,
  setOption,
}) => {
  const inputRef = useRef();

  const changeCardTittle = () => {
    setCardList((cards) =>
      cards.map((card) =>
        card.id === idCardChange
          ? { ...card, text: inputRef.current.value }
          : card
      )
    );
    setIsModal((prev) => ({ ...prev, changeColumn: false }));
    setOption(null);
  };

  return (
    <div className="change-card">
      <div>
        <p>Введите новое название колонки</p>
      </div>
      <div>
        <input ref={inputRef} />
      </div>
      <div className="change-card_buttons">
        <button className="" onClick={changeCardTittle}>
          Применить
        </button>
        <button
          className=""
          onClick={() =>
            setIsModal((prev) => ({ ...prev, changeColumn: false }))
          }
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default ChangeCardTittle;
