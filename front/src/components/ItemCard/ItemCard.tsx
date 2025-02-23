import { Paper } from '@mui/material'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ItemCardDropdown from './ItemCardDropdown'
import { Item } from '../../types/ItemsTypes'

const taskIcon = (status: 'pending' | 'completed') => {
  if (status === 'pending') {
    return <TimerOutlinedIcon className='text-blue-600' data-testid='pending-icon' />
  }
  return <TaskAltIcon className='text-green-600' data-testid='completed-icon' />
}

type ItemCardProps = {
  item: Item
  refetch: () => void
}

export const ItemCard = ({ item, refetch }: ItemCardProps) => {

  return (
    <Paper elevation={3} className='p-4'>
      <div className='flex flex-row justify-between'>
        <div className='flex gap-2 items-center'>
          {taskIcon(item.status)}
          <h3 className='text-xl font-semibold text-gray-700'>{item.name}</h3>
        </div>

        <ItemCardDropdown item={item} refetch={refetch} />
      </div>
      <p className='text-gray-600'>{item.description}</p>
    </Paper >
  )
}
