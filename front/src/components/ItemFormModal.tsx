import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CREATE_ITEM from '../graphql/mutations/create_item';
import UPDATE_ITEM from '../graphql/mutations/update_item';
import { Item } from '../types/ItemsTypes';

const getDefaultValues = (item?: Item) => {
  if (!item) return {
    name: '',
    description: '',
    status: 'pending'
  }

  return {
    name: item.name,
    description: item.description,
    status: item.status
  }
}

type ItemForm = {
  name: string
  description: string
  status: string
}

type ItemFormModal = {
  item?: Item
  closeModal: () => void
  refetch: () => void
}

export default function ItemFormModal({ item, closeModal, refetch }: ItemFormModal) {
  const { register, handleSubmit, control, formState: { errors }, } = useForm({
    defaultValues: getDefaultValues(item)
  })
  const isUpdate = Boolean(item)

  const [createOrUpdateItem, { loading }] = useMutation(isUpdate ? UPDATE_ITEM : CREATE_ITEM, {
    onCompleted: () => {
      closeModal()
      refetch()
    },
  })

  const onSubmit: SubmitHandler<ItemForm> = (data) => {
    createOrUpdateItem({
      variables: {
        id: item?.id,
        name: data.name,
        description: data.description,
        status: data.status
      }
    })
  }

  return (
    <>
      <div
        className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center backdrop-blur-sm transition-opacity duration-300'
        onClick={closeModal}
        data-testid='item-form-modal'
      >
        <div
          className='relative m-4 p-6 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] max-w-[700px] rounded-lg bg-white shadow-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex shrink-0 items-center justify-between pb-4 text-xl font-medium text-slate-800'>
            {isUpdate ? 'Update Task' : 'Create a new Task'}
            <CloseIcon
              onClick={closeModal}
              className='cursor-pointer text-slate-600 hover:text-slate-800'
            />
          </div>
          <div className='relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-4'>
                <TextField
                  {...register('name', {
                    required: 'Title is a required field'
                  })}
                  label='Title'
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message || ''}
                />
                <TextField
                  {...register('description')}
                  label='Description'
                  variant='outlined'
                  fullWidth
                  multiline
                  rows={4}
                  className='mt-4'
                />

                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select labelId="status-label" {...field} label="Status">
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
            </form>
          </div>
          <div className='flex shrink-0 flex-wrap items-center pt-4 justify-end'>
            <button
              onClick={closeModal}
              className='rounded-md border border-transparent py-2 px-4 text-center text-sm cursor-pointer transition-all text-slate-600
                           hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className='rounded-md bg-green-600 py-2 px-4 border border-transparent text-center cursor-pointer text-sm
                           text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700
                           hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
              type='submit'
              data-testid='submit-button'
            >
              {isUpdate ? 'Update' : 'Create'} Task
              {loading && <CircularProgress size={16} className='ms-2' />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
