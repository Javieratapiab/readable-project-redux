import moment from 'moment';

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function datetimeFormat (timestamp) {
  return moment(timestamp).format('LLL');
}

export function empty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
        return false;
    }
  }
  return true;
}

export function mapKeys(action, state) {
  return Object.assign({}, state, {
    byId: action.payload.reduce((postObj, post) => {
      postObj[post.id] = postObj[post.id] || post;
      return postObj;
    }, {}),
    allIds: action.payload.map(post => post.id)
  })
}
