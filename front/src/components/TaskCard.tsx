import { Paper } from '@mui/material'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const taskIcon = (status: 'pending' | 'completed') => {
  if (status === 'pending') {
    return <TimerOutlinedIcon className='text-blue-600' data-testid='pending-icon' />
  }
  return <TaskAltIcon className='text-green-600' data-testid='completed-icon' />
}

type TaskCardProps = {
  title: string
  description: string
  status: 'pending' | 'completed'
}

export const TaskCard = ({ title, description, status }: TaskCardProps) => {
  return (
    <Paper elevation={3} className='p-4'>
      <div className='flex gap-2 items-center'>
        {taskIcon(status)}
        <h3 className='text-xl font-semibold text-gray-700'>{title}</h3>
      </div>
      <p className='text-gray-600'>{description}</p>
    </Paper >
  )
}
