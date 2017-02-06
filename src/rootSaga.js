import boardModule from './modules/board'
import tileModule from './modules/tile'
import draughtModule from './modules/draught'

const { watchBoardUpdates } = boardModule.sagas
const { watchTileUpdates } = tileModule.sagas
const { watchDraughtUpdates } = draughtModule.sagas

export default function* rootSaga() {
  yield [
    watchBoardUpdates(),
    watchTileUpdates(),
    watchDraughtUpdates()
  ]
}
