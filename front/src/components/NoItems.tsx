import AddIcon from '@mui/icons-material/Add'

export const NoItems = () => {
  return (
    <>
      <div className='flex items-center gap-2 mt-10'>
        <p className='text-gray-600 text-lg'>No tasks yet.</p>
        <button
          onClick={() => console.log('test')}
          className='flex items-center gap-1 px-4 py-2 bg-green-600 text-white cursor-pointer
                   font-semibold rounded-md hover:bg-green-700 focus:outline-none ms-3'
        >
          <AddIcon className='text-white' />
          Add task
        </button>
      </div>
    </>
  )
}
