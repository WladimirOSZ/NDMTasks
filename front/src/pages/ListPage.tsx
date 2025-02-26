import AddTaskIcon from '@mui/icons-material/AddTask'
import AddIcon from '@mui/icons-material/Add'
import { useQuery } from '@apollo/client'
import { FilterType } from '../types/ItemsTypes'
import { NoItems } from '../components/NoItems'
import { useState } from 'react'
import { ItemCardSkeleton } from '../components/ItemCard/ItemCardSkeleton'
import { ItemCard } from '../components/ItemCard/ItemCard'
import ItemFormModal from '../components/ItemFormModal'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Grid from '@mui/material/Grid2'
import GET_ITEMS_BY_STATUS, { GetItemsByStatus } from '../graphql/queries/get_items_by_status'
import { useNavigate, useParams } from 'react-router-dom'
import GET_LIST, { getList } from '../graphql/queries/get_list'

const ListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<FilterType>('all')
  const { token } = useParams<{ token: string }>()
  const { loading, error, data, refetch } = useQuery<GetItemsByStatus>(GET_ITEMS_BY_STATUS, {
    variables: {
      status: statusFilter === 'all' ? undefined : statusFilter,
      listToken: token,
    },
    fetchPolicy: 'cache-and-network'
  })
  const { loading: loadingGetList, error: errorGetList, data: dataGetList } = useQuery<getList>(GET_LIST, {
    variables: { token: token }
  })
  const navigate = useNavigate()

  if (errorGetList && errorGetList.message.includes('List not found')) {
    // TODO: Give the user a feedback on why this happened
    navigate('/')
  }

  if (error || errorGetList) return <p>Error fetching</p>

  const listName = dataGetList?.getList.name
  const items = data?.getItemsByStatus
  const noItems = loading === false && items?.length === 0

  return (
    <div className='flex flex-col px-2 md:px-4 lg:px-10 py-6'>
      <div className='flex flex-col sm:flex-row md:items-center mb-2 sm:justify-between'>
        <div className='flex items-center gap-2'>
          <AddTaskIcon style={{ fontSize: '36px' }} className='text-blue-600' />
          <h1 className='text-3xl font-bold text-gray-700'>NDMTasks</h1>
          <h1 className='text-3xl text-gray-700'>- List Page</h1>
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
          Add task
        </button>
      </div>


      {isModalOpen && <ItemFormModal closeModal={() => setIsModalOpen(false)} refetch={refetch} />}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 9 }}>
          <h3 className='text-gray-600 text-2xl mt-3'>
            List - {loadingGetList ? 'Loading...' : listName}
          </h3>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select
              data-testid='filter-select'
              value={statusFilter}
              label='Filter'
              onChange={(e) => setStatusFilter(e.target.value as FilterType)}
            >
              <MenuItem value={'all'}>Everything</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
        {loading && (
          <>
            {[...Array(4)].map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))}
          </>
        )}

        {noItems && <NoItems setIsModalOpen={setIsModalOpen} statusFilter={statusFilter} />}

        {items?.map((item) => (
          <ItemCard key={item.id} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  )
}

export default ListPage
