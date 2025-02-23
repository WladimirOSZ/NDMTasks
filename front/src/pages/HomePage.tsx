import AddTaskIcon from '@mui/icons-material/AddTask'
import AddIcon from '@mui/icons-material/Add'
import { TaskCard } from '../components/TaskCard'

const HomePage = () => {
  return (
    <div className='flex flex-col sm:px-2 md:px-4 lg:px-10 py-6'>
      <div className='flex mb-2'>
        <div className='flex items-center gap-2'>
          <AddTaskIcon style={{ fontSize: '36px' }} className='text-blue-600' />
          <h1 className='text-3xl font-bold text-gray-700'>NDMTasks</h1>
          <h1 className='text-3xl text-gray-700'>- Home</h1>
        </div>
        <button
          onClick={() => console.log('test')}
          className='flex items-center gap-1 px-4 py-2 bg-green-600 text-white cursor-pointer
                     font-semibold rounded-md hover:bg-green-700 focus:outline-none ms-3'
        >
          <AddIcon className='text-white' />
          Add task
        </button>
      </div>
      <h3 className='text-gray-600 mb-4 text-2xl'>The best to-do list you need.</h3>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <TaskCard title='Task 1' description='This is the description of task 1.' status='pending' />
        <TaskCard title='Task 2' description='This is the description of task 2.' status='completed' />
      </div>
    </div>
  )
}

export default HomePage
