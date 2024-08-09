import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { IconButton, TextField, Typography } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { TreeAction } from 'src/models'
import { userTreeNodeCreate } from '../api'
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

export const AddNode: TreeAction = ({ id, notifyError, refetchTree }) => {
  const isSmallScreen = useMediaQuery(`(max-width: 764px)`)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>()
  const [nodeName, setNodeName] = useState('')
  const [status, setStatus] = useState<Status>('IDLE')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNodeName(e.currentTarget.value)
  }

  const onClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    userTreeNodeCreate({
      treeName: import.meta.env.VITE_TREE_ID,
      nodeName,
      parentNodeId: id,
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

  useLayoutEffect(() => {
    if (open) {
      setNodeName('')
      setStatus('IDLE')
      setError(undefined)
    }
  }, [open])

  const dialogContent = {
    IDLE: (
      <TextField
        label='Node Name'
        variant='outlined'
        onChange={onChange}
        value={nodeName}
        fullWidth
      />
    ),
    SUCCESS: <Typography variant='body1'>Created</Typography>,
    FAILURE: <Typography variant='body1'>{error}</Typography>,
  }

  const dialogActions = {
    IDLE: (
      <>
        <Button onClick={onClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained'>
          Add
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
      <IconButton
        color='primary'
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
        style={{ padding: 0 }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isSmallScreen}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Add</DialogTitle>
        <DialogContent dividers>{dialogContent[status]}</DialogContent>
        <DialogActions>{dialogActions[status]}</DialogActions>
      </Dialog>
    </>
  )
}
