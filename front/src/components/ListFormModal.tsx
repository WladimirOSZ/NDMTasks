import { useMutation } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { List } from '../types/ListType'
import CREATE_LIST from '../graphql/mutations/create_list'
import { useNavigate } from 'react-router-dom'

type ListForm = {
  name: string
}

type ListFormModal = {
  list?: List
  closeModal: () => void
}

export default function ListFormModal({ closeModal }: ListFormModal) {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      name: '',
    }
  })
  const navigate = useNavigate()

  const [createList, { loading }] = useMutation(CREATE_LIST, {
    onCompleted: (data) => {
      navigate(`/${data.createList.token}`)
    }
  })

  const onSubmit: SubmitHandler<ListForm> = (data) => {
    if (loading) return
    createList({
      variables: {
        name: data.name
      }
    })
  }

  return (
    <>
      <div
        className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center backdrop-blur-sm transition-opacity duration-300'
        onClick={closeModal}
        data-testid='list-form-modal'
      >
        <div
          className='relative m-4 p-6 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] max-w-[700px] rounded-lg bg-white shadow-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex shrink-0 items-center justify-between pb-4 text-xl font-medium text-slate-800'>
            First, create a new List
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
                  data-cy='list-title-input'
                />
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
              Create List
              {loading && <CircularProgress size={16} className='ms-2' />}
            </button>
          </div>
        </div >
      </div >
    </>
  )
}
