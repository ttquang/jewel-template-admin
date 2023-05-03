import {useState} from 'react';
import {useTasksDispatch} from './TasksContext.js';

  export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Template Name"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        dispatch({
          type: 'view'
        });
      }}>View
      </button>
      <button onClick={() => {
        dispatch({
          type: 'save',
          name: text
        });
      }}>Save
      </button>
    </>
  );
}
