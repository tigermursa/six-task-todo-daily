import React, { useState } from "react";

const TaskPage = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const currentDate = new Date();

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTaskList([...taskList, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
  };

  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (indexTo) => (e) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedTaskList = [...taskList];
    const [draggedTask] = updatedTaskList.splice(draggedIndex, 1);
    updatedTaskList.splice(indexTo, 0, draggedTask);
    setTaskList(updatedTaskList);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-600 to-green-300 min-h-screen flex flex-col justify-center items-center font-sans">
      <h1 className="text-4xl mb-4">My Six Tasks for Today</h1>
      <p className="mb-4">Current Date: {currentDate.toLocaleDateString()}</p>
      <p className="mb-4">
        Current Day:{" "}
        {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
      </p>

      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter a task"
          onKeyPress={handleKeyPress}
          className="w-64 p-2 text-lg rounded-full border-2 border-green-600"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 p-2 rounded-full bg-white text-green-600 font-semibold"
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {taskList.map((item, index) => (
          <li
            key={index}
            className="border p-2 mb-2 flex items-center"
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop(index)}
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "4px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="mr-2">{index + 1}.</span>
            <span className="text-lg">{item.text}</span>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTaskCompletion(index)}
              className="ml-auto"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
