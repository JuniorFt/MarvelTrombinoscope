import {
  REQUEST_HEROES_DATA,
  RECEIVE_HEROES_DATA,
  SELECT_HERO,
  GET_LIST_FOR_ONE
} from '../actions'

const initialState = {
  isFetching: false,
  items: [],
  errImg: [],
  selectedHero: null,
};

export default function heroes(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HEROES_DATA:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_HEROES_DATA:
      return {
        ...state,
        isFetching: false,
        items: action.heroes,
      }
    case SELECT_HERO:
      return {
        ...state,
        selectedHero: action.hero
      }
    case GET_LIST_FOR_ONE:
      return {
        ...state,
        selectedHero: action.hero,
        items: action.heroes
      }
    default:
      return state
  }
}
