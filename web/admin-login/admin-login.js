function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(el => el.classList.add('hide'))
  document.getElementById(id).classList.remove(['hide'])
}

const formLogin = document.getElementById("form-login")
formLogin.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputs = formLogin.querySelectorAll('input')

    let obj = {}
    inputs.forEach(input => {
        obj[input.name] = input.value
    });
    obj.tipo = 3

    request(userLogin, "POST", obj).then((response) => {
        if (response.status == "success"){
            localStorage.setItem("user_id", response.data.id_login);
            document.cookie = "userType=3; path=/";
            window.location.href = '/admin-home'
        } else {
            alertErro(response.errorMessage)
        }
    })  
})

