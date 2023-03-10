import React, { useState } from "react";
// import "./styles.css";

const initialTasks = {
  doing: [
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" }
  ],
  done: [
    { id: 4, title: "Task 4" },
    { id: 5, title: "Task 5" }
  ]
};

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask) return;
    const newId = Date.now();
    const newTaskObj = { id: newId, title: newTask };
    setTasks((prevTasks) => ({
      ...prevTasks,
      doing: [...prevTasks.doing, newTaskObj]
    }));
    setNewTask("");
  };

  const handleDeleteAll = () => {
    setTasks((prevTasks) => ({ ...prevTasks, done: [] }));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.doing.find((task) => task.id === Number(taskId));
    if (!task) return;
    const newDoingTasks = tasks.doing.filter((task) => task.id !== Number(taskId));
    const newDoneTasks = [...tasks.done, task];
    setTasks({ doing: newDoingTasks, done: newDoneTasks });
  };

  return (
    <div className="app">
      <h1 className="app__title">Kanban Board</h1>
      <form className="app__form" onSubmit={handleAddTask}>
        <input
          className="app__input"
          type="text"
          value={newTask}
          placeholder="Add new task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="app__button" type="submit">Add</button>
      </form>
      <div className="app__board">
        <div className="app__column">
          <h2 className="app__column-title">Doing</h2>
          {tasks.doing.map((task) => (
            <div
              key={task.id}
              className="app__task"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              {task.title}
            </div>
          ))}
        </div>
        <div
          className="app__column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "done")}
        >
          <h2 className="app__column-title">Done</h2>
          {tasks.done.map((task) => (
            <div key={task.id} className="app__task">
              {task.title}
            </div>
          ))}
          {tasks.done.length > 0 && (
            <button className="app__delete-all" onClick={handleDeleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

