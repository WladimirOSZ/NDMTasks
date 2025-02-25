import AddTaskIcon from '@mui/icons-material/AddTask'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ListFormModal from '../components/ListFormModal'
import { NoItems } from '../components/NoItems'

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  if (token) {
    navigate(`/${token}`)
  }

  return (
    <div className='flex flex-col px-2 md:px-4 lg:px-10 py-6'>
      <div className='flex flex-col sm:flex-row md:items-center mb-2 sm:justify-between'>
        <div className='flex items-center gap-2'>
          <AddTaskIcon style={{ fontSize: '36px' }} className='text-blue-600' />
          <h1 className='text-3xl font-bold text-gray-700'>NDMTasks</h1>
          <h1 className='text-3xl text-gray-700'>- Home</h1>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
        <h3 className='text-gray-600 text-2xl'>The best to-do list you need.</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-1 px-4 py-2 bg-green-600 text-white cursor-pointer
                 font-semibold rounded-md hover:bg-green-700 focus:outline-none mt-2 sm:mt-0'
        >
          <AddIcon className='text-white' />
          Create a new list
        </button>
      </div>

      {isModalOpen && <ListFormModal closeModal={() => setIsModalOpen(false)} />}

      <div className='flex'>
        <NoItems setIsModalOpen={setIsModalOpen} statusFilter='noList' />
      </div>
    </div>
  )
}

export default HomePage
