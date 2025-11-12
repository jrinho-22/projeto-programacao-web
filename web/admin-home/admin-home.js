// const username = document.getElementById("adicionar-paciente");
// username.addEventListener("click", () => {
//   window.location.href = "/paciente/cadastro";
// });

// var triggerTabList = document.querySelectorAll(".tab-button")
// triggerTabList.forEach(function (triggerEl) {
//   var tabTrigger = new bootstrap.Tab(triggerEl);

//   triggerEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     tabTrigger.show();
//   });
// });

const especialidades = [
  { value: 1, text: "Psicologia Clínica" },
  { value: 2, text: "Psicologia Escolar" },
  { value: 3, text: "Psicanálise" },
  { value: 4, text: "Neuropsicologia" },
  { value: 5, text: "Psicologia do Esporte" },
];

gridPaciente = new DevExpress.ui.dxDataGrid(
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
        return request(pacienteUpdate, "PUT", payload).then((response) => {
          if (response.status == "success") {
            alertSuccess("Item editado com <strong>sucesso</strong>");
          } else {
            alertErro(response.errorMessage);
          }
        });
      },
    }),
    columns: [
      { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
      { dataField: "cpf", caption: "CPF", allowEditing: false },
      { dataField: "nome", caption: "Name" },
      { dataField: "email", caption: "Email" },
      { dataField: "idade", caption: "Idade",  alignment: "left" },
      {
        caption: "Ações",
        type: "buttons",
        buttons: [
          "edit",
          {
            hint: "Inativar Paciente",
            icon: "unlock",
            visible: (e) => e.row.data.status == 1,
            onClick: async(e) => {
              gridPaciente.beginCustomLoading();
              pessoaId = e.row.data.id_pessoa;
              await request(inativarCadastro + `/${pessoaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              gridPaciente.refresh()
              gridPaciente.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                alertSuccess("Cadastro inativado com sucesso");
                r()
              }, 2000))
            },
          },
          {
            hint: "Ativar Paciente",
            icon: "lock",
            visible: (e) => e.row.data.status == 0,
            onClick: async(e) => {
              gridPaciente.beginCustomLoading();
              pessoaId = e.row.data.id_pessoa;
              await request(ativarCadastro + `/${pessoaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              gridPaciente.refresh()
              gridPaciente.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                alertSuccess("Cadastro ativado com sucesso");
                r()
              }, 2000))
            },
          },
        ],
      },
    ],
    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
      allowDeleting: true,
    },
  }
);

grid = new DevExpress.ui.dxDataGrid(
  document.getElementById("psicologo-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () => request(getPsicologo, "GET").then((response) => response.data),
      update: (key, values) => {
        let payload = {
          ...key,
          ...values,
        };
        return request(psicologoUpdate, "PUT", payload).then((response) => {
          if (response.status == "success") {
            alertSuccess("Item editado com <strong>sucesso</strong>");
          } else {
            alertErro(response.errorMessage);
          }
        });
      },
    }),
    columns: [
      { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
      { dataField: "crp", caption: "CRP", allowEditing: false },
      { dataField: "nome", caption: "Name" },
      { dataField: "email", caption: "Email" },
      { dataField: "valor_hora", caption: "Valor Hora" },
      {
        dataField: "especialidade_id",
        caption: "Especialidade",
        lookup: {
          dataSource: especialidades,
          valueExpr: "value",
          displayExpr: "text",
        },
      },
      {
        caption: "Ações",
        type: "buttons",
        buttons: [
          "edit",
          {
            hint: "Inativar Psicologo",
            icon: "unlock",
            visible: (e) => e.row.data.status == 1,
            onClick: async(e) => {
              grid.beginCustomLoading();
              pessoaId = e.row.data.id_pessoa;
              await request(inativarCadastro + `/${pessoaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              grid.refresh()
              grid.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                alertSuccess("Cadastro inativado com sucesso");
                r()
              }, 2000))
            },
          },
          {
            hint: "Ativar Psicologo",
            icon: "lock",
            visible: (e) => e.row.data.status == 0,
            onClick: async(e) => {
              grid.beginCustomLoading();
              pessoaId = e.row.data.id_pessoa;
              await request(ativarCadastro + `/${pessoaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              grid.refresh()
              grid.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                alertSuccess("Cadastro ativado com sucesso");
                r()
              }, 2000))
            },
          },
        ],
      },
    ],
    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
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
