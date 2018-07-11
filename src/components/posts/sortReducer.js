import  { POSTS_ORDER_BY } from '../globalActions';

export default function (state = 'date', action) {
  switch (action.type) {
      case POSTS_ORDER_BY:
          return action.payload
      default:
          return state;
  }
}