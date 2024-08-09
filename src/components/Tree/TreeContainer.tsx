import { FC, useCallback, useEffect, useState } from 'react'
import { Tree } from './Tree'
import { userTreeGet } from '../../api'
import { TreeAction, Tree as TreeModel } from 'src/models'
import { TreeCtxProvider } from './context'
import { ErrorNotification } from './ErrorNotification'

type TreeProps = {
  actions: TreeAction[]
}

export const TreeContainer: FC<TreeProps> = ({ actions }) => {
  const [tree, setTree] = useState<TreeModel>()
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState<number>()
  const [errorText, setErrorText] = useState<string>()

  const fetchTree = useCallback(() => {
    userTreeGet(import.meta.env.VITE_TREE_ID).then(setTree)
  }, [])

  useEffect(() => {
    fetchTree()
  }, [])

  return (
    <TreeCtxProvider
      value={{
        setSelectedTreeNodeId,
        refetchTree: fetchTree,
        selectedTreeNodeId,
        setErrorText,
        errorText,
      }}
    >
      <ErrorNotification />
      {tree && <Tree tree={[tree]} actions={actions} />}
    </TreeCtxProvider>
  )
}
