import React, { useMemo, useEffect } from "react";
import "./Form.css";
import List from "../TodoList/List";
import { TextField, Button } from "@material-ui/core";
//import { render } from "@testing-library/react";
import shortid from "shortid";

function Form() {
  const [err, setError] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [list, setList] = React.useState([]);

  // localStorage.removeItem("Todo-obj");
  useEffect(() => {
    var storedList = localStorage.getItem("Todo-obj");
    var myList;
    if (storedList !== null) {
      myList = JSON.parse(storedList);
      setList([...myList]);
      console.log(myList.length);
    }
  }, []);
  const updateList = useMemo(() => {
    if (list.length > 0) {
      return <List todos={list} />;
    } else {
      return <h1>No , Todos !</h1>;
    }
  }, [list]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      setError(true);
    } else {
      var todoObj = [
        {
          id: shortid.generate(),
          text: todo,
          completed: false,
        },
      ];
      setList((l) => [...todoObj, ...l]);

      var storedTodos = localStorage.getItem("Todo-obj");
      if (storedTodos !== null) {
        var copyTodo = JSON.parse(storedTodos);
        var newTodo = [...todoObj, ...copyTodo];
        localStorage.setItem("Todo-obj", JSON.stringify(newTodo));
      } else {
        localStorage.setItem("Todo-obj", JSON.stringify(todoObj));
      }
      setTodo("");
    }
  };

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <TextField
          size="medium"
          value={todo}
          multiline={true}
          id="todobox"
          error={err}
          helperText={err ? "Cannot be an empty task !" : ""}
          type="text"
          variant="outlined"
          label="Enter your Task"
          //required={true}
          onChange={(e) => {
            if (e.target.value === null) {
              setError(true);
            } else {
              setError(false);
              setTodo(e.target.value);
            }
          }}
        ></TextField>

        <Button
          type="submit"
          className="todo-btn"
          id="todo-submit"
          variant="contained"
          size="medium"
        >
          Create Todo
        </Button>
      </form>

      {updateList}
    </div>
  );
}

export default Form;
