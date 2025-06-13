import React, { useState, useEffect } from 'react';

const App = () => {
  // localStorage.clear()

  
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { todo: 'Go to gym', complete: false },
  ]);
  
  useEffect(() => {
    const arrayTasks = JSON.parse(localStorage.getItem('list'))
    if(arrayTasks){
      setTasks(arrayTasks)
    }
}, [])
  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(tasks))
  }, [tasks])
  

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggle = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, complete: !task.complete } : task
      )
    ); 
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      setTasks([...tasks, { todo: task.trim(), complete: false }]);
      setTask('');    
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-sky-600'>
      <div className='w-[90%] max-w-[900px] h-[80%] bg-white rounded-2xl p-5 flex flex-col items-center gap-5'>
        <form
          onSubmit={addTask}
          className='bg-zinc-200 rounded-md w-full md:w-[90%] flex justify-between text-md'
        >
          <input
            type='text'
            placeholder='Write something'
            className='px-3 py-3 w-[90%]'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className='bg-sky-600 text-white text-sm px-4 hover:bg-sky-900 w-max rounded-r-lg'
            type='submit'
          >
            Add
          </button>
        </form>

        <h1 className='text-xl font-semibold'>- All Tasks -</h1>

        <div className='w-full md:w-[90%] overflow-y-auto p-4'>
          {tasks.map((elem, index) => (
            <div
              key={index}
              className='flex bg-zinc-200 px-5 py-3 justify-between rounded-lg mb-4'
            >
              <div className='flex gap-5 items-center h-full'>
                <input
                  type='checkbox'
                  checked={elem.complete}
                  onChange={() => handleToggle(index)}
                />
                <h1
                  className={`${
                    elem.complete ? 'line-through opacity-50' : ''
                  } text-lg font-medium pb-1`}
                >
                  {elem.todo}
                </h1>
              </div>
              <button
                className='text-red-600 font-bold bg-red-300 w-7 rounded-full pb-1 hover:text-red-200 hover:bg-red-600'
                onClick={() => handleDelete(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
