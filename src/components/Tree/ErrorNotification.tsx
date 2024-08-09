import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext } from 'react'
import { TreeDefaultValueCtx } from './context'

const ErrorNotificationContainer = styled.div`
  position: absolute;
  top: 1%;
  right: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  background: #d7e5ff;
  align-items: center;
  justify-content: space-between;
`

const ErrorText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: #153155;
`

export const ErrorNotification = () => {
  const { setErrorText, errorText } = useContext(TreeDefaultValueCtx)
  return (
    errorText && (
      <ErrorNotificationContainer>
        <ErrorText>{errorText}</ErrorText>
        <IconButton
          color='primary'
          onClick={(e) => {
            e.stopPropagation()
            setErrorText()
          }}
          style={{ padding: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </ErrorNotificationContainer>
    )
  )
}
