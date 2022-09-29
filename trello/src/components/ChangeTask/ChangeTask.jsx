import { useRef } from "react";
import "./ChangeTask.scss";

const ChangeTask = ({ setIsModal, setCardList, cardList, indexTask, idTask }) => {
  const inputRef = useRef();

  const changeTaskTittle = () => {
		const changeTask = cardList[indexTask].tasks.map(task => (
			task.idTask === idTask ? { ...task, textTask: inputRef.current.value } : task
		))

		setCardList(cards => cards.map((card, index) => (
			index === indexTask ? {...card, tasks: changeTask} : card
		)))
    
    setIsModal((prev) => ({ ...prev, changeTask: false }));
  };

  return (
    <div className="change-task">
      <div>
        <p>Введите новое название задачи</p>
      </div>
      <div>
        <input ref={inputRef} />
      </div>
      <div className="change-task_buttons">
        <button className="" onClick={changeTaskTittle}>
          Применить
        </button>
        <button
          className=""
          onClick={() =>
            setIsModal((prev) => ({ ...prev, changeTask: false }))
          }
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default ChangeTask;
