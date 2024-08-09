import { Tree } from 'src/models'

const basePath = 'https://test.vmarmysh.com'

const fetcher = (...params: Parameters<typeof fetch>) => fetch(...params)

export const userTreeGet = (treeName: string): Promise<Tree> =>
  fetcher(`${basePath}/api.user.tree.get?treeName=${treeName}`, {
    method: 'post',
  }).then((r) => r.json())

export const userTreeNodeCreate = ({
  treeName,
  nodeName,
  parentNodeId,
}: {
  treeName: string
  parentNodeId: number
  nodeName: string
}) =>
  fetcher(
    `${basePath}/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
    {
      method: 'post',
    },
  ).then((r) => {
    if (!r.ok) {
      return r.json().then((e) => {
        throw Error(e?.data?.message || 'Something goes wrong...')
      })
    }
  })

export const userTreeNodeRename = ({
  treeName,
  newNodeName,
  nodeId,
}: {
  treeName: string
  nodeId: number
  newNodeName: string
}) =>
  fetcher(
    `${basePath}/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`,
    {
      method: 'post',
    },
  ).then((r) => {
    if (!r.ok) {
      return r.json().then((e) => {
        throw Error(e?.data?.message || 'Something goes wrong...')
      })
    }
  })

export const userTreeNodeDelete = ({ treeName, nodeId }: { treeName: string; nodeId: number }) =>
  fetcher(`${basePath}/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`, {
    method: 'post',
  }).then((r) => {
    if (!r.ok) {
      return r.json().then((e) => {
        throw Error(e?.data?.message || 'Something goes wrong...')
      })
    }
  })
