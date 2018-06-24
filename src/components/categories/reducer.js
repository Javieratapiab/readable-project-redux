export default function (state = [], action) {
  switch (action.type) {
    case 'FETCH_ALL_CATEGORIES':
      const { categories } = action
      return {
        ...state,
        categories,
      }
    default:
      return state;
  }
}