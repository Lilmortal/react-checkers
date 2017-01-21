import { watchUpdateTiles } from './modules/tile/tileRootSaga'

export default function* rootSaga() {
  yield [
    watchUpdateTiles()
  ]
}
