import CloseIcon from '@mui/icons-material/Close'
import { Item } from '../types/ItemsTypes'
import GET_ITEM, { GetItemDetails } from '../graphql/queries/get_item'
import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import { capitalizeFirstLetter, formatDate } from '../helpers/functions'
import { useParams } from 'react-router-dom'

type ItemDetailsModalProps = {
  item: Item
  closeModal: () => void
}

export default function ItemDetailsModal({ item, closeModal }: ItemDetailsModalProps) {
  const { token } = useParams<{ token: string }>()
  const { loading, error, data } = useQuery<GetItemDetails>(GET_ITEM, {
    variables: { id: item.id, listToken: token }
  })

  if (loading) return <CircularProgress />

  const itemDetails = data?.getItem

  return (
    <>
      <div
        className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center backdrop-blur-sm transition-opacity duration-300'
        onClick={closeModal}
        data-testid='item-details-modal'
      >
        <div
          className='relative m-4 p-6 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] max-w-[700px] rounded-lg bg-white shadow-lg'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex shrink-0 items-center justify-between pb-4 text-xl font-medium text-slate-800'>
            Task Details
            <CloseIcon
              onClick={closeModal}
              className='cursor-pointer text-slate-600 hover:text-slate-800'
            />
          </div>
          <div className='relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <div>
                  <span className='font-semibold'>Name:</span> {item.name}
                </div>
                <div>
                  <span className='font-semibold'>Description:</span> {item.description}
                </div>
                <div>
                  <span className='font-semibold'>Status:</span> {capitalizeFirstLetter(item.status)}
                </div>
              </div>
              {itemDetails && (
                <div className='flex flex-col gap-2'>
                  <div>
                    <span className='font-semibold'>Created at:</span> {formatDate(itemDetails.createdAt)}
                  </div>
                  <div>
                    <span className='font-semibold'>Last update:</span> {formatDate(itemDetails.updatedAt)}
                  </div>
                </div>
              )}

              {error && <div className='text-red-500'>Error getting details</div>}
            </div>
          </div>
        </div>
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
          onClick={closeModal}
          className='rounded-md bg-green-600 py-2 px-4 border border-transparent text-center cursor-pointer text-sm
                           text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700
                           hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
          type='button'
        >
          Close
        </button>
      </div>
    </>
  )
}
