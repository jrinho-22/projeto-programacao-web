// const username = document.getElementById("adicionar-paciente");
// username.addEventListener("click", () => {
//   window.location.href = "/paciente/cadastro";
// });

let myAlertSuccess = document.getElementById("alert-sucesso");
let myAlertError = document.getElementById("alert-error");
let alertElements = document.querySelectorAll(".alert-msg");

function eraseAlerts() {
  myAlertSuccess.classList.remove("show");
  myAlertError.classList.remove("show");
}

// var triggerTabList = document.querySelectorAll(".tab-button")
// triggerTabList.forEach(function (triggerEl) {
//   var tabTrigger = new bootstrap.Tab(triggerEl);

//   triggerEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     tabTrigger.show();
//   });
// });

new DevExpress.ui.dxDataGrid(
  document.getElementById("paciente-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(getPacientes, "GET").then((response) => response.data),
      update: (key, values) => {
        let payload = {
          ...key,
          ...values,
        };
        eraseAlerts();
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
        eraseAlerts();
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
  }
);

new DevExpress.ui.dxDataGrid(
  document.getElementById("psicologo-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(getPsicologo, "GET").then((response) => response.data),
      update: (key, values) => {
        let payload = {
          ...key,
          ...values,
        };
        eraseAlerts();
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
        eraseAlerts();
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
  }
);

request(getAllAvaliacao, "GET").then((v) => {
  
  const medias = v.data.map(v => v.mediaAvaliacao) 
  const psicologos = v.data.map(v => v.nomePsicologo) 
  const cores = medias.map((nota) => (nota < 3.5 ? "#dc3545" : "#0d6efd"));

  const ctx = document.getElementById("graficoPsicologos").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: psicologos,
      datasets: [
        {
          label: "Média de Avaliação",
          data: medias,
          backgroundColor: cores,
          borderRadius: 5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          title: {
            display: true,
            text: "Nota Média",
          },
        },
        x: {
          title: {
            display: true,
            text: "Psicólogos",
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Nota: ${ctx.parsed.y}`,
          },
        },
      },
    },
  });
});
