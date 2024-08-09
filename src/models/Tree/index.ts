import { FC } from 'react'

export type Tree = {
  children: Tree[]
  id: number
  name: string
}

export type TreeAction = FC<
  Pick<Tree, 'id' | 'name'> & {
    refetchTree: () => void
    notifyError: (message: string) => void
  }
>
