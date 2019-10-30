import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM
} from '../actions/types';
import moment from 'moment';

const initialState = {
  items: [],
  loading: false,
  currentDate: moment()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_ITEM:
      const updatedItem = action.payload;
      console.log(updatedItem);
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.id
            ? {
                ...item,
                name: action.payload.item.name,
                rdate: action.payload.item.rdate
              }
            : item
        )
      };
    default:
      return state;
  }
}
