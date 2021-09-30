import React, { useEffect, useRef, useState } from "react";
import * as Ioicons from "react-icons/io";
import * as Mdicons from "react-icons/md";
import { BiCalendarEdit } from "react-icons/bi";
import "./List.css";
import FormDialog from "./Dialog";
import { AiOutlineFileDone } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
import { render } from "@testing-library/react";

const List = (props) => {
  console.log("updating..." + props.todos[0].text);
  const [todo, setTodo] = useState(props.todos || []);
  const focusText = useRef(null);

  useEffect(() => {
    console.log("inisde use Effect");
    setTodo([...props.todos]);
  }, [props.todos]);

  const handleCompleted = (value, index) => {
    let update = todo[index];
    update["completed"] = !update["completed"];
    console.log(update);
    var newArray = [...todo];
    newArray[index] = update;
    props.onTodoChange(newArray);
    console.log(newArray);
    localStorage.setItem("Todo-obj", JSON.stringify(newArray));
  };
  const handleDeleted = (value, index) => {
    var currentArray = [...todo];
    var newArray = currentArray.filter((item) => {
      return value.id !== item.id;
    });
    props.onTodoChange(newArray);
    console.log(newArray);
    localStorage.setItem("Todo-obj", JSON.stringify(newArray));
  };

  const toggleDialog = (value, todo, index, currentValue) => {
    if (value) {
      render(
        <FormDialog
          currentTodo={todo}
          currentIndex={index}
          currentValue={currentValue}
          onUpdate={handleEdit}
        />
      );
    }
  };
  const handleEdit = (arr) => {
    props.onTodoChange(arr);
  };
  return (
    <div className="list">
      {console.log("state updating...")}
      <h2>My Todo</h2>
      <ul>
        {todo.map((value, index) => {
          return (
            <li
              key={value.id}
              className={value.completed ? "todo-li-completed" : "todo-li"}
            >
              <div className={value.completed ? "value-completed" : "value"}>
                {value.completed ? (
                  <AiOutlineFileDone className="completed-icon" />
                ) : (
                  ""
                )}
                <p ref={focusText}>{value.text}</p>
              </div>
              <div className="li-btns">
                <IconButton
                  id="complete-btn"
                  centerRipple={true}
                  title="Toggle completed status"
                  onClick={() => {
                    handleCompleted(value, index);
                  }}
                >
                  <Ioicons.IoIosCheckmarkCircleOutline />
                </IconButton>
                <IconButton
                  id="remove-btn"
                  centerRipple={true}
                  title="Delete Task"
                  onClick={() => {
                    handleDeleted(value, index);
                  }}
                >
                  <Mdicons.MdDeleteSweep />
                </IconButton>
                <IconButton
                  id="edit-btn"
                  disabled={value.completed}
                  centerRipple={true}
                  title="Edit task"
                  onClick={() => {
                    toggleDialog(true, todo, index, value);
                  }}
                >
                  <BiCalendarEdit />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
