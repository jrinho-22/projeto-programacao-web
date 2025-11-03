var psicologoId;
var consultaSelecionadaId;
var selectedRating;

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
        ).then((response) => response.data),
    }),
    columns: [
      { dataField: "id_pessoa", caption: "ID", width: 50, allowEditing: false },
      { dataField: "data", caption: "Data" },
      { dataField: "horario", caption: "Horario" },
      {
        type: "buttons",
        buttons: [
          {
            hint: "Cancelar consulta",
            icon: "close",
            disabled(e) {
              return e.row.data.status == "Cancelada";
            },
            onClick(e) {
              consultaId = e.row.data.id_consulta;
              request(cancelarConsulta + `/${consultaId}`, "PUT");
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
