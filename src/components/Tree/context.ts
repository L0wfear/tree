import { createContext } from 'react'
import { Tree } from 'src/models'

export type TablesValuesType = {
  [key: string]: { [key: string]: { attributes?: string[]; type?: string } }
}
export type TableRowData = {
  [key: string]: string | number
}
export type TreeContext = {
  setSelectedTreeNodeId: React.Dispatch<React.SetStateAction<number | undefined>>
  refetchTree: () => void
  setErrorText: (v?: string) => void
  selectedTreeNodeId?: number
  errorText?: string
}

export const TreeDefaultValueCtx = createContext<TreeContext>({
  refetchTree: () => {},
  setSelectedTreeNodeId: () => {},
  setErrorText: () => {},
})

export const TreeCtxProvider = TreeDefaultValueCtx.Provider
