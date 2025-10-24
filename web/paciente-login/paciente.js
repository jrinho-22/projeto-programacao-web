function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(el => el.classList.add('hide'))
  document.getElementById(id).classList.remove(['hide'])
}

const form = document.getElementById("form-cadastro")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputs = form.querySelectorAll('input')

    let obj = {}
    inputs.forEach(input => {
        obj[input.name] = input.value
    });

    request(pacienteSaveUpdate, "PUT", obj).then((response) => {
        if (response.status == "success"){
            window.location.href = 'paciente-home'
        }
    })  
})

const formLogin = document.getElementById("form-login")
formLogin.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputs = formLogin.querySelectorAll('input')

    let obj = {}
    inputs.forEach(input => {
        obj[input.name] = input.value
    });
    obj.tipo = 1

    request(userLogin, "POST", obj).then((response) => {
        if (response.status == "success"){
            window.location.href = 'paciente-home'
        }
    })  
})

