// Get all categories
export function fetchAll() {
  const headers = { "Authorization": "whatever-you-want" }
  return fetch(`http://localhost:3001/categories`, { headers: headers })
    .then((res) => res.json())
}
