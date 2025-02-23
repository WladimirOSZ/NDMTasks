import { Paper, Skeleton } from '@mui/material'

export const TaskCardSkeleton = () => {

  return (
    <Paper elevation={3} className='p-4'>
      <div className='flex gap-2 items-center'>
        <Skeleton variant='circular' height={20} width={20} />
        <Skeleton variant='text' className='text-xl' width={200} />
      </div>
      <Skeleton variant='text' height={20} />
    </Paper>
  )
}
