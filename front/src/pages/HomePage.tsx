import AddTaskIcon from '@mui/icons-material/AddTask'
import AddIcon from '@mui/icons-material/Add'
import { useQuery } from '@apollo/client'
import GET_ITEMS from '../graphql/queries/get_items'
import { GetItems } from '../types/ItemsTypes'
import { NoItems } from '../components/NoItems'
import { useState } from 'react'
import { ItemCardSkeleton } from '../components/ItemCard/ItemCardSkeleton'
import { ItemCard } from '../components/ItemCard/ItemCard'
import ItemFormModal from '../components/ItemFormModal'

const HomePage = () => {
  const { loading, error, data, refetch } = useQuery<GetItems>(GET_ITEMS)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (error) return <p>Error fetching</p>

  const items = data?.getItems
  const noItems = loading === false && items?.length === 0

  return (
    <div className='flex flex-col sm:px-2 md:px-4 lg:px-10 py-6'>
      <div className='flex mb-2'>
        <div className='flex items-center gap-2'>
          <AddTaskIcon style={{ fontSize: '36px' }} className='text-blue-600' />
          <h1 className='text-3xl font-bold text-gray-700'>NDMTasks</h1>
          <h1 className='text-3xl text-gray-700'>- Home</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-1 px-4 py-2 bg-green-600 text-white cursor-pointer
                     font-semibold rounded-md hover:bg-green-700 focus:outline-none ms-3'
        >
          <AddIcon className='text-white' />
          Add task
        </button>
      </div>
      {isModalOpen && <ItemFormModal closeModal={() => setIsModalOpen(false)} refetch={refetch} />}
      <h3 className='text-gray-600 mb-4 text-2xl'>The best to-do list you need.</h3>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))}
          </>
        )}

        {noItems && <NoItems />}

        {items?.map((item) => (
          <ItemCard key={item.id} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
