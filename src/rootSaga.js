//import tile from './modules/tile'
import draught from './modules/draught'

//const { watchTileUpdates } = tile.sagas
const { watchDraughtUpdates } = draught.sagas

export default function* rootSaga() {
  yield [
    //watchTileUpdates(),
    watchDraughtUpdates()
  ]
}
