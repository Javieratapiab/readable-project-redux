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
    byId: action.reduce((postObj, post) => {
      postObj[post.id] = postObj[post.id] || post;
      return postObj;
    }, {}),
    allIds: action.map(post => post.id)
  })
}

export function generateUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4();
}

