import { useRef } from "react";
import "./AddCard.scss";

const AddCard = ({ setIsModal, setCardList, cardList }) => {
  const inputRef = useRef();

  const addList = () => {
    if (inputRef.current.value) {
      if (!cardList.length) {
        setCardList([
          {
            id: new Date().getMilliseconds(),
            order: 1,
            text: inputRef.current.value,
            tasks: [],
          },
        ]);
      } else {
        const max = cardList.reduce((card, curr) =>
          card.order > curr.order ? card : curr
        );
        setCardList((cards) => [
          ...cards,
          {
            id: new Date().getMilliseconds(),
            order: max.order + 1,
            text: inputRef.current.value,
            tasks: [],
          },
        ]);
      }
    } else {
      alert("Введите название")
    }
    setIsModal((prev) => ({ ...prev, addColumn: false }));
  };

  return (
    <div className="add-card">
      <div>
        <p>Введите название колонки</p>
      </div>
      <div>
        <input ref={inputRef} />
      </div>
      <div className="add-card_buttons">
        <button onClick={addList}>Применить</button>
        <button
          onClick={() => setIsModal((prev) => ({ ...prev, addColumn: false }))}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default AddCard;
