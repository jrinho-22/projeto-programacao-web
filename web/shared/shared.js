async function request(url, method, body) {
  return fetch(baseUrl + url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  }).then((response) => response.json())  
}