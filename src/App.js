import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './store/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  let content;

  if (taskStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (taskStatus === 'succeeded') {
    content = (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    );
  } else if (taskStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Task List</h1>
      {content}
    </div>
  );
}

export default App;
