import styled from '@emotion/styled'
import { FC, ReactNode, useContext, useState } from 'react'
import { TreeAction } from 'src/models'
import { TreeDefaultValueCtx } from './context'

type TreeNodeProps = {
  actions: TreeAction[]
  name: string
  id: number
  children?: ReactNode
}

const TreeNodeStyled = styled.div`
  display: flex;
  gap: 4px;
  user-select: none;
  height: 24px;
`

const TreeNodeContent = styled.div<{ selected: boolean }>`
  display: flex;
  gap: 4px;
  background-color: ${({ selected }) => (selected ? '#eeeff8' : 'transparent')};
  flex-grow: 1;
  align-items: center;
`

const ExpandIconContainer = styled.svg<{ expanded: boolean }>`
  width: 20px;
  height: 20px;
  transform: rotate(${({ expanded }) => (expanded ? '0deg' : '-90deg')});
  transition: all 0.3ms;
  cursor: pointer;
`

export const TreeNode: FC<TreeNodeProps> = ({ children, name, id, actions }) => {
  const { setSelectedTreeNodeId, selectedTreeNodeId, refetchTree, setErrorText } =
    useContext(TreeDefaultValueCtx)
  const selected = selectedTreeNodeId === id
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    children && setExpanded((v) => !v)
    setSelectedTreeNodeId(id)
  }

  const notifyError = (e: string) => {
    setErrorText(`${e} (id = ${id}).`)
  }

  return (
    <>
      <TreeNodeStyled onClick={toggleExpanded}>
        <ExpandIconContainer
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          expanded={expanded}
        >
          {children && <path d='M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z' />}
        </ExpandIconContainer>
        <TreeNodeContent selected={selected}>
          {name}
          {selected &&
            actions.map((Action, i) => (
              <Action
                key={i}
                id={id}
                name={name}
                refetchTree={refetchTree}
                notifyError={notifyError}
              />
            ))}
        </TreeNodeContent>
      </TreeNodeStyled>
      {expanded && children}
    </>
  )
}
