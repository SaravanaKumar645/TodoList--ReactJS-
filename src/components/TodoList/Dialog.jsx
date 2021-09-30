import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Dialog.css";
import Slide from "@mui/material/Slide";

//Transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

//Draggable Dialog property
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-content"
      cancel={'[class*="MuiDialogAction-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const inputStyle = {
  marginTop: "50px",
  width: "330px",
  marginBottom: "50px",
};
export default function FormDialog(props) {
  const alertInputRef = React.useRef();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  const [updatedTodo, setUpdate] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleEdit = () => {
    if (updatedTodo.length === 0) {
      alertInputRef.current.focus();
      setError(true);
    } else {
      let update = props.currentTodo[props.currentIndex];
      update["text"] = updatedTodo;
      console.log(update);
      var newArray = [...props.currentTodo];
      newArray[props.currentIndex] = update;
      props.onUpdate(newArray);
      console.log(newArray);
      localStorage.setItem("Todo-obj", JSON.stringify(newArray));
      setShow(false);
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        open={show}
        id="dialog"
        closeAfterTransition={true}
        onClose={handleClose}
        aria-labelledby="draggable-content"
        PaperComponent={PaperComponent}
      >
        <DialogTitle
          style={{
            cursor: "move",
            color: "dodgerblue",
            fontWeight: "bold",
            fontSize: "18pt",
          }}
          id="draggable-dialog-title"
        >
          Update Task
        </DialogTitle>
        <DialogContent id="draggable-content">
          <DialogContentText>
            Enter the updated task in the text field below .
          </DialogContentText>
          <TextField
            style={inputStyle}
            id="alert-input"
            value={updatedTodo}
            multiline={true}
            size="small"
            onChange={(e) => setUpdate(e.target.value)}
            ref={alertInputRef}
            label="Update your task"
            type="text"
            error={error}
            helperText={error ? "Cannot be an empty task !" : ""}
            variant="outlined"
          />
          <p>
            Note: This dialog can be draggable. Click anywhere to drag the
            dialog
          </p>
        </DialogContent>
        <DialogActions
          style={{
            marginRight: "10px",
            marginBottom: "20px",
            display: "flex",
            gap: "2ch",
          }}
        >
          <Button
            size="small"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            style={{ fontWeight: "bold" }}
            focusRipple={true}
            variant="contained"
            onClick={() => {
              handleEdit();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
