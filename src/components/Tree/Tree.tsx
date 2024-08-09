import { FC } from 'react'
import { TreeAction, Tree as TreeModel } from 'src/models'
import styled from '@emotion/styled'
import { TreeNode } from './TreeNode'

type TreeProps = {
  tree: TreeModel[]
  actions: TreeAction[]
}

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 12px;
`

export const Tree: FC<TreeProps> = ({ tree, actions }) => {
  return tree.length ? (
    <TreeContainer>
      {tree.map(({ children, id, name }) => (
        <TreeNode id={id} name={name} key={id} actions={actions}>
          {children.length ? <Tree tree={children} actions={actions} /> : null}
        </TreeNode>
      ))}
    </TreeContainer>
  ) : null
}
