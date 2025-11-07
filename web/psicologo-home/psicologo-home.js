var psicologoId;
var consultaSelecionadaId;
var selectedRating;

const statusConsulta = [
  { id: 1, nome: "Cancelada" },
  { id: 2, nome: "Agendada" },
];

var triggerTabList = document.querySelectorAll(".tab-button");
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

new DevExpress.ui.dxDataGrid(
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
        type: "buttons",
        buttons: [
          {
            hint: "Cancelar consulta",
            icon: "close",
            disabled(e) {
               return e.row.data.status_consulta_id == 1;
            },
            onClick(e) {
              consultaId = e.row.data.id_consulta;
              request(cancelarConsulta + `/${consultaId}`, "PUT").then(
                (response) => {
                  if (response.status == "success") {
                    alertSuccess("Consulta cancelada com sucesso");
                  } else {
                    alertErro(response.errorMessage);
                  }
                }
              );
            },
          },
        ],
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
