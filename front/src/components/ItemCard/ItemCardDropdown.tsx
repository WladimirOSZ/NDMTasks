import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Item } from '../../types/ItemsTypes'
import ItemFormModal from '../ItemFormModal'
import { useState } from 'react'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEdit = () => {
    setIsModalOpen(true)
    handleClose()
  }

  return (
    <>
      <IconButton onClick={handleClick} aria-label='more' aria-controls='dropdown-menu' aria-haspopup='true'>
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
        <MenuItem onClick={handleClose} disableRipple>
          <InfoIcon />
          Details
        </MenuItem>
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <DoneAllIcon />
          Complete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu >

      {
        isModalOpen &&
        <ItemFormModal item={item} refetch={refetch} closeModal={() => setIsModalOpen(false)} />
      }
    </>
  )
}
