import React, { Component } from 'react';
import './Main.css';

import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    newTask: '',
    taskList: [],
    index: -1,
  };

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { taskList, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (taskList.indexOf(newTask) !== -1) return;

    const newTaskList = [...taskList];

    if (index === -1) {
      // index -1 means nothing is being edited
      // Create
      this.setState({
        taskList: [...newTaskList, newTask],
        newTask: '',
      });
    } else {
      // Edit
      newTaskList[index] = newTask;
      this.setState({
        index: -1,
        taskList: [...newTaskList],
        newTask: '',
      });
    }
  };

  handleEdit = (e, index) => {
    const { taskList } = this.state;

    this.setState({
      index,
      newTask: taskList[index],
    });
  };

  handleDelete = (e, index) => {
    const { taskList } = this.state;
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);

    this.setState({
      taskList: [...newTaskList],
    });
  };

  render() {
    const { newTask, taskList } = this.state;
    return (
      <div className="main">
        <h1>To Do List</h1>

        <form action="#" onSubmit={this.handleSubmit} className="task-form">
          <input
            onChange={this.handleInputChange}
            type="text"
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {taskList.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose
                  className="delete"
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
