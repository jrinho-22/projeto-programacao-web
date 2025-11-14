var psicologoId;
var consultaSelecionadaId;
var selectedRating;

let especialidades = [];
especialidadesInit = async() => {
  await request(getAllEspecialidades, "GET").then((v) => {
    especialidades = v.data.map(v => {
      return {text: v.descricao, value: v.id_especialidade}
    })
  })
  grid.refresh()
  gridPsicologos.refresh()
}
especialidadesInit()

const statusConsulta = [
  { id: 1, nome: "Cancelada" },
  { id: 2, nome: "Agendada" },
  { id: 3, nome: "Concluida" },
];

var triggerTabList = document.querySelectorAll(".tab-button");
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

const grid = new DevExpress.ui.dxDataGrid(
  document.getElementById("consultas-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(
          getConsultas + `?userId=${localStorage.getItem("user_id")}`,
          "GET"
        ).then((response) => response.data),
    }),
    onRowPrepared: function (e) {
      if (e.rowType === "data") {
        const status = e.data.status_consulta_id;

        if (status === 1) {
          e.rowElement.addClass("row-cancelada");
        } else if (status === 2) {
          e.rowElement.addClass("row-confirmada");
        } else if (status === 3) {
          e.rowElement.addClass("row-concluida");
        }
      }
    },
    searchPanel: {
      visible: true,
      highlightCaseSensitive: false,
      placeholder: "Pesquisar...",
    },
    paging: {
      enabled: true,
      pageSize: 4,
    },
    columns: [
      {
        dataField: "id_consulta",
        caption: "id",
        allowEditing: false,
        visible: false,
      },
      {
        dataField: "especialidade_id",
        caption: "Especialidade",
        lookup: {
          dataSource: () => especialidades,
          valueExpr: "value",
          displayExpr: "text",
        }
      },
      {
        dataField: "data",
        caption: "Data",
        dataType: "date",
        sortOrder: "asc",
      },
      { dataField: "horario", caption: "Horario" },
      {
        dataField: "status_consulta_id",
        caption: "Status",
        lookup: {
          dataSource: statusConsulta,
          valueExpr: "id",
          displayExpr: "nome",
        },
      },
      {
        caption: "Ações",
        type: "buttons",
        buttons: [
          {
            disabled(e) {
              return e.row.data.status_consulta_id !== 3 
            },
            hint: "Avaliar consulta",
            icon: "favorites",
            onClick(e) {
              const btn = document.getElementById("avaliacaoModalTrigger");
              consultaSelecionadaId = e.row.data.id_consulta;
              btn.click();
            },
          },
          {
            disabled(e) {
              let today = new Date()
              let dataConsulta = new Date(e.row.data.data)
              return e.row.data.status_consulta_id !== 2 || today.getDate() <= dataConsulta.getDate();
            },
            hint: "Concluir Consulta",
            icon: "check",
            onClick: async(e) => {
              grid.beginCustomLoading();
              consultaId = e.row.data.id_consulta;
              await request(concluirConsulta + `/${consultaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              grid.refresh()
              grid.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                 alertSuccess("Consulta concluida com sucesso");
                r()
              }, 2000))
            },
          },
          {
            hint: "Cancelar consulta",
            icon: "close",
            disabled(e) {
              return e.row.data.status_consulta_id !== 2;
            },
            onClick: async(e) => {
              grid.beginCustomLoading();
              consultaId = e.row.data.id_consulta;
              await request(cancelarConsulta + `/${consultaId}`, "PUT").then(
                (response) => {
                  if (!response.status == "success") {
                    alertErro(response.errorMessage);
                  }
                }
              );
              grid.refresh()
              grid.endCustomLoading()
              await new Promise(r => setTimeout(() => {
                 alertSuccess("Consulta cancelada com sucesso");
                r()
              }, 2000))
            },
          },
        ],
      },
    ],
    showBorders: true,
  }
);

const gridPsicologos = new DevExpress.ui.dxDataGrid(
  document.getElementById("psicologos-tab-content-toshow"),
  {
    dataSource: new DevExpress.data.CustomStore({
      // key: "id_pessoa",
      load: () =>
        request(getPsicologo, "GET").then((response) => response.data),
    }),
    searchPanel: {
      visible: true,
      highlightCaseSensitive: false,
      placeholder: "Pesquisar...",
    },
    paging: {
      enabled: true,
      pageSize: 4,
    },
    columns: [
      {
        dataField: "id_pessoa",
        caption: "ID",
        width: 50,
        allowEditing: false,
        visible: false,
      },
      { dataField: "nome", caption: "Psicólogo" },
      { dataField: "email", caption: "Email" },
      { dataField: "crp", caption: "CRP" },
      {
        dataField: "especialidade_id",
        caption: "Especialidade",
        lookup: {
          dataSource: () => especialidades,
          valueExpr: "value",
          displayExpr: "text",
        }
      },
      { dataField: "valor_hora", caption: "Valor Hora" },
      {
        caption: "Ações",
        type: "buttons",
        buttons: [
          {
            hint: "Marcar Consulta",
            icon: "clock",
            onClick(e) {
              const btn = document.getElementById("consultaModalTrigger");
              psicologoId = e.row.data.id_pessoa;
              btn.click();
            },
          },
        ],
      },
    ],
    showBorders: true,
  }
);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

flatpickr("#dataConsulta", {
  minDate: yesterday,
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 6;
    },
  ],
});

function AgendarConsulta() {
  const dataConsultaValor = document.getElementById("dataConsulta");
  const horaConsultaValor = document.getElementById("hora");

  obj = {
    pacienteId: localStorage.getItem("user_id"),
    psicologoId: psicologoId,
    data: dataConsultaValor.value,
    hora: horaConsultaValor.value,
  };
  request(agendarConsulta, "POST", obj).then((response) => {
    if (response.status == "success") {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
      );
      modal.hide();
      alertSuccess("Consulta Agendada com sucesso");
      document.getElementById("psicologo-tab").click();
      setTimeout(() => grid.refresh(), 1000);
    } else {
      alertErro(response.errorMessage);
    }
  });
}

document.querySelectorAll('input[name="rating"]').forEach((input) => {
  input.addEventListener("change", function () {
    selectedRating = this.value;
  });
});

function ConfirmarAvaliacao() {
  const comentarioValor = document.getElementById("avaliacao-comentario");

  obj = {
    consultaId: consultaSelecionadaId,
    avaliacao: selectedRating,
    comentario: comentarioValor.value,
  };
  request(registrarAvaliacao, "POST", obj).then((response) => {
    if (response.status == "success") {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("avaliacaoModal")
      );
      modal.hide();
      alertSuccess("Avaliação enviada com sucesso");
    } else {
      alertErro(response.errorMessage);
    }
  });
}
