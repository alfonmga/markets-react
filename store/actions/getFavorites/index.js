import { Actions } from '../../../constants'

export const getFavorites = symbols => {
  return {
    type: Actions.GET_FAVORITES,
    payload: {
      request: {
        url: `/stock/market/batch?symbols=${symbols.join()}&types=quote`
      }
    }
  }
}
