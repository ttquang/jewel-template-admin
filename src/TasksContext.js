import {createContext, useContext, useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import axios from "axios";

const TasksContext = createContext([]);
const TasksDispatchContext = createContext(null);

export function TasksProvider({children}) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function updateTemplate(name, tasks) {
  axios
    .post('http://192.168.1.24:8080/templates', {
      name: name,
      elements: tasks
    })
    .then((response) => {
      console.log(response.data);
    });
}

function tasksReducer(tasks, action) {
  console.log(action);
  switch (action.type) {
    case 'save': {
      updateTemplate(action.name, tasks)
      return tasks;
    }
    case 'view': {
      console.log(tasks);
      return tasks;
    }
    case 'added': {
      return [...tasks, {
        id: uuid(),
        text: action.text,
        done: false
      }];
    }
    case 'added-after': {
      let insertAt = tasks.findIndex(task => task.id === action.id) + 1;
      return [...tasks.slice(0, insertAt),
        {
          id: uuid(),
          name: 'unknown',
          parameters: [],
          done: false
        },
        ...tasks.slice(insertAt)];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  {
    id: uuid(), text: '', done: true, parameters: []
  }
];
