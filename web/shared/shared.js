async function request(url, method, body) {
  return fetch(baseUrl + url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  }).then((response) => response.json())
}

let myAlertSuccess= document.getElementById("alert-success")
let myAlertError = document.getElementById("alert-error")

let myAlertSuccessLabel = document.getElementById("alert-success-label")
let myAlertErrorLabel = document.getElementById("alert-error-label")

function handleClick() {
    myAlertSuccess.classList.remove('show');
    myAlertError.classList.remove('show');
}

function alertErro(msg) {
  console.log('fellll')
  myAlertErrorLabel.innerHTML = msg
  myAlertError.classList.add("show");
}

function alertSuccess(msg) {
  myAlertSuccessLabel.innerHTML = msg
  myAlertSuccess.classList.add("show");
}

function logout() {
  document.cookie = "userType=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.removeItem("user_id");
  window.location.href = "/login";
}