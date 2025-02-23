import AddIcon from '@mui/icons-material/Add'
import { FilterType } from '../types/ItemsTypes'

type NoItemsProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  statusFilter: FilterType
}

const statusMessages = {
  all: 'No tasks yet. Create one!',
  pending: 'No pending tasks. Well done!',
  completed: 'No completed tasks. Keep going!'
}

export const NoItems = ({ setIsModalOpen, statusFilter }: NoItemsProps) => {
  return (
    <>
      <div className='flex items-center gap-2 mt-10'>
        <p className='text-gray-600 text-lg'>
          {statusMessages[statusFilter]}
        </p>
        {statusFilter === 'all' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-1 px-4 py-2 bg-green-600 text-white cursor-pointer
                   font-semibold rounded-md hover:bg-green-700 focus:outline-none ms-3'
          >
            <AddIcon className='text-white' />
            Add task
          </button>
        )}
      </div>
    </>
  )
}
