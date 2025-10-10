  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    loginRequest()
  });

let myAlertSuccess= document.getElementById("alert-sucesso")
let myAlertError = document.getElementById("alert-error")
let alertElements = document.querySelectorAll(".alert-msg");

function handleClick() {
    myAlertSuccess.classList.remove('show');
    myAlertError.classList.remove('show');
}

const loginRequest = async() => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await request(userLogin, 'POST', {
            username: username,
            password: password
        }
    )

    if (response.status = 'error' && response.errorMessage) {
        console.log(response)
        alertElements.forEach((el) => {
            el.innerHTML = response.errorMessage;
        }); 
        myAlertError.classList.add("show");
    }

    if (response.redirect) {
        window.location.href = response.redirect
    }
}