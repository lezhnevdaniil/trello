import { useRef, useState } from "react";
import AddCard from "../AddCard/AddCard";
import ChangeCardTittle from "../ChangeCardTittle/ChangeCardTittle";
import AddTask from "../AddTask/AddTask";
import ChangeTask from "../ChangeTask/ChangeTask";
import Modal from "../Modal/Modal";
import plus from "../../assets/plus.png";
import cross from "../../assets/cross.png";
import { useClickOutside } from "./useClickOutside";
import "./Columns.scss";

const Columns = () => {
  const [cardList, setCardList] = useState([]);
  const [cardChange, setCardChange] = useState(null);
  const [isModal, setIsModal] = useState({
    addColumn: false,
    changeColumn: false,
    addTask: false,
    changeTask: false,
  });
  const [option, setOption] = useState(null);
  const [indexOption, setIndexOption] = useState(null);
  const [idCardChange, setIdCardChange] = useState(null);
  const [taskChange, setTaskChange] = useState(null);
  const [cardChangeTask, setCardChangeTask] = useState(null);
  const [idTask, setIdTask] = useState(null);
  const [indexTask, setIndexTask] = useState(null);

  const rootEl = useRef([]);
  const optionRef = useRef([]);
  const crossRef = useRef(null);

  const dragSrartHandler = (e, card) => {
    e.stopPropagation();
    setCardChange(card);
  };

  const dragEndHandler = (e) => {
    e.target.style.background = "rgb(235, 236, 240)";
  };

  const dragOverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    if (e.target.className === "task") {
      e.target.style.background = "white";
    }

    if (e.target.className === "card") {
      e.target.style.background = "rgb(235, 236, 240)";
    }

    if (e.target.className === "task_delete") {
      e.target.style.boxShadow = "none";
    }

    if (cardChangeTask) {
      card.tasks.push(taskChange);
      const currentIndex = cardChangeTask.tasks.indexOf(taskChange);
      cardChangeTask.tasks.splice(currentIndex, 1);

      setCardList((cards) =>
        cards.map((board) => {
          if (board.id === card.id) {
            return card;
          }

          if (board.id === cardChangeTask.id) {
            return cardChangeTask;
          }

          return board;
        })
      );
      setCardChangeTask(null);
    } else {
      setCardList(
        cardList.map((c) => {
          if (c.id === cardChange.id) {
            return { ...c, order: card.order };
          }

          if (c.id === card.id) {
            return { ...c, order: cardChange.order };
          }

          return c;
        })
      );
    }
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
  };

  const deleteCard = (id) => {
    setCardList((cards) => cards.filter((card) => card.id !== id));
  };

  const deleteTask = (id, index) => {
    const oldTask = cardList[index].tasks.filter((task) => task.idTask !== id);

    setCardList((cards) =>
      cards.map((card, indexCard) =>
        indexCard === index ? { ...card, tasks: oldTask } : card
      )
    );
  };

  const dragSrartHandlerTask = (e, card, task) => {
    e.stopPropagation();
    setTaskChange(task);
    setCardChangeTask(card);
  };

  const dragEndHandlerTask = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.style.boxShadow = "none";
  };

  const dragLeaveHandlerTask = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.style.boxShadow = "none";
  };

  const dragOverHandlerTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className === "task_delete") {
      e.target.style.boxShadow = "none";
    } else {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const dropHandlerTask = (e) => {
    e.preventDefault();
    if (e.target.className === "task") {
      e.target.style.background = "white";
      e.target.style.boxShadow = "none";
    }
  };

  useClickOutside(rootEl, optionRef, crossRef, indexOption, () =>
    setOption(null)
  );

  return (
    <div className="drag-container">
      <div className="content">
        {cardList.sort(sortCards).map((card, index) => (
          <div key={card.id} className="card-container">
            <div
              onDragStart={(e) => dragSrartHandler(e, card)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, card)}
              draggable={true}
              className="card"
            >
              <div className="card_header">
                {card.text}
                <div
                  className="card_header_option"
                  ref={(element) => (rootEl.current[index] = element)}
                  onClick={() => {
                    setOption(card.id);
                    setIndexOption(index);
                  }}
                >
                  ...
                  {option === card.id && (
                    <div
                      className="option_container"
                      ref={(element) => (optionRef.current[index] = element)}
                    >
                      <div className="option_header">
                        <p>List Actions</p>
                        <img src={cross} ref={crossRef} />
                      </div>

                      <div className="option_content">
                        <div
                          className="option_content_element1"
                          onClick={() => deleteCard(card.id)}
                        >
                          <p>Delete column</p>
                        </div>

                        <div
                          className="option_content_element2"
                          onClick={() => {
                            setIsModal((prev) => ({
                              ...prev,
                              changeColumn: true,
                            }));
                            setIdCardChange(card.id);
                          }}
                        >
                          <p>Change title</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card_tasks">
                {card.tasks.length
                  ? card.tasks.map((task) => (
                      <div
                        key={task.idTask}
                        className="task"
                        draggable={true}
                        onDragStart={(e) => dragSrartHandlerTask(e, card, task)}
                        onDragLeave={(e) => dragLeaveHandlerTask(e)}
                        onDragEnd={(e) => dragEndHandlerTask(e)}
                        onDragOver={(e) => dragOverHandlerTask(e)}
                        onDrop={(e) => dropHandlerTask(e, card, task)}
                      >
                        <div>{task.textTask}</div>

                        <div>
                          <p
                            className="task_delete"
                            onClick={() => deleteTask(task.idTask, index)}
                          >
                            Delete
                          </p>

                          <p
                            className="task_change"
                            onClick={() => {
                              setIsModal((prev) => ({
                                ...prev,
                                changeTask: true,
                              }));
                              setIndexTask(index);
                              setIdTask(task.idTask);
                            }}
                          >
                            Change
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <button
                className="button"
                onClick={() => {
                  setIsModal((prev) => ({ ...prev, addTask: true }));
                  setIndexTask(index);
                  setIdTask(card.id);
                }}
              >
                <img className="button_img" src={plus} />
                Add task
              </button>
            </div>
          </div>
        ))}

        {cardList.length < 5 && (
          <button
            className="button-add-card"
            onClick={() => setIsModal((prev) => ({ ...prev, addColumn: true }))}
          >
            <img className="button-add-card_img" src={plus} />
            Add another list
          </button>
        )}
      </div>

      {isModal.addColumn && (
        <Modal setIsModal={setIsModal}>
          <AddCard
            setIsModal={setIsModal}
            setCardList={setCardList}
            cardList={cardList}
          />
        </Modal>
      )}

      {isModal.changeColumn && (
        <Modal setIsModal={setIsModal}>
          <ChangeCardTittle
            idCardChange={idCardChange}
            setIsModal={setIsModal}
            setCardList={setCardList}
            setOption={setOption}
          />
        </Modal>
      )}

      {isModal.addTask && (
        <Modal setIsModal={setIsModal}>
          <AddTask
            setIsModal={setIsModal}
            setCardList={setCardList}
            idTask={idTask}
          />
        </Modal>
      )}

      {isModal.changeTask && (
        <Modal setIsModal={setIsModal}>
          <ChangeTask
            setIsModal={setIsModal}
            setCardList={setCardList}
            cardList={cardList}
            indexTask={indexTask}
          />
        </Modal>
      )}
    </div>
  );
};

export default Columns;
