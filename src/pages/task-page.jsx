import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import PendingTasks from "../components/PendingTasks";
import FormTasks from "../components/FormTasks";
import InputTask from "../components/InputTask";
import AddTaskButton from "../components/AddTaskButton";
import ItemsList from "../components/ItemsList";
import Error from "../components/Error";
import DeleteButton from "../components/DeleteButton";
import ClearCompletedTasks from "../components/ClearCompletedTasks";
import Select from "react-select";

import api from "../utils/api";

import "../global.css";
import useLocalStorageString from "../hooks/useLocalStorageString";

import useAuth from "../hooks/useAuth";

function TaskPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");
  const [textInput, setTextInput] = useLocalStorageString("inputText", "");
  const pendingTasks = tasks.filter((task) => !task.completed);

  const ref = useRef();



  // useEffect(async() => {
  //   await api.getAllTask()
  //     .then(setTasks);
  // }, []);
  
  useEffect( async () => {
    const tasks = await api.getAllTask();
    const boards = await api.getAllBoard();
    setTasks(tasks);
    setBoards(boards)
    setLoading(false);
  }, []);


  const BoardOptions = boards.map(function (row) {
    return { value: row._id, label: row.title };
  });


  // const historyTask = useHistory();
  // useEffect(() => {
  //   if (user.name === "" || user.password === "") {
  //     historyTask.push("/login");
  //   }
  // }, [user]);

  useEffect(() => {
    document.title = `${pendingTasks.length} tasks left to do`;
  }, [pendingTasks]);

  // const addTask = async (task) => {
  //   try {
  //     //Optimistic update
  //     setTasks([...tasks,task]);
  //     const response = await postTask(task);
  //     // if(!response.ok) {
  //     //   //Rollback
  //     //   setTasks(tasks);
  //     // }
  //   }
  //   catch(error) {
  //     setTasks(tasks);
  //     console.log(error);
  //   }
  // }
  
  const addTask = async (task) => {
    //console.log(task);
    try {
      await api.postTask(task);
    }
    catch(error) {
      //setTasks(tasks);
      console.log(error);
    }
  }


  async function deleteTask(idItem) {
    await api.deleteTask(idItem);
    const newTask = await api.getAllTask();
    setTasks(newTask);
    setError("");
    setTextInput("");
  }

  function completedTask(idItem) {
    const newTask = tasks.map((task) => {
      if (task.id === idItem) {
        task.linethrough = !task.linethrough;
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(newTask);
    setError("");
    setTextInput("");
  }

  function clearCompletedTasks() {
    const newTask = tasks.filter((task) => !task.completed);
    setTasks(newTask);
    setError("");
    setTextInput("");
  }

  function changeInput(inputValue) {
    setTextInput(inputValue);
    if (error) {
      setError("");
    }
  }

  const focusInput = () => ref.current.focus();

  if(loading) {
    return (
      <div className="w-96 text-center mx-auto bg-white bg-opacity-70 p-4 m-4 rounded-md">
        cargando datos...
      </div>
    )
  }

  return (
    <div className="w-96 text-center mx-auto bg-white bg-opacity-70 p-4 m-4 rounded-md">
      <Title />
      <PendingTasks tasks={tasks} />
      <FormTasks onSubmit={addTask}>
        <InputTask
          ref={ref}
          placeholder="Task Title"
          value={textInput}
          onChange={changeInput}
        />
        <Select
          className="border border-gray-700 rounded w-full mb-2 focus:outline-none text-gray-500 text-sm"
          options={BoardOptions}
          //defaultValue={boardSelect}
          id="board"
          name="board"
        />
        <AddTaskButton onClick={focusInput} />
      </FormTasks>
      <Error value={error} />
      <div className="grid grid-cols-8 gap-4">
        <div>
          <ItemsList>
            {tasks.map((task) => (
              <li onClick={() => deleteTask(task._id)} key={task._id}>
                <DeleteButton />
              </li>
            ))}
          </ItemsList>
        </div>
        <div className="col-span-7">
          <ItemsList>
            {tasks.map((task) => (
              <li
                className={
                  task.linethrough
                    ? "line-through border-b border-dotted border-red-400 mt-1"
                    : "border-b border-dotted border-red-400 mt-1"
                }
                onClick={() => completedTask(task._id)}
                key={task._id}
              >
                {task.title}
              </li>
            ))}
          </ItemsList>
        </div>
      </div>
      <ClearCompletedTasks onClick={clearCompletedTasks} />
    </div>
  );
}

export default TaskPage;
