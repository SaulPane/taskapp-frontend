import React from "react";
import getRandomInt from "../utils/getRandomInt";

function FormTasks({ children, onSubmit }) {
  function addTask(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    onSubmit({
      //id: getRandomInt(),
      title: data.get("task"),
      board: data.get("board"),
      //linethrough: false,
      //completed: false,
    });
  }

  return <form onSubmit={addTask}>{children}</form>;
}

export default FormTasks;
