const username = document.getElementById("adicionar-paciente");
username.addEventListener("click", () => {
  window.location.href = "/paciente/cadastro";
});

let myAlertSuccess = document.getElementById("alert-sucesso");
let myAlertError = document.getElementById("alert-error");
let alertElements = document.querySelectorAll(".alert-msg");

function eraseAlerts() {
  myAlertSuccess.classList.remove("show");
  myAlertError.classList.remove("show");
}

new DevExpress.ui.dxDataGrid(document.getElementById("gridContainer"), {
  dataSource: new DevExpress.data.CustomStore({
    // key: "id_pessoa",
    load: () => request(getPacientes, "GET").then((response) => response.data),
    update: (key, values) => {
      let payload = {
        ...key,
        ...values,
      };
      eraseAlerts()
      return request(pacienteSaveUpdate, "PUT", payload).then((response) => {
        if (response.status == "success") {
          alertElements.forEach((el) => {
            el.innerHTML = "Item editado com <strong>sucesso</strong>";
          });
          myAlertSuccess.classList.add("show");
        } else {
          alertElements.forEach((el) => {
            el.innerHTML = response.errorMessage;
          });
          myAlertError.classList.add("show");
        }
      });
    },
    insert: (key, values) => {
      let payload = {
        ...key,
        ...values,
      };
      eraseAlerts()
      return request(pacienteSaveUpdate, "PUT", payload).then((response) => {
        if (response.status == "success") {
          alertElements.forEach((el) => {
            el.innerHTML = "Item inserido com <strong>sucesso</strong>";
          });
          myAlertSuccess.classList.add("show");
        } else {
          alertElements.forEach((el) => {
            el.innerHTML = response.errorMessage;
          });
          myAlertError.classList.add("show");
        }
      });
    },
  }),
  columns: [
    { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
    { dataField: "nome", caption: "Name" },
    { dataField: "email", caption: "Email" },
    {
      dataField: "tipo",
      caption: "Tipo",
      lookup: {
        dataSource: [
          { value: 2, text: "Psicologo" },
          { value: 1, text: "Paciente" },
        ],
        valueExpr: "value",
        displayExpr: "text",
      },
    },
  ],
  showBorders: true,
  editing: {
    mode: "row",
    allowUpdating: true,
    allowAdding: true,
    allowDeleting: true,
  },
});
