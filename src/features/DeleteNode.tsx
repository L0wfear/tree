import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { TreeAction } from 'src/models'
import { userTreeNodeDelete } from '../api'
import { useMediaQuery } from '@mui/material'
import styled from '@emotion/styled'

type Status = 'IDLE' | 'SUCCESS' | 'FAILURE'

const DialogContent = styled(MuiDialogContent)`
  padding: 16px;
  @media (min-width: 765px) {
    width: 500px;
    min-width: 500px;
  }
`

export const DeleteNode: TreeAction = ({ id, notifyError, refetchTree, name }) => {
  const isSmallScreen = useMediaQuery(`(max-width: 764px)`)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>()
  const [status, setStatus] = useState<Status>('IDLE')

  const onClose = () => {
    setError(undefined)
    setOpen(false)
    setStatus('IDLE')
  }

  const handleSubmit = () => {
    userTreeNodeDelete({
      treeName: import.meta.env.VITE_TREE_ID,
      nodeId: id,
    })
      .then(() => {
        setStatus('SUCCESS')
        refetchTree()
        onClose()
      })
      .catch((e) => {
        setError(e?.message || 'Something goes wrong...')
        setStatus('FAILURE')
        notifyError(e?.message || 'Something goes wrong...')
      })
  }

  const dialogContent = {
    IDLE: <Typography variant='body1'>Do you want to delete {name}?</Typography>,
    SUCCESS: <Typography variant='body1'>Deleted</Typography>,
    FAILURE: <Typography variant='body1'>{error}</Typography>,
  }

  const dialogActions = {
    IDLE: (
      <>
        <Button onClick={onClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='outlined' color='error'>
          Delete
        </Button>
      </>
    ),
    SUCCESS: (
      <Button onClick={onClose} variant='outlined' fullWidth>
        Close
      </Button>
    ),
    FAILURE: (
      <Button onClick={onClose} variant='outlined' fullWidth>
        Close
      </Button>
    ),
  }

  return (
    <>
      {name !== import.meta.env.VITE_TREE_ID && (
        <IconButton
          color='primary'
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
          style={{ padding: 0 }}
        >
          <DeleteForeverIcon color='error' />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isSmallScreen}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent dividers>{dialogContent[status]}</DialogContent>
        <DialogActions>{dialogActions[status]}</DialogActions>
      </Dialog>
    </>
  )
}
