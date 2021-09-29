import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Ioicons from "react-icons/io";
import * as Mdicons from "react-icons/md";
import { BiCalendarEdit } from "react-icons/bi";
import "./List.css";
import { AiOutlineFileDone } from "react-icons/ai";
import { IconButton, TextField, Button } from "@material-ui/core";
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
} from "@reach/alert-dialog";

const List = (props) => {
  console.log("updating..." + props.todos[0].text);
  const alertRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [todo, setTodo] = useState([]);
  const focusText = useRef(null);

  useEffect(() => {
    console.log("inisde use Effect");
    setTodo([...props.todos]);
  }, []);

  const handleCompleted = (value, index) => {
    let update = todo[index];
    update["completed"] = !update["completed"];
    console.log(update);
    var newArray = [...todo];
    newArray[index] = update;
    console.log(newArray);
    setTodo(() => [...newArray]);
    localStorage.setItem("Todo-obj", JSON.stringify(newArray));
  };
  const handleDeleted = (value, index) => {
    var currentArray = [...todo];
    var newArray = currentArray.splice(index, 1);
    console.log(newArray);
    setTodo(() => [...newArray]);
    localStorage.setItem("Todo-obj", JSON.stringify(newArray));
  };
  const handleEdit = (value, index) => {
    //setShowDialog(true);
  };

  return (
    <div className="list">
      {console.log("state updating...")}
      {showDialog && (
        <AlertDialog className="alert-dialog" leastDestructiveRef={alertRef}>
          <AlertDialogLabel>Update your Task</AlertDialogLabel>
          <TextField
            id="alert-input"
            size="small"
            type="text"
            variant="outlined"
            multiline={true}
            label="Enter your task "
            required={true}
          ></TextField>
          <Button
            id="alert-btn"
            size="small"
            variant="outlined"
            ref={alertRef}
            onClick={() => {
              setShowDialog(false);
            }}
          ></Button>
        </AlertDialog>
      )}
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
                  onClick={(e) => {
                    handleCompleted(value, index);
                  }}
                >
                  <Ioicons.IoIosCheckmarkCircleOutline />
                </IconButton>
                <IconButton
                  id="remove-btn"
                  centerRipple={true}
                  title="Delete Task"
                  onClick={(e) => {
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
                  onClick={(e) => {
                    handleEdit(value, index);
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
