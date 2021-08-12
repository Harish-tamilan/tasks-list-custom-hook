import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp  from './hooks/use-http';

function App() {
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, request: fetchTasks} = useHttp();

  


  useEffect(() => {
    const transform = (tasksObj) => {

      //console.log(tasksObj);
      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasks({api:"https://react-http-05-default-rtdb.firebaseio.com/tasks.json"},transform);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prev)=>prev.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
