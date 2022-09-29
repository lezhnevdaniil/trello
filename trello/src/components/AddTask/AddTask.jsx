import { useRef } from "react";
import "./AddTask.scss";

const AddTask = ({ setIsModal, setCardList, idTask }) => {
  const inputRef = useRef();

  const addTask = () => {
    setCardList((cards) =>
      cards.map((card) => {
        if (card.id === idTask) {
          card.tasks.push({
            idTask: new Date().getMilliseconds(),
            textTask: inputRef.current.value,
          });
          return card;
        } else {
          return card;
        }
      })
    );
    setIsModal((prev) => ({ ...prev, addTask: false }));
  };

  return (
    <div className="add-task">
      <div>
        <p>Введите название задачи</p>
      </div>
      <div>
        <input ref={inputRef} />
      </div>
      <div className="add-task_buttons">
        <button className="" onClick={addTask}>
          Применить
        </button>
        <button
          className=""
          onClick={() => setIsModal((prev) => ({ ...prev, addTask: false }))}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default AddTask;
