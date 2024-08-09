import { Tree } from './components'
import { AddNode } from './features/AddNode'
import { DeleteNode } from './features/DeleteNode'
import { RenameNode } from './features/RenameNode'

export const App = () => <Tree actions={[AddNode, RenameNode, DeleteNode]} />
