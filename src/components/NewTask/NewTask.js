import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  

  const {isLoading, error, request:addData} = useHttp();

  const enterTaskHandler = async (taskText) => {

    console.log('Inside enterTaskHandler in NewTask.js');
    
    const req = {
      api : 'https://react-http-05-default-rtdb.firebaseio.com/tasks.json',
      method:'POST',
      body : {text:taskText},
      header : {'Content-Type': 'application/json',}
    };
    addData(req, createTask.bind(null, taskText));
  };

  const createTask = (taskText, taskData)=>{
    console.log('inside createTask, isLoading is ',isLoading,', isError is ',error);
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    if(!error && !isLoading)
      props.onAddTask(createdTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>Error has Occured</p>}
    </Section>
  );
};

export default NewTask;
