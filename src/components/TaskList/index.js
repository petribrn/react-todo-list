import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import './Tasks.css';

export default function TaskList({ handleDelete, handleEdit, taskList }) {
  return (
    <ul className="tasks">
      {taskList.map((task, index) => (
        <li key={task}>
          {task}
          <span>
            <FaEdit className="edit" onClick={(e) => handleEdit(e, index)} />

            <FaWindowClose
              className="delete"
              onClick={(e) => handleDelete(e, index)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

// Types of props
TaskList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  taskList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
