import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Item } from '../../types/ItemsTypes'
import ItemFormModal from '../ItemFormModal'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import DELETE_ITEM from '../../graphql/mutations/delete_item'
import COMPLETE_ITEM from '../../graphql/mutations/complete_item'
import ItemDetailsModal from '../ItemDetailsModal'
import { useParams } from 'react-router-dom'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    }
  },
}))

type ItemCardDropdownProps = {
  item: Item
  refetch: () => void
}

export default function ItemCardDropdown({ item, refetch }: ItemCardDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const open = Boolean(anchorEl)
  const { token } = useParams<{ token: string }>()

  const [deleteItem, { loading }] = useMutation(DELETE_ITEM, {
    onCompleted: () => {
      refetch()
    },
  })

  const [completeItem, { loading: completeLoading }] = useMutation(COMPLETE_ITEM, {
    onCompleted: () => {
      refetch()
    },
  })

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEdit = () => {
    setIsEditModalOpen(true)
    handleClose()
  }

  const handleDetails = () => {
    setIsDetailsModalOpen(true)
    handleClose()
  }

  const handleDelete = () => {
    deleteItem({
      variables: {
        id: item.id,
        listToken: token
      }
    })
  }

  const handleComplete = () => {
    completeItem({
      variables: {
        id: item.id,
        listToken: token
      }
    })
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label='more' aria-controls='dropdown-menu' aria-haspopup='true'>
        <MoreVertIcon />
      </IconButton>

      <StyledMenu
        id='dropdown-menu'
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDetails} disableRipple>
          <InfoIcon />
          Details
        </MenuItem>
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        {item.status === 'pending' && (
          <MenuItem onClick={handleComplete} disableRipple>
            <DoneAllIcon />
            {completeLoading ? 'Completing...' : 'Complete'}
          </MenuItem>
        )}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          {loading ? 'Deleting...' : 'Delete'}
        </MenuItem>
      </StyledMenu >

      {isEditModalOpen && <ItemFormModal item={item} refetch={refetch} closeModal={() => setIsEditModalOpen(false)} />}

      {isDetailsModalOpen && <ItemDetailsModal item={item} closeModal={() => setIsDetailsModalOpen(false)} />}
    </>
  )
}
