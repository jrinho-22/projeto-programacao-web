function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(el => el.classList.add('hide'))
  document.getElementById(id).classList.remove(['hide'])
}

const form = document.getElementById("form-cadastro")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputs = form.querySelectorAll('input')
    const selects = form.querySelectorAll('select')
    const allFields = [...inputs, ...selects];

    let obj = {}
    allFields.forEach(input => {
        obj[input.name] = input.value
    });

    request(psicologoSaveUpdate, "PUT", obj).then((response) => {
        if (response.status == "success"){
            window.location.href = '/psicologo-home'
        } else {
            alertErro(response.errorMessage)
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
            localStorage.setItem("user_id", response.data.id_login);
            window.location.href = '/paciente-home'
        } else {
            alertErro(response.errorMessage)
        }
    })  
})


request(getAllEspecialidades, "GET").then((response) => {
  if (response.status == "success") {
    const select = document.getElementById("especialidadeSelect");

    // Limpa opções anteriores, se houver
    select.innerHTML = '<option value="">Selecione uma especialidade</option>';

    // Adiciona cada especialidade como uma opção
    response.data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id_especialidade; // ou outro campo de ID, se houver
      option.textContent = item.descricao;
      select.appendChild(option);
    });
  } else {
    alertErro(response.errorMessage);
  }
});