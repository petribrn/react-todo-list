import React, { Component } from 'react';
import Form from './Form';
import TaskList from './TaskList';
import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
    taskList: [],
    index: -1,
  };

  componentDidMount() {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    if (!taskList) return;

    this.setState({ taskList });
  }

  componentDidUpdate(prevProps, prevState) {
    const { taskList } = this.state;
    if (taskList === prevState.taskList) return;

    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

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
    if (!newTask) return;

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

        <Form
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          newTask={newTask}
        />

        <TaskList
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          taskList={taskList}
        />
      </div>
    );
  }
}
