var psicologoId;
var consultaSelecionadaId;
var selectedRating;

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
          getConsultas + `?psicologoId=${localStorage.getItem("user_id")}`,
          "GET"
        ).then((response) => {
          response.data;

          if (response.data.length === 0) {
            setTimeout(() => {
              $("#consultas-tab-content-toshow")
                .dxDataGrid("instance")
                .repaint();
            });
          }

          return response.data;
        }),
    }),
    noDataText: "Nenhuma consulta encontrada para este psicólogo.",
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
    columns: [
      {
        dataField: "id_consulta",
        caption: "id",
        allowEditing: false,
        visible: false,
      },
      { dataField: "data", caption: "Data", dataType: "date" },
      { dataField: "horario", caption: "Horario" },
      { dataField: "nome", caption: "Paciente" },
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
              let today = new Date();
              let dataConsulta = new Date(e.row.data.data);
              return (
                e.row.data.status_consulta_id !== 2 ||
                today.getDate() <= dataConsulta.getDate()
              );
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
              return e.row.data.status_consulta_id != 2;
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
    searchPanel: {
      visible: true,
      highlightCaseSensitive: false,
      placeholder: "Pesquisar...",
    },
    paging: {
      enabled: true,
      pageSize: 4,
    },
  }
);

var avaliacoesRes = request(
  getAvaliacao + `?psicologoId=${localStorage.getItem("user_id")}`,
  "GET"
).then((v) => {
  const container = document.getElementById("avaliacoes-container");

  v.data.forEach((item) => {
    const isBad = item.avaliacao <= 2;
    const card = document.createElement("div");
    card.className = `card card-avaliacao ${isBad ? "bad" : "good"}`;

    card.innerHTML = `
    <div class="card-header">
      ${item.nomePaciente}
    </div>
    <div class="card-body">
      <p class="avaliacao-num">Avaliação: ${item.avaliacao}</p>
      <p class="card-text">${item.comentario}</p>
    </div>
  `;

    container.appendChild(card);
  });
});
