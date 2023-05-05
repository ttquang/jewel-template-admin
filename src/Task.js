import {useTasksDispatch} from "./TasksContext";
import Parameter from "./Parameter";
import {v4 as uuid} from "uuid";
import axios from "axios";

export default function Task({task}) {
  const tasksDispatch = useTasksDispatch();

  async function handleTextChangedAsync(text) {
    if (text) {
      await axios
        .get("http://192.168.1.24:8080/templates/" + text + "/parameters")
        .then((response) => {
          let parameters = response.data;
          parameters = parameters.map(parameter => {
            return {
              id: uuid(),
              name: parameter
            }
          });
          handleTextChanged(text, parameters);
        }).catch((reason) => {
          console.log(reason)
          handleTextChanged(text, []);
        });
    } else {
      handleTextChanged(text, []);
    }
  }

  function handleTextChanged(text, parameters) {
    let newTask = {
      id: task.id,
      text: text,
      parameters: parameters
    };
    tasksDispatch({
      type: 'changed',
      task: newTask
    })
  }

  function handleParameterChanged(id, e) {
    let parameters = task.parameters.map(p => {
      if (p.id === id) {
        return {...p, value: e.target.value};
      } else {
        return p;
      }
    });
    let newTask = {...task, parameters: parameters};
    tasksDispatch({
      type: 'changed',
      task: newTask
    })
  }


  let taskContent;
  taskContent = (
    <>
      <input
        value={task.text}
        onChange={e => handleTextChangedAsync(e.target.value)}/>
      <ul>
        {task.parameters.map(parameter => (
          <li key={parameter.id}>
            <Parameter parameter={parameter} handleChange={(e) => handleParameterChanged(parameter.id, e)}/>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <label>
      {taskContent}
      <button onClick={() => {
        tasksDispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
      <button onClick={() => {
        tasksDispatch({
          type: 'added-after',
          id: task.id
        });
      }}>
        Add after
      </button>
    </label>
  );
}
