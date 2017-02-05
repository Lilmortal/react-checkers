import board from './modules/board'
import tile from './modules/tile'
import draught from './modules/draught'

const { watchBoardUpdates } = board.sagas
const { watchTileUpdates } = tile.sagas
const { watchDraughtUpdates } = draught.sagas

export default function* rootSaga() {
  yield [
    watchBoardUpdates(),
    watchTileUpdates(),
    watchDraughtUpdates()
  ]
}
